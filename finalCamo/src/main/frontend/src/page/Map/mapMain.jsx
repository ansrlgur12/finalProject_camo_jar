import React, { useState, useEffect } from "react";
import KakaoMap from "./Kakao";
import { styled } from "styled-components";
import Header from "../../main/header";
import Sidebar from "./sideBar";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../API/TestAxios";
import { useContext } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import Overlay from "./overlay";
import animalCamp from "../../images/강아지발바닥.png";
import markerImage from "../../images/캠핑마커.png";
import "../../font.css";


export const MainStyle = styled.div`
  font-family: 'LINESeedKR-Bd' ;
    .App {
        font-family: sans-serif;
        position: relative;
    }
    
    #wrap {
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        margin-top: .2em;
        padding-top: 10vh;
    }

    

    .img{
        width: 3vw;
        height: 3vw;
    }
    .selectBtn{
      border-radius : 15px;
      background-color: rgba(45, 98, 71, 0.8);
      padding: 1vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      top: 45vh;
      left: 2vh;
      z-index: 5;
      :hover{
        p{
          border: 1px solid #ccc;
          border-radius: 15px;
          margin-top: .5em;
          font-size: small;
          height: 2em;
          display: flex;
          align-items: center;
          padding: 0 .5em;
          background-color: black;
          color: white;
        }
      }
        p{
          display: none;
          /* border: 1px solid #ccc;
          border-radius: 15px;
          margin-top: .5em;
          font-size: small;
          height: 2em;
          display: flex;
          align-items: center;
          padding: 0 .5em;
          background-color: black;
          color: white; */
        }
    }
    .btnSection{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 1em;
    }

    @media screen and (max-width: 768px) {
      .selectBtn {
        top: 80vh;
        left: 1vw;
        flex-direction: column;
        justify-content: center;
        padding: 1vh 2vh;
      }
      .btnSection {
        margin : 1vw;
      }
      .img {
        width: 4vh;
        height: 4vh;
      }
      #wrap{
        padding-top: 11.5vh;
      }
    }
/* 
    @media screen and (max-width: 414px){
      #wrap{
        padding-top: 9.5vh;
      }
    } */

    @media screen and (max-width: 375px){
      #wrap{
        padding-top: 11.5vh;
      }
      
    }
  `;

const MapMain = () => {
  const context = useContext(MarkerContext);
  const {overlayOpen, setOverlayOpen, setCurrentData, currentData, setSelectedSortBy, xValue, yValue, location} = context;
  const nav = useNavigate();
  const [markerPositions, setMarkerPositions] = useState([]);
  const [marker, setMarker] = useState();


  useEffect(()=>{
    const viewCampMarker = async() => {
        const rsp = await AxiosApi.viewCampMarker(yValue, xValue);
        const positions = rsp.data.map(item => [item.mapY, item.mapX, item.facltNm]);
        const filteredData = rsp.data.filter(item => item.animalCmgCl !== "불가능");
        const animalPositions = filteredData.map(item => [item.mapY, item.mapX, item.facltNm]);

        if(currentData === "normal") {
              setMarkerPositions(positions);
              setMarker(markerImage);
              setSelectedSortBy("이름순");
        }else if(currentData === "animal") {
              setMarkerPositions(animalPositions);
              setMarker(animalCamp);
              setSelectedSortBy("이름순");
        }
    }
    viewCampMarker();
  },[xValue, yValue, currentData]);

  const closeOverlay = () => {
    setOverlayOpen(false)
  }

  const setNormalMapInfo = () => {
    setCurrentData("normal");
    setMarker(markerImage);
  }

  const setAnimalMapInfo = () => {
    setCurrentData("animal");
    setMarker(animalCamp);
  }

  return (
    <>
    <Header/>
    <MainStyle>
    <div className="App">
      <div id="wrap" style={{width:'100vw', height: '89vh'}}>
            <KakaoMap markerPositions={markerPositions} campLocMarkerImg={marker}/>
            <Sidebar />
            <Overlay open={overlayOpen} close={closeOverlay}/>
            <div className="selectBtn">
              <div className="btnSection" onClick={setNormalMapInfo}>
                <img className="img" src={markerImage} alt="" />
                <p>전체 캠핑장</p>
              </div>
              <div className="btnSection" onClick={setAnimalMapInfo}>
                <img className="img" src={animalCamp} alt="" />
                <p>애완동물 동반가능</p>
              </div>
            </div>
      </div>
    </div>
    </MainStyle>
    </>
  );
}
export default MapMain;
