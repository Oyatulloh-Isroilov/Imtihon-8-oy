import React from 'react';
import '../css/components.css';

function WatchList({ coins, removeCoin, selectedCurrency }) { // selectedCurrency ni props sifatida qo'shing
  const handleRemove = (id) => {
    removeCoin(id);
  };

  return (
    <div className="cards">
      <div className="watchCard">
        {coins.map(coin => (
          <div key={coin.id} className={`watchItem ${coin.current_price === selectedCurrency ? 'green' : 'red'}`}>
            <div className="watchImage">
              <img src={coin.image} alt={coin.symbol} />
            </div>
            <div className="watchPrice">
              <span>{coin.current_price}</span>
            </div>
            <button className='removeBtn' onClick={() => handleRemove(coin.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchList;
