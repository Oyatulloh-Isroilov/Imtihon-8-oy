import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../css/components.css'
import { FidgetSpinner } from 'react-loader-spinner';

const CurrencyButton = ({ currency, onClick }) => (
  <button onClick={onClick}>{currency}</button>
);

const Chart = ({ id, selectedCurrency, onCurrencyChange }) => {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedCurrency, id]);

  const fetchData = () => {
    let days;
    switch (selectedCurrency) {
      case "24h":
        days = "1";
        break;
      case "30d":
        days = "30";
        break;
      case "2 Months":
        days = "60";
        break;
      case "1 Year":
        days = "365";
        break;
      default:
        days = "1";
        break;
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`)
      .then(res => res.json())
      .then(data => {
        setData(data.prices);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const series = [{
        name: 'Exchange Rate',
        data: data.map(el => ({ x: el[0], y: el[1] }))
      }];
      const options = {
        chart: {
          type: 'line',
          height: 650
        },
        xaxis: {
          type: 'datetime'
        }
      };
      setChartData({ series, options });
    }
  }, [data]);

  return (  
    <div className='chartBar'>
      <div>
        <h2>{selectedCurrency}</h2>
        {chartData && <ReactApexChart options={chartData.options} series={chartData.series} type="line" width="100%" height={470} />}
      </div>
      <div className='timeSelected'>
        <CurrencyButton className="chartSelected" currency="24 Hours" onClick={() => onCurrencyChange("24h")} />
        <CurrencyButton className="chartSelected" currency="30 Days" onClick={() => onCurrencyChange("30d")} />
        <CurrencyButton className="chartSelected" currency="2 Months" onClick={() => onCurrencyChange("2 Months")} />
        <CurrencyButton className="chartSelected" currency="1 Year" onClick={() => onCurrencyChange("1 Year")} />
      </div>
    </div>
  );
};

export default Chart;
