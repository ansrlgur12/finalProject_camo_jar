import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../API/TestAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CampCard from "./CampCard";
import { MarkerContext } from "../context/MarkerInfo";
import "../font.css";

const Section3 = styled.div`
    font-family: 'LINESeedKR-Bd';
    margin-top: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 5vh;

    .swipe-slide{
        height: 100%;
    }
    .swiper{
        height: 100%;
        max-width: 80vw;
        padding-left: 5vw ;
    }
    .select{
        margin: 0;
        padding: 0;
    }
    li {
        height: auto;
        list-style: none;
        border: 2px solid #56966b;;
        border-radius: 10px;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 6px;
        /* margin: 5px; */
        background-color: #f3f3f3;
    }
    .menuChoice{
        
        margin: 0;
    }
    .topNav{
        display: flex;
        margin: 0;
    }
    .sTop{
        width: 90vw;
        height: 5vh;
        background-color: #56966b;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        margin-bottom: 0;
        padding-bottom: 0;
        display: flex;
        flex-direction: row;
        align-items: end;
    }
    .sBottom{
        background-color: #f3f3f3;
        height: auto;
        margin-top: 0;
        padding: 1em;
        border-radius: 15px;
        box-shadow: 1px 2px 5px gray;

    }
    .sortBy{
        width: 5vw;
        font-size: .9rem;
        margin: 5px 3px 12px 0px;
        cursor: pointer;
        font-weight: bold;
        height: auto;
        box-shadow: 1px 2px 5px gray;
        border-radius: 10px;
        padding: 4px;
        /* margin: 5px; */
        background-color: #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;

    }
    .selected{
        font-size: 1.2rem;
        font-weight: bold;
        color: rgb(20, 108, 49);
        border-bottom: none;
    }
    .swiper-button-prev,
    .swiper-button-next {
    background-color: #56966b;
    opacity: 0.5;
    padding: 15px 3px;
    border-radius: 20px;
    color: white !important;
    

    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    margin-bottom: 10px;
    }
    @media screen and (max-width: 768px) {
        margin-top: 2vh;
        margin-bottom: 1vh;
        .sBottom{
        background-color: #f3f3f3;
        height: auto;
        margin-top: 0;
        padding: 1em 0;
    }
    .swiper-button-prev,
    .swiper-button-next {
    background-color: #56966b;
    opacity: 0.5;
    padding: 15px 3px;
    border-radius: 20px;
    color: white !important;
    height: 3vh;
    width: 2vh;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    margin-bottom: 10px;
    }

    .sortBy{
        width: 15vw;
        font-size: .7em;
        height: 4vw;
    }
}
`;
const CardContainer = styled.div`
width: 20vw;
height: 20vw;
border-radius: 15px;
display: flex;
flex-direction: column-reverse;
box-shadow: 1px 2px 5px gray;
@media screen and (max-width: 768px) {
    width: 25vw;
    height: 25vw;
    /* margin-top: .5em; */
    
}


`
const CardDesc = styled.div`
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
width: 100%;
height: 32%;
background-color: rgba(34, 34, 34, 0.8);

`;

const Title = styled.h2`
    color: white;
    margin: .4em .4em .2em .4em;
    margin-bottom: 0;
    @media screen and (max-width: 768px) {
      font-size: .5em;
    }
`;
const CampDesc = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      font-size: .4em;
      margin: 0 .5em 0em .5em;
      
    }
`;
const CampDescSection = styled.div`
    color: white;
    margin: .5em;
    padding-bottom: 1em;
    font-size: 1.2em;
    .num{
        margin-left: .5em;
        
    }
    @media screen and (max-width: 768px) {
      margin-bottom: .5em;
      line-height: .7;
    }
    
`;
const CampDescSection2 = styled.div`
    color: white;
    margin: .5em;
    padding-bottom: 1em;
    font-size: 1.2em;
    .num{
        margin-left: .5em;
        
    }
    @media screen and (max-width: 768px) {
      margin-bottom: .5em;
      line-height: .1;
    }
    
