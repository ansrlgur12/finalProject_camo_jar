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
import { UserContext } from "../../API/UserInfo";
import LikesApi from "../../API/LikesAPI";
import "../../font.css";
import Functions from "../../Functions";


const MapStyled = styled.div`
    font-family: 'LINESeedKR-Bd' ;
    position: relative;
    z-index: 1;
    .wrap {
      display: none;
      border-radius: 15px;
      position: absolute;
      right: 45vw;
      bottom: 55vh;
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
      cursor: pointer;
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
    @media screen and (max-width: 414px) {
      .wrap {
      display: none;
      border-radius: 15px;
      position: absolute;
      right: 10vw;
      bottom: 55vh;
      margin-left: -144px;
    }
    .openOverlay {
      display: flex;
    }
    }
 `;

const Overlay = (props) => {
  const token = Functions.getAccessToken();
  const context = useContext(MarkerContext);
  const {location, setContentId, contentId, count, setCount, likeClicked, setLikeClicked, commentCount, setCommentCount, overlayOpen} = context;
  const {open, close} = props
  const [campInfo, setCampInfo] = useState("");
  const [detailOpen, setDetailOpen] = useState("");
  const [clickedFacltNm, setClickedFacltNm] = useState("");
  const [dataId, setDataId] = useState(10);
  
  // const [count, setCount] = useState(0);
  // const [likeClicked, setLikeClicked]= useState(false);

  useEffect(()=>{
      const loading = async() => {
        const getOverlay = async() => {
          const rsp = await AxiosApi.getOverlayInfo(location[0], location[1]);
          if(rsp.status === 200) {
            if (rsp.data && rsp.data.length > 0) {
              setDataId(rsp.data[0].id);
              setCampInfo(rsp.data);
              setContentId(rsp.data[0]);
              const rsp2 = await LikesApi.countCampLikesJwt(token, dataId);
              const rsp3 = await AxiosApi.checkLike(token, dataId);
              const rsp4 = await AxiosApi.commentCount(dataId);
              setCommentCount(rsp4.data);
              setCount(rsp2.data);
              if(rsp3.data === 0) {
                setLikeClicked(false);
              } else {
                setLikeClicked(true);
              }
            }
          }
        };
        getOverlay();
      }
      loading();
  },[dataId, setLikeClicked, location,count,likeClicked,clickedFacltNm,detailOpen, overlayOpen])

  const likeBtnClick = async() => {
    await LikesApi.likeCampJwt(token, contentId.id);
  }

  const likeBtnUnClick = async() => {
    await AxiosApi.campUnLike(token, contentId.id);
  }

  const viewCount = async(clickedFacltNm) => {
    const rsp = await AxiosApi.viewCount(clickedFacltNm);
    console.log(rsp.data);
  }

  const detailPageOpen = (e) => {
    setDetailOpen(true);
    setClickedFacltNm(e)
    viewCount(e);
  } 
  
  const closeDetail = () => {
    setDetailOpen(false)
  }

  const handleAddToFavorite = () => {
    if(likeClicked){
      setLikeClicked(!likeClicked)
      likeBtnUnClick();
    } else{
      setLikeClicked(!likeClicked)
      likeBtnClick();
    }
    
  }

    return (
      <MapStyled>
      <div className={open ? "openOverlay wrap" : "wrap" }>
        {campInfo && campInfo.map((campInfo) => (
        <div className="campInfo" key={campInfo.facltNm}>
        <div className="info">
          <div className="title">
            <p className="titleDesc">유료 캠핑장</p>
            <p className="campTitle">{campInfo.facltNm.length > 8 ? campInfo.facltNm.substring(0, 8) + "..." : campInfo.facltNm}</p>
            <div onClick={close} className="close" title="닫기"></div>
          </div>
          <div className="body">
            <div className="img" style={{backgroundImage: `url(${campInfo.firstImageUrl ? campInfo.firstImageUrl : noImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
            <div className="desc">
              <div className="ellipsis">{campInfo.addr1}</div>
              <div className="ellipsis jibun">
                <FontAwesomeIcon icon={faPhone} />
                  <div className="num">
                    {campInfo.tel ? campInfo.tel : " 전화번호 없음"}
                  </div>
                </div>
            </div>
          </div>
          <div className="bottomLine">
                {likeClicked ?  <FavoriteButton onClick={handleAddToFavorite}/> : <FavoriteButtonBorder onClick={handleAddToFavorite} />}
                <div className="icon">{count}</div>
                <VisibilityButton />
                <div className="icon">{campInfo.viewCount}</div> 
                <FontAwesomeIcon icon={faComment} size="lg" color="green"/>
                <div className="icon">{commentCount}</div> 
                <button className='detailBtn' onClick={() => detailPageOpen(campInfo.facltNm, campInfo.mapX, campInfo.mapY)}>상세페이지</button>
          </div>
        </div> 
        </div>
        ))}
      </div>
      <DetailPage open={detailOpen} close = {closeDetail} campInfo = {campInfo}/>
      
    

    
      </MapStyled>
      
    );
};

export default Overlay;
