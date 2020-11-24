import React, { useState } from 'react';

import { GraphDataContainer } from './GraphData.css';
import LineGraph from './LineGraph';
import SearchBar from './SearchBar';

const GraphData = () => {
  const [searchMap, setSearchMap] = useState({
                                              beginDate: new Date(),
                                              endDate: new Date(),
                                              beginTime: 0,
                                              endTime: 24,
                                              moduleIdx: 0,
                                            })

  return (
    <GraphDataContainer>
      <SearchBar searchMap={searchMap} setSearchMap={setSearchMap} />
      <LineGraph key={'%'} 
                 graphId={'%'} 
                 title={['O₂', 'CO']}
                 colors={['#50bb5b', '#eee']}
                 data={[[18,21,22,23,21,22,19,22,21,24], [0,1,0,1,0,1,0,1,0,1]]} 
                 categories={['2020-01-01 11:11:11', 
                              '2020-01-01 12:11:11', 
                              '2020-01-01 13:11:11', 
                              '2020-01-01 14:11:11', 
                              '2020-01-01 15:11:11', 
                              '2020-01-01 16:11:11', 
                              '2020-01-01 17:11:11', 
                              '2020-01-01 18:11:11', 
                              '2020-01-01 19:11:11', 
                              '2020-01-01 20:11:11', ]} 
                 />
      <LineGraph key={'ppm'} 
                 graphId={'ppm'} 
                 title={['CO', 'H₂S', 'LEL']}
                 colors={['#ffbc00', '#007eff', '#FF1654']}
                 data={[[18,21,22,23,21,22,19,22,21,24], [3,1,2,5,3,1,2,2,6,1], [1,5,7,2,3,0,0,0,2,3]]} 
                 categories={['2020-01-01 11:11:11', 
                              '2020-01-01 12:11:11', 
                              '2020-01-01 13:11:11', 
                              '2020-01-01 14:11:11', 
                              '2020-01-01 15:11:11', 
                              '2020-01-01 16:11:11', 
                              '2020-01-01 17:11:11', 
                              '2020-01-01 18:11:11', 
                              '2020-01-01 19:11:11', 
                              '2020-01-01 20:11:11', ]} 
                 />
    </GraphDataContainer>
  )
}

export default GraphData;