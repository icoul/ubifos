import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';

import { GraphDataContainer } from './GraphData.css';
import LineGraph from './LineGraph';
import SearchBar from './SearchBar';

const GraphData = () => {
  const [data, setData] = useState([]);
  const [searchMap, setSearchMap] = useState({
                                              date: new Date(moment().format('YYYY-MM-DD')),
                                              begin: '00',
                                              end: '24',
                                              moduleIdx: 1
                                            })
  
  const getData = useCallback(() => {
    axios.get("/api/get/graph", {params: {
        moduleIdx: searchMap.moduleIdx,
        beginDate: moment(searchMap.date).hours(searchMap.begin).format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(searchMap.date).hours(searchMap.end).format('YYYY-MM-DD HH:mm:ss')
    }})
    .then(response => {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [searchMap.moduleIdx, searchMap.date, searchMap.begin, searchMap.end])

  useEffect(() => {
    getData();
  }, [getData, searchMap])

  const graphMap = [
    {title: 'O₂', unit: '%', name: 'o2', max: 25, min:0},
    {title: 'CO₂', unit: '%', name: 'co2', max: 5, min:0},
    {title: 'CO', unit: 'ppm', name: 'co', max: 30, min:0},
    {title: 'H₂S', unit: 'ppm', name: 'h2s', max: 15, min:0},
    {title: 'CH₄', unit: 'LEL%', name: 'ch4', max: 15, min:0}
  ]

  return (
    <GraphDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      {
        graphMap.map((map, index) => {
          return (
            <LineGraph key={ map.title } 
                      name={ map.name } 
                      title={ map.title }
                      unit={map.unit}
                      data={ data } 
                      max={ map.max }
                      min={ map.min }
                      categories={
                          [...Array(Number(searchMap.end - searchMap.begin) + 1).keys()].map(i => {
                            const v = Number(i) + Number(searchMap.begin);
                            return `${v}시`;
                          })
                        } 
                      />
          )
        })
      }
    </GraphDataContainer>
  )
}

export default GraphData;