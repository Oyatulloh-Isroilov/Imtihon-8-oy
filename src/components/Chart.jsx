import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApexCharts from 'apexcharts';

function Chart() {
    const { id } = useParams();
    const [cryptoInfo, setCryptoInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
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
        const prepareChartData = () => {
            // API'den gelen verileri kullanarak chartData'yı hazırla
            if (cryptoInfo.description && cryptoInfo.description.en) {
                const descriptionWords = cryptoInfo.description.en.split(' ');
                const maxLength = 100;
                const shortDescriptionWords = descriptionWords.slice(0, maxLength);
                setShortDescription(shortDescriptionWords.join(' '));
            }
        };

        prepareChartData();
    }, [cryptoInfo]);

    useEffect(() => {
        if (!loading && chartData.length > 0) {
            // Grafik seçeneklerini güncelle
            const options = {
                series: [{
                    name: 'Price',
                    data: chartData
                }],
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Stock Price Movement',
                    align: 'left'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return (val / 1000000).toFixed(0);
                        },
                    },
                    title: {
                        text: 'Price'
                    },
                },
                xaxis: {
                    type: 'datetime',
                },
                tooltip: {
                    shared: false,
                    y: {
                        formatter: function (val) {
                            return (val / 1000000).toFixed(0)
                        }
                    }
                }
            };

            // Grafik nesnesini oluştur ve render et
            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        }
    }, [loading, chartData]);

    return (
        <>
            <div id="chart"></div>
        </>
    );
}

export default Chart;
