// WatchCarousel.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/components.css';
import Card from '../pages/Card';

function WatchCarousel() {
  const [crypto, setCrypto] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h');
        const data = await response.json();
        setCrypto(data.map((item, index) => ({
          id: index,
          src: item.image,
          alt: item.name,
          title: item.symbol.toUpperCase(),
          percentage: item.price_change_percentage_24h,
          price: `${item.current_price}`,
        })));
      } catch (error) {
        console.error('Error occurred: ', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
    arrows: false,
  };

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
  };

  return (
    <div className="carouselWatch">
      <div className="watch">
        <h1>CRYPTOFOLIO WATCH LIST</h1>
        <p>Get All The Info Regarding Your Favourite Crypto Currency</p>
        <div className="carousel">
          <div className="content">
            <div className="carouselBar">
              <Slider {...settings}>
                {crypto.map((item) => (
                  <div className='carouselItem' key={item.id} onClick={() => handleCryptoClick(item)}>
                    <Card crypto={item} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {selectedCrypto && (
          <div className="selectedCryptoInfo">
            <h2>{selectedCrypto.name}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchCarousel;
