import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import AxiosApi from "../../API/TestAxios";
import DetailPage from "./detailPage";
import noImage from "../../images/CAMOLOGO.png"
import FavoriteButton from "../../Commons/Buttons/favoriteButton";
import FavoriteButtonBorder from "../../Commons/Buttons/favoriteButtonBorder";
import VisibilityButton from "../../Commons/visibility";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import OjiDetailPage from "./ojiDetailPage";
import "../../font.css";


const MapStyled = styled.div`
    font-family: 'LINESeedKR-Bd' ;
    position: relative;
    z-index: 1;
    .wrap {
      display: none;
      border-radius: 15px;
      position: absolute;
      right: 45vw;
      bottom: 49vh;
      margin-left: -144px;
    }
    .openOverlay {
      display: flex;
    }

    .wrap * {padding: 0;margin: 0;}

    .wrap .info {
      width: 300px;
      height: 195px;
      border-radius: 15px;
      border-bottom: 2px solid #ccc;
      border-right: 1px solid #ccc;
      background: #fff;
      display: flex;
      flex-direction: column;
      
    }
    .info .title {
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      padding: 5px 0 0 10px;
      height: 32px;
      background: rgba(45, 98, 71, 0.8);
      border-bottom: 1px solid #ddd;
      font-size: 18px;
      font-weight: bold;
      color: white;
      display: flex;
      align-items: center;
    }
    .campTitle{
      padding-bottom: .2em;
    }
    .titleDesc{
      color: yellow;
      margin-right: .5em;
      font-size: .6em;
    }
    .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
    .info .close:hover {cursor: pointer;}

    .info .body {
      position: relative;
      margin-top: 1em;
      display: flex;
      padding-right: .2em;
    }
    .info .desc {
      
      flex-basis: 60%;
      height: 75px;
    }
    .desc .ellipsis {
      padding: .3em;
      font-size: .9em;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
    .desc .jibun {
      font-size: .8em;
      color: #888;
      margin-top: -2px;
    }
    .info .img {
      margin: .2em .5em .2em .5em;
      padding: 0;
      flex-basis: 40%;
      border-radius: 15px;
      height: 11vh;
    }
    /* .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')} */
    .info .link {color: #5085BB;}
    .bottomLine{
      display: flex;
      margin-top: .8em;
      margin-left: .5em;
      align-items: center;
    }
    .detailBtn{
      position: absolute;
      right: .2em;
      margin-right: .5em;
      border: none;
      background-color: #fff;
      font-weight: bold;
      font-size: .8em;
      color: #5085BB;
    }
    .icon{
      margin-left: .2em;
      margin-right: .5em;
      font-weight: bold;
    }
    .bi-flag{
      font-weight: bolder;
      color: orange;
      font-size: 1.2em;
    }
    .num{
      margin-left: .5em;
    }
    @media screen and (max-width: 768px) {
      .wrap {
      display: none;
      border-radius: 15px;
      position: absolute;
      right: 20vw;
      bottom: 49vh;
      margin-left: -144px;
    }
    .openOverlay {
      display: flex;
    }
    }
 `;

const OjiOverlay = (props) => {
  const context = useContext(MarkerContext);
  const {location, setContentId, ojiLikeClicked, ojiSetLickClicked} = context;
  const {open, close} = props
  const [campInfo, setCampInfo] = useState("");
  const [detailOpen, setDetailOpen] = useState("");
  const [clickedFacltNm, setClickedFacltNm] = useState("");

  // 좋아요 서버구현 전까지 쓸 useState

  

  useEffect(()=>{
      const loading = async() => {
        const getOverlay = async() => {
            const rsp = await AxiosApi.getOjiOverLayInfo(location[0], location[1]);
            setCampInfo(rsp.data);
            setContentId(rsp.data[0]);
            if(clickedFacltNm === ""){
                return;
            }else{
                await AxiosApi.viewOjiCount(clickedFacltNm);
            }
        };
        getOverlay();
      }
      loading();
  },[location])


  const detailPageOpen = (e) => {
    setDetailOpen(true);
    setClickedFacltNm(e)
  } 
  
  const closeDetail = () => {
    setDetailOpen(false)
  }

  const handleAddToFavorite = () => {
    ojiSetLickClicked(!ojiLikeClicked)
  }

    return (
      <MapStyled>
      <div className={open ? "openOverlay wrap" : "wrap" }>
        {campInfo && campInfo.map((campInfo) => (
        <div className="campInfo" key={campInfo.facltNm}>
        <div className="info">
          <div className="title">
            <p className="titleDesc">오지.노지</p>
            <p className="campTitle">{campInfo.facltNm.length > 8 ? campInfo.facltNm.substring(0, 8) + "..." : campInfo.facltNm}</p>
            <div onClick={close} className="close" title="닫기"></div>
          </div>
          <div className="body">
            <div className="img" style={{
                      backgroundImage: `url(${campInfo.url
                        ? campInfo.url.split(",")[0]
                        : noImage})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}></div>
            <div className="desc">
              <div className="ellipsis">{campInfo.addr1}</div>
            </div>
          </div>
          <div className="bottomLine">
                {ojiLikeClicked ?  <FavoriteButton onClick={handleAddToFavorite}/> : <FavoriteButtonBorder onClick={handleAddToFavorite} />}
                <div className="icon">{ojiLikeClicked ? 1 : 0}</div>
                <VisibilityButton />
                <div className="icon">{campInfo.viewCount}</div> 
                <FontAwesomeIcon icon={faComment} size="lg" color="green"/>
                <div className="icon">0</div> 
                <button className='detailBtn' onClick={() => detailPageOpen(campInfo.facltNm, campInfo.mapX, campInfo.mapY)}>상세페이지</button>
          </div>
        </div> 
        </div>
        ))}
      </div>
      <OjiDetailPage open={detailOpen} close = {closeDetail} campInfo = {campInfo}/>
      
    

    
      </MapStyled>
      
    );
};

export default OjiOverlay;
