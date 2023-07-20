import React, { useContext, useEffect, useState, useRef } from "react";
import { renderToString } from "react-dom/server";
import Overlay from "./overlay";
import InfoWindow from "./infoWindow";
import { MarkerContext } from "../../context/MarkerInfo";
import {getDistance} from "geolib";
import AxiosApi from "../../API/TestAxios";
import campingCar from "../../images/캠핑카.png"
import "../../font.css";
import styled from "@emotion/styled";

const { kakao } = window;

const KakaoMap = (props) => {
  const context = useContext(MarkerContext);
  const {markerLat, markerLng, zoomLev, overlayOpen, setOverlayOpen, setLocation, setMyLoc, setXValue, setYValue} = context;
  const { markerPositions, campLocMarkerImg} = props;
  const [kakaoMap, setKakaoMap] = useState(null);
  const [, setMarkers] = useState([]);
  const [isCenter, setCenter] = useState(null);
  const mapTypeControl = new kakao.maps.MapTypeControl();
  const zoomControl = new kakao.maps.ZoomControl();
  const container = useRef();
  const imageSize = new kakao.maps.Size(35, 35);
  const campingCarSize = new kakao.maps.Size(50,50);
  const image = new kakao.maps.MarkerImage(campLocMarkerImg, imageSize);
  const gpsImg = new kakao.maps.MarkerImage(campingCar, campingCarSize);
  const offsetY = 50;
  const MAX_MARKERS = 150;

  useEffect(() => {
        const center = new kakao.maps.LatLng(markerLat, markerLng);
        container.current.style.width = `100vw`;
        container.current.style.height = `100vh`;
        console.log(center + "center 값")
        console.log(zoomLev + "zoom 값")
    
        const options = {
          center: center,
          level: zoomLev,
          maxLevel: 13
        };
        const map = new kakao.maps.Map(container.current, options);

        kakao.maps.event.addListener(map, 'dragend', function() {        
          var latlng = map.getCenter();
          setCenter(latlng);
          setXValue(latlng.La);
          setYValue(latlng.Ma);
          setOverlayOpen(false);
      });
        setCenter(center);
        setKakaoMap(map);
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
        
      },[container, markerLat, markerLng, zoomLev]);


  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    console.log(markerPositions)
    const sortedMarkers = markerPositions.sort((a, b) => {
        const distanceA = getDistance(
          { latitude: isCenter.getLat(), longitude: isCenter.getLng() },
          { latitude: a[0], longitude: a[1] }
        );
        const distanceB = getDistance(
          { latitude: isCenter.getLat(), longitude: isCenter.getLng() },
          { latitude: b[0], longitude: b[1] }
        );
        return distanceA - distanceB;
    });
    const nearestMarkers = sortedMarkers.slice(0, MAX_MARKERS);
    const positions = nearestMarkers.map(
      (pos) => new kakao.maps.LatLng(pos[0], pos[1])
    );
    
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude; // 위도
      var lon = position.coords.longitude; // 경도
      
      var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      
      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition);
      setMyLoc([lat, lon]);
          
      function displayMarker(locPosition) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({  
            map: kakaoMap, 
            position: locPosition,
            image: gpsImg
        }); 
      }
    });
  

    setMarkers(markers => {
      markers.forEach(marker => marker.setMap(null));

      
      return positions.map((position, index) => {
        const name = nearestMarkers[index][2]

        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          position,
          image,
          clickable: true,
        });
        
        const infowindow = new kakao.maps.CustomOverlay({
          content:  renderToString(<InfoWindow name={name}/>),
          map: null,
          position: marker.getPosition(),
          removable: true,
          clickable: true,
        });
       

        const adjustInfowindowPosition = () => {
          const markerPosition = marker.getPosition();
          const markerPixelPosition = kakaoMap.getProjection().pointFromCoords(markerPosition);
          const infowindowPosition = new kakao.maps.Point(
            markerPixelPosition.x,
            markerPixelPosition.y - offsetY
          );
          const adjustedLatLng = kakaoMap.getProjection().coordsFromPoint(infowindowPosition);

          infowindow.setPosition(adjustedLatLng);
        };

        kakao.maps.event.addListener(kakaoMap, 'zoom_changed', () => {
          adjustInfowindowPosition();
          setOverlayOpen(false);
          infowindow.setMap(null)
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          adjustInfowindowPosition();
          infowindow.setMap(kakaoMap);
          
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.setMap(null)
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          kakaoMap.setLevel(1);
          console.log('Marker clicked');
          infowindow.setMap(null)
          let xValue = position.La;
          let yValue = position.Ma;  
          setLocation([xValue, yValue]);
          setOverlayOpen(true);
          
          const markerPosition = marker.getPosition();
          kakaoMap.setCenter(markerPosition);
          kakaoMap.relayout();
        });

        kakao.maps.event.addListener(kakaoMap, 'click', () => {
          console.log('Map Unclicked');
          setOverlayOpen(false);
          console.log(overlayOpen);
        });

        kakao.maps.event.addListener(kakaoMap, 'dragend', () => {        
          infowindow.setMap(null)
      });

        return marker;
      });
    });

  }, [kakaoMap, markerPositions, isCenter, overlayOpen, setOverlayOpen]);

  

  return(
    <div id="container" ref={container} />
  );
}

export default KakaoMap;
