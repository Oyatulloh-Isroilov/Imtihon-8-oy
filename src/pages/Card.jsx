import React from 'react';

function Card({ crypto }) {
  return (
    <div className="cryptoCard">
      <img src={crypto.src} alt={crypto.alt} className="carouselImg" />
      <span className="carouselTitle">{crypto.title}</span>
      <span className={`carouselPercentage ${crypto.percentage >= 0 ? '' : 'negative'}`}>{crypto.percentage}%</span>
      <br />
      <span className="carouselPrice">$ {crypto.price}</span>
    </div>
  );
}

export default Card;
