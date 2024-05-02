import React, { useState, useEffect } from 'react';
import '../css/components.css';

function Hero() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error('Xatolik sodir bo\'ldi: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hero">
      <div className="searchBar">
        <input type="text" />
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
          {cryptoData.map((crypto, index) => (
            <tr key={index}>
              <td className='tableItems'>{crypto.symbol.toUpperCase()}</td>
              <td className='tableItems'>{crypto.current_price}</td>
              <td className='tableItems'>{crypto.price_change_percentage_24h}</td>
              <td className='tableItems'>{crypto.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Hero;
