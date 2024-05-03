import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/components.css';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function Hero() {
    const [cryptoData, setCryptoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Tanlangan valyuta

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=gecko_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`;

                const response = await fetch(url);
                const data = await response.json();

                setCryptoData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred: ', error);
            }
        };

        fetchData();
    }, [currentPage, coinsPerPage, selectedCurrency]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCurrencyChange = (e) => {
        setSelectedCurrency(e.target.value);
    };

    return (
        <div className="hero">
            <h1>Cryptocurrency Prices by Market Cap</h1>
            <div className="searchBar">
                <input type="text" placeholder="Search For a Crypto Currency.." />
            </div>
            <div className="currencySelector">
                <label htmlFor="currency">Select Currency: </label>
                <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>
            <table className='cryptoTable'>
                <thead>
                    <tr>
                        <th className='tableHead'>Coin</th>
                        <th className='tableHead'>Price</th>
                        <th className='tableHead'>24h Changes</th>
                        <th className='tableHead'>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="4">Loading...</td>
                        </tr>
                    ) : (
                        cryptoData.map((crypto) => (
                            <tr className='tableTr' key={crypto.id}>
                                <td className='tableItems tableCoin'>
                                    <Link to={`/cardinfo/${crypto.id}`}>
                                        <div className="tableImg">
                                            <img className="cryptoImg" src={crypto.image} alt={crypto.symbol} />
                                        </div>
                                        <div className="tableInfo">
                                            <span className='cryptoSymbol'>{crypto.symbol.toUpperCase()}</span>
                                            <span className='cryptoName'>{crypto.name}</span>
                                        </div>
                                    </Link>
                                </td>
                                <td className='tableItems tablePrice'>{crypto.current_price}</td>
                                <td className={`tableItems ${crypto.price_change_percentage_24h < 0 ? 'negative' : ''}`}>
                                    <span className='tableLitInfo'>
                                        <RemoveRedEyeIcon className='tableEye' />
                                        <span className='tablePercentage'>{crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h}%</span>
                                    </span>
                                </td>
                                <td className='tableItems tableMarketCap'>$ {crypto.market_cap.toLocaleString(undefined, { maximumFractionDigits: 0 }).slice(0, -4)}M</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <CustomPagination
                currentPage={currentPage}
                totalCoins={cryptoData.length}
                paginate={paginate}
            />
        </div>
    );
}

const CustomPagination = ({ currentPage, totalCoins, paginate }) => {
    const totalPages = Math.ceil(totalCoins / 10);

    return (
        <div className="pagination">
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, page) => paginate(page)}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                        {...item}
                    />
                )}
            />
        </div>
    );
};

export default Hero;
