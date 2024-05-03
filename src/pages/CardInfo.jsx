import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import '../css/components.css';

function CardInfo() {
    const { id } = useParams();
    const [cryptoInfo, setCryptoInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [shortDescription, setShortDescription] = useState('');
    const [chartDays, setChartDays] = useState('24h'); 

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
            <div className="cardChart">
                <Chart id={id} days={chartDays} />
            </div>
        </div>
    );    
}

export default CardInfo;