`;

const MainSection3 = (props) => {
    const nav = useNavigate();
    const context = useContext(MarkerContext);
    const {setOverlayOpen, setLocation, setZoomLev, setMarkerLat, setMarkerLng} = context;
    const [campData, setCampData] = useState([]);
    const [myLoc, setMyLoc] = useState([]);
    const [selectedSortBy, setSelectedSortBy] = useState("이름순");

    useEffect(()=>{
      const getCampCard = async() => {
          const rsp = await AxiosApi.getCampData("ALL", "시.군.구");
        //   if(rsp.status === 200){
        //     if(rsp.data && rsp.data.length > 0) {
        //     const rsp2 = await AxiosApi.viewCampLike(rsp.data[0].id);
        //     setCount(rsp2.data);
        //     }
        //   }
          console.log(rsp.data);
          setCampData(rsp.data);
          navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMyLoc([latitude, longitude]);
            },
            (error) => {
                console.error("Error getting current location:", error);
            }
        );

      }
      getCampCard();
      
    },[])

    const calculateDistance = (camp) => {
        if (campData && campData.length > 0) {
          const R = 6371; // 지구 반경 (단위: km)
          const lat1 = myLoc[0];
          const lon1 = myLoc[1];
          const lat2 = camp.mapY;
          const lon2 = camp.mapX;
      
          const dLat = deg2rad(lat2 - lat1);
          const dLon = deg2rad(lon2 - lon1);
      
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = R * c;
      
          return `${distance.toFixed(2)} km`;
        }
        return "";
      };

      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

      const handleSortByClick = (sortBy) => {
        setSelectedSortBy(sortBy);
      };

      const sortCamps = (camps) => {
        switch (selectedSortBy) {
          case '이름순':
            return [...camps].sort((a, b) => a.facltNm.localeCompare(b.facltNm));
          case '등록순':
            return [...camps].sort((a, b) => new Date(b.createdtime) - new Date(a.createdtime));
          case '인기순':
            return [...camps].sort((a, b) => Number(b.likes) - Number(a.likes));
          default:
            return [...camps];
        }
      };
      const sortedCamps = sortCamps(campData);

      const onClickImage = (x, y) => {
        nav("/mapMain");
        setZoomLev(1);
        setMarkerLat(y);
        setMarkerLng(x);
        setLocation([x, y])
        setOverlayOpen(true);
      };

    return(
        <Section3>
            <div className="select">
                    <div className="topNav">
                        <div className={`sortBy ${selectedSortBy === '이름순' ? 'selected' : ''}`} onClick={() => handleSortByClick('이름순')}>이름순</div>
                        <div className={`sortBy ${selectedSortBy === '등록순' ? 'selected' : ''}`} onClick={() => handleSortByClick('등록순')}>최신순</div>
                        <div className={`sortBy ${selectedSortBy === '인기순' ? 'selected' : ''}`} onClick={() => handleSortByClick('인기순')}>추천순</div>
                    </div>
                <div className="sBottom">
                        <Swiper
                            // loop={true}
                            modules={[Navigation, Pagination, Keyboard]}
                            spaceBetween={20}
                            slidesPerView={3}
                            navigation
                            keyboard={{enable:true}}
                            // scrollbar={{ draggable: true }}
                        >
                            
                            {sortedCamps && sortedCamps.map((camp)=>(
                            <SwiperSlide>
                            <CardContainer  style={{backgroundImage: `url(${camp.firstImageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer'}} onClick={()=>onClickImage(camp.mapX, camp.mapY)}>
                                <CardDesc>
                                    <Title>{camp.facltNm.length > 8 ? camp.facltNm.substring(0, 8) + "..." : camp.facltNm}</Title>
                                    <CampDesc>
                                        <CampDescSection>{calculateDistance(camp)}</CampDescSection>
                                        <CampDescSection2><FontAwesomeIcon icon={faHeart} size="lg" color="red"/><span className='num'>{camp.likes}</span></CampDescSection2>
                                    </CampDesc>
                                </CardDesc>
                            </CardContainer>
                            </SwiperSlide>
                            ))}
                            
                        </Swiper>
                    </div>
            </div>
        </Section3>
    );
};

export default MainSection3;
/*
            <EventDescStyle>
                {eventList && eventList.map(event => (
                    <div className="eContainer" key={event.eventNum} onClick={()=>onClick(event.eventNum)}>
                        <div className="eventWarp">
                            <div className="eventPost" style={{backgroundImage: `url(${event.eventImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                            <div className="eNum">{event.eventNum}</div>
                            <div className="eTitle">{event.eventTitle}</div><br/>
                                <p className="eDate">
                                {event.startEvent} ~ {event.endEvent}
                                </p>
                        </div>
                    </div>
                ))}
            </EventDescStyle>
*/