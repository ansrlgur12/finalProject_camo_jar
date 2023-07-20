import React, { useContext, useEffect, useState, useRef } from "react";
import { renderToString } from "react-dom/server";
import Overlay from "./overlay";
import InfoWindow from "./infoWindow";
import { MarkerContext } from "../../context/MarkerInfo";
import {getDistance} from "geolib";
import AxiosApi from "../../API/TestAxios";
import campingCar from "../../images/캠핑카.png"

const { kakao } = window;

const SmallKakaoMap = () => {
  const context = useContext(MarkerContext);
  const {isLatlng, setLatlng} = context;
  const [kakaoMap, setKakaoMap] = useState(null);
  const mapTypeControl = new kakao.maps.MapTypeControl();
  const zoomControl = new kakao.maps.ZoomControl();
  const container = useRef();
  const campingCarSize = new kakao.maps.Size(50,50);
  const markerImg = new kakao.maps.MarkerImage(campingCar, campingCarSize);
  
    
  useEffect(() => {
        const center = new kakao.maps.LatLng(37.50802, 127.062835);
        container.current.style.width = `100%`;
        container.current.style.height = `100%`;
    
        const options = {
          center,
          level: 13,
          maxLevel: 13
        };
        const map = new kakao.maps.Map(container.current, options);
        setKakaoMap(map);
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
        
        kakao.maps.event.addListener(map, 'click', (e) => {
            const latlng = e.latLng;
            console.log(latlng)
            setLatlng(latlng)
        })
       },[container]);

    useEffect(()=>{
        const marker = new kakao.maps.Marker({  
            map: kakaoMap, 
            position: isLatlng,
            image: markerImg
        }); 

        kakao.maps.event.addListener(marker, 'click', () => {
             marker.setMap(null);
             setLatlng("");
        });
    },[isLatlng])


  

  return(
    <>
    <div id="container" ref={container} />
    </>
  );
}
export default SmallKakaoMap;