import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import '../css/components.css'

function WatchCarousel() {
    const [crypto, setCrypto] = useState([]);

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
                console.error('Xatolik sodir bo\'ldi: ', error);
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
    };

    return (
        <>
            <div className="watch">
                <h1>CRYPTOFOLIO WATCH LIST</h1>
                <p>Get All The Info Regarding Your Favourite Crypto Currency</p>
                <div className="carousel">
                    <div className="content">
                        <div className="carouselBar">
                            <Slider {...settings}>
                                {crypto.map((item) => (
                                    <div className='carouselItem' key={item.id}>
                                        <img src={item.src} alt={item.alt} className="carouselImg" />
                                        <span className="carouselTitle">{item.title}</span>
                                        <span className={`carouselPercentage ${item.percentage >= 0 ? '' : 'negative'}`}>{item.percentage}%</span>
                                        <br />
                                        <span className="carouselPrice">$ {item.price}</span>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WatchCarousel