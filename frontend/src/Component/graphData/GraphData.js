import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { GraphDataContainer } from './GraphData.css';
import LineGraph from './LineGraph';
import SearchBar from './SearchBar';

import { getYMDAndHourFormatDate } from 'utils/getCustomFormatDate';

const GraphData = () => {
  const [data, setData] = useState([]);
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(),
                                              endDate: new Date(),
                                              moduleIdx: 1
                                            })
  
  const getData = useCallback(() => {
    axios.get("/api/get/graph", {params: {moduleIdx: searchMap.moduleIdx,
                                          beginDate: getYMDAndHourFormatDate(searchMap.beginDate),
                                          endDate: getYMDAndHourFormatDate(searchMap.endDate)}})
    .then(response => {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [searchMap.moduleIdx, searchMap.beginDate, searchMap.endDate])

  useEffect(() => {
    getData();
  }, [getData, searchMap])

  const graphMap = [
    {title: 'O₂', name: 'o2', max: 25, min:0},
    {title: 'CO₂', name: 'co2', max: 5, min:0},
    {title: 'CO', name: 'co', max: 15, min:0},
    {title: 'H₂S', name: 'h2s', max: 30, min:0},
    {title: 'CH₄', name: 'ch4', max: 15, min:0}
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
                       data={ data } 
                       max={ map.max }
                       min={ map.min }
                       categories={
                          [...Array(((searchMap.endDate.getTime() - searchMap.beginDate.getTime()) / 1000 / 60 / 60) + 1).keys()].map(i => {
                            return `${searchMap.beginDate.getHours() + i}시`;
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