import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

function Chart({ cryptoInfo, loading }) {
    useEffect(() => {
        if (!loading && cryptoInfo && cryptoInfo.market_data && cryptoInfo.market_data.price_change_percentage_24h_in_currency && cryptoInfo.market_data.price_change_percentage_24h_in_currency.x) {
            const options = {
                series: [{
                    name: 'Price',
                    data: Object.values(cryptoInfo.market_data.price_change_percentage_24h_in_currency).map(currencyData => currencyData.usd)
                }],
                chart: {
                    type: 'line',
                    height: 350,
                },
                xaxis: {
                    categories: cryptoInfo.market_data.price_change_percentage_24h_in_currency.x
                }
            };

            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        }
    }, [loading, cryptoInfo]);

    return (
        <div id="chart"></div>
    );
}

export default Chart;
