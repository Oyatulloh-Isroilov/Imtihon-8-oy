import React, { useState, useEffect } from 'react';
import Header from './Header';
import WatchList from '../pages/WatchList';
import '../css/components.css';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link } from 'react-router-dom';

function Hero() {
    const [cryptoData, setCryptoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coinsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=gecko_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`;

                const response = await fetch(url);
                const data = await response.json();

                const watchlistCoins = JSON.parse(localStorage.getItem('watchlistCoins')) || [];

                const updatedData = data.map(coin => ({
                    ...coin,
                    isWatchlisted: watchlistCoins.some(item => item.id === coin.id)
                }));

                setCryptoData(updatedData);
                setLoading(false);
            } catch (error) {
                console.error('Error occurred: ', error);
                setError(true);
            }
        };

        fetchData();
    }, [currentPage, coinsPerPage, selectedCurrency]);

    useEffect(() => {
        localStorage.setItem('watchlistCoins', JSON.stringify(cryptoData.filter(coin => coin.isWatchlisted)));
    }, [cryptoData]);

    useEffect(() => {
        const results = cryptoData.filter(coin =>
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(results);
    }, [query, cryptoData]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
    };

    const handleWatchlistToggle = (id) => {
        const updatedCryptoData = cryptoData.map(coin => {
            if (coin.id === id) {
                coin.isWatchlisted = !coin.isWatchlisted;
            }
            return coin;
        });
        setCryptoData(updatedCryptoData);
    };

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    if (error) {
        return <div className='errorText'>Error occurred while loading data. Please try again later.</div>;
    }

    return (
        <div className="hero">
            <h1>Cryptocurrency Prices by Market Cap</h1>
            <select className='cryptoMoney' value={selectedCurrency} onChange={(e) => handleCurrencyChange(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
            </select>

            <div className="searchBar">
                <input type="text" placeholder="Search For a Crypto Currency.." onChange={handleSearch} />
            </div>
            <table className='cryptoTable'>
                <thead>
                    <tr>
                        <th className='tableHead'>Coin</th>
                        <th className='tableHead'>Price</th>
                        <th className='tableHead'>24h Changes</th>
                        <th className='tableHead'>Market Cap</th>
                        <th className='tableHead'>Watchlist</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    ) : (
                        filteredData.map((crypto) => (
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
                                <td className='tableItems tableWatchlist'>
                                    <button onClick={() => handleWatchlistToggle(crypto.id)}>
                                        {crypto.isWatchlisted ? <RemoveRedEyeIcon className='tableEye' /> : ''}
                                        {crypto.isWatchlisted ? 'Remove' : 'Add'}
                                    </button></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <CustomPagination
                currentPage={currentPage}
                totalCoins={filteredData.length}
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
