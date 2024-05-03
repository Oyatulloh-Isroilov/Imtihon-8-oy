import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import ApexCharts from 'apexcharts';
import '../css/components.css';

function CardInfo() {
    const { id } = useParams();
    const [cryptoInfo, setCryptoInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [shortDescription, setShortDescription] = useState('');

    useEffect(() => {
        const fetchCryptoInfo = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
                const data = await response.json();
                setCryptoInfo(data);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred: ', error);
            }
        };

        fetchCryptoInfo();
    }, [id]);

    useEffect(() => {
        if (cryptoInfo.description && cryptoInfo.description.en) {
            const descriptionWords = cryptoInfo.description.en.split(' ');
            const maxLength = 73;
            const shortDescriptionWords = descriptionWords.slice(0, maxLength);
            setShortDescription(shortDescriptionWords.join(' '));
        }
    }, [cryptoInfo]);

    useEffect(() => {
        if (!loading && cryptoInfo.market_data && cryptoInfo.market_data.sparkline_7d) {
            const chartData = {
                options: {
                    chart: {
                        type: 'line',
                    },
                    xaxis: {
                        categories: cryptoInfo.market_data.sparkline_7d.price.map((_, index) => index + 1),
                    },
                },
                series: [
                    {
                        name: 'Price',
                        data: cryptoInfo.market_data.sparkline_7d.price,
                    },
                ],
            };
    
            const chart = new ApexCharts(document.querySelector('.cardChart'), chartData.options);
            chart.appendSeries(chartData.series);
            chart.render();
        }
    }, [cryptoInfo, loading]);
    

    return (
        <div className="card-info">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="cardInfo">
                    <img className='cardImage' src={cryptoInfo.image?.large} alt="" />
                    <h1 className='cardtitle'>{cryptoInfo.name}</h1>
                    <p className='cardDesc'>{shortDescription}</p>
                    <p className='cardRank'>Rank: <strong>{cryptoInfo.market_cap_rank}</strong></p>
                    <p className='cardCurrentPrice'>Current Price: <strong>{cryptoInfo.market_data.current_price?.usd}</strong></p>
                    <p className='cardMarketCap'>Market Cap: <strong>{cryptoInfo.market_data.market_cap?.usd}</strong></p>
                </div>
            )}
            <div className="cardChart"></div>
        </div>
    );    
}

export default CardInfo;
