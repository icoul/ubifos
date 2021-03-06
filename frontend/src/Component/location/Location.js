import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

import { LocationContainer } from './Location.css';

const { kakao } = window

const Location = () => {
  const mapContainer = useRef();
  const [ data, setData ] = useState([]);
  const [ map, setMap ] = useState(null);
  const [ markers, setMarkers ] = useState([]);
  const [ infos, setInfos ] = useState([]);
  const [ location, setLocation ] = useState(null);

  const removeMarker = async () => {
    setMarkers((markers) => {
      for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
      }  

      return [];
    })

    setInfos((infos) => {
      for ( var i = 0; i < infos.length; i++ ) {
        infos[i].close();
      }  

      return [];
    })
  }

  const getData = () => {
    axios.get("/api/get/location/group", {})
      .then(response => {
        removeMarker();
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    if (kakao !== undefined) {
      kakao.maps.load(() => {
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7,
          draggable: true,
          scrollwheel: true
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMap(new kakao.maps.Map(mapContainer.current, options));
      });
    }

    return (() => {
      setMap(null)
    })
  }, [kakao])

  function addMarker(element) {
    var markerPosition  = new kakao.maps.LatLng(element.latitude, element.longitude); 
  
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });
    
    marker.setMap(map);
    markers.push(marker);

    const iwContent = `
      <div style="padding:5px; font-size: 13px;">
        장치명 : ${element.modelNm}<br/>
        latitude: ${element.latitude}<br/>
        longitude: ${element.longitude}<br/>
        rssi: ${element.rssi}<br/>
        battery: ${Number(element.battery)} %<br/>
        ${moment(element.rgstDt).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    `
    const iwPosition = new kakao.maps.LatLng(element.latitude, element.longitude); //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent 
    });
      
    // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
    infowindow.open(map, marker); 
    infos.push(infowindow);

    return marker;
  }

  useEffect(() => {
    if (kakao !== undefined) {
      kakao.maps.load(() => {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          if (element.latitude !== 0 && element.longitude !== 0) {
            addMarker(element);
          }
        }
      })
    }
  }, [kakao, data, map])

  useEffect(() => {
    getData();

    const timer = window.setInterval(() => {
      getData();
    }, Number(3000));

    return () => {
      window.clearInterval(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data.length > 0 && location === null && kakao !== undefined) {
      kakao.maps.load(() => {
        setTimeout(function() {
          try {
            var moveLatLon = new kakao.maps.LatLng(data[0].latitude, data[0].longitude);
            map.panTo(moveLatLon);
            setLocation(1);
          } catch (error) {
            console.log(error);
          }
        }, 1000);
      })
    }
  }, [kakao, data, location, map])

  return (
    <LocationContainer>
      {
        kakao !== undefined ? 
          <div className="map" ref={mapContainer}></div>
          :
          <div className="map-fail-msg-container">
            <div className="map-fail-msg">지도 데이터를 받아오는데 실패했습니다</div>
            <div><button className="btn btn-primary" onClick={() => { window.location.reload(); }}>재시도</button></div>
          </div>
      }
    </LocationContainer>
  )
}

export default Location;