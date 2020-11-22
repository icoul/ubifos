import React from 'react';
import Chart from 'react-apexcharts';
import './LineGraph.css';

const LineGraph = (props) => {
  const config = {
    options: {
      chart: {
        id: props.graphId,
        type: 'line',
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
      colors: props.colors,
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'stepline',
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
        max: 25,
        min: 0,
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
              fontSize: '12px',
          },
        },
      },
      xaxis: {
        categories: props.categories,
        labels: {
          show: false,
          hideOverlappingLabels: true,
          style: {
            colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
            fontSize: '10px'
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
    series: props.title.map((titleName, index) => {
      return {
        name: titleName,
        data: props.data[index]
      }
    })
  }

  return (
    <>
      <div className="gasDetailGraph-lineGraph">
        <Chart type="line" width="1650" height="370" options={config.options} series={config.series}/>
      </div>
    </>
  )
}

export default LineGraph;