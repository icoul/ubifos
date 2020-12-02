import React from 'react';
import Chart from 'react-apexcharts';
import './LineGraph.css';

const LineGraph = (props) => {
  console.log([...Array(props.data.length)].map(x => { return '#fff'; }));
  const config = {
    options: {
      chart: {
        id: props.name,
        type: 'line',
        offsetY: 25,
        toolbar: {
          show: true,
          tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
          },
        },
        animations: {
          enabled: false
        }
      },
      colors: ['#50bb5b'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      tooltip: {
        theme: 'dark',
        y: {
          title: {
            formatter: props.title
          }
        }
      },
      grid: {
        position: 'front',
        borderColor: '#90A4AE30',
      },
      yaxis: {
        tickAmount: 5,
        max: props.max,
        min: props.min,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: '#eee',
              fontSize: '20px',
          },
        },
      },
      xaxis: {
        categories: props.categories,
        labels: {
          show: true,
          style: {
            colors:[...Array(props.data.length)].map(x => { return '#fff'; }),
            fontSize: '20px'
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      legend: {
        position: 'bottom',
        offsetY: -20,
        fontSize: '22px',
        itemMargin: {
          horizontal: 10,
          vertical: 20
        },
      },
    },
    series: [{ name: props.title, data: props.data.map(x => { return x[props.name] }) }]
  }

  return (
    <>
      <div className="gasDetailGraph-lineGraph">
        <div className="gasDetailGraph-title">{props.title}</div>
        <Chart type="line" width="1450" height="370" options={config.options} series={config.series}/>
      </div>
    </>
  )
}

export default LineGraph;