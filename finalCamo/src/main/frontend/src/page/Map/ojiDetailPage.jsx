import styled from "@emotion/styled";
import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import VisibilityButton from "../../Commons/visibility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faFlag } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AxiosApi from "../../API/TestAxios";
import ShareButton from "../../Commons/shareButton";
import sun from "../../images/맑음.png"
import sunClound from "../../images/구름많음.png"
import cloud from "../../images/흐림.png"
import rain from "../../images/비.png"
import snow from "../../images/눈.png"
import snowRain from "../../images/눈비.png"
import cloudRain from "../../images/소나기.png"
import umbrellaImg from "../../images/우산.png"
import highTem from "../../images/최고기온.png"
import lowTem from "../../images/최저기온.png"
import navigationImg from "../../images/길찾기.png"
import roadMapImg from "../../images/로드맵.png"
import OjiIconList from "./ojiIconList";
import OjiImageList from "./OjiImageList";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`

    margin: 0;
    padding: 0;
    .closeBtn{
        border-radius: 50px;
        width: 60px;
        height: 60px;
        position: absolute;
        bottom: 37vh;
        right: 41.5vw;
        border: 0px;
        background-color: rgba(146, 159, 139,0.8);
        color: white;
    }
    .closeBtn:hover{
        background-color: rgba(45, 98, 71, 0.8);
        font-size: 1em;
        font-weight: bold;
    }
    .hide{
        display: none;
    }
    @media screen and (max-width: 768px) {
        .closeBtn{
        border-radius: 50px;
        width: 60px;
        height: 60px;
        position: absolute;
        bottom: 51vh;
        right: 85vw;
        border: 0px;
        background-color: rgba(146, 159, 139,0.8);
        color: white;
    }
    }
`;
const DetailContainer = styled.div`
    z-index: 2;
    position: fixed;
    right: -71vw;
    bottom: 5vh;
.container{
    width: 40vw;
    height: 81vh;
    overflow-y: scroll;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out;
}

.slideOut {
    
    transform: translateX(0vw); /* 다시 제자리로 이동하여 펼쳐짐 */
   
  }

.slideIn {
    margin: 0;
    padding: 0;
    transform: translateX(-71vw); /* 오른쪽으로 이동하여 숨김 */
}
.hide {
    display: none;
}   
@media screen and (max-width: 768px) {
    z-index: 2;
    position: fixed;
    right: -80vw;
    bottom: 1vh;
    .container{
    width: 80vw;
    height: 80vh;
    overflow-y: scroll;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out;
    font-size: .8em;
}
.slideOut {
    
    transform: translateX(0vw); /* 다시 제자리로 이동하여 펼쳐짐 */
   
  }

.slideIn {
    margin: 0;
    padding: 0;
    transform: translateX(-80vw); /* 오른쪽으로 이동하여 숨김 */
}
}
    
`;
const TitleBar = styled.div`
    background-color: rgba(45, 98, 71, 0.8);
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`;
const TitleBarLeft = styled.h3`
    margin-left: 1em;
    color: #f6f6f6;
`;

const TitleBarRight = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    
`;
const Addr = styled.div`
    font-size: .75em;
    font-weight: 600;
    margin-right: .5em;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    margin-top: 1em;
    .addr{
        padding: 0;
        color: white;
        margin: 0;
    }
    .addr + .addr{
        margin-left: .3em;
    }
`;
const ViewCount = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 1em;
    
    .countNm{
        font-weight: 600;
        color: #313131;
    }
`;
const LickCommentShare = styled.div`
    height: 7vh;
    width: 90%;
    margin: auto;
    border-bottom: .5px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const LikeCommentArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;
const Number = styled.p`
    margin-left : .5em;
    margin-right: .8em;
    font-weight: 600;
`;
const ShareArea = styled.div`
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: .9em;
`;
const Section = styled.div`
    height: 7vh;
    display: flex;
    align-items: center;
    width: 80%;
    margin-left: 1em;
    justify-self: baseline;
    @media screen and (max-width: 768px) {
            .selectDate{
                position: absolute;
                top: 5vh;
                right: 4vh;
                font-size: 1em;
            }
    }
    
    .selectDateSec{
        display: flex;
        margin-right: 10px;
        height: 2rem;
        position: absolute;
        right: .5em;
         .weatherSection{
        position: absolute;
        font-weight: bold;
        font-size: .8em;
        width: 100%;
        display: flex;
        justify-content: right;
        align-items: center;
        div + div{
            margin-right:.5rem;
        }
        img + div{
            margin-right: .5rem;
        }
        .img{
        width: 3.5vw;
        height: 3.5vh;
        margin-right: 1rem;
        }
        .umb{
            width: 1vw;
            height: 2vh;
            margin-left: 1rem;
        }
        @media screen and (max-width: 768px) {
            .umb{
            width: 3vw;
            height: 3vw;
            margin-left: 1rem;
        }
    }
    
    }
    }
    .selectDate{
        margin-right: 10px;
        width: 6vw;
        height: 2rem;
        border: none;
        color: royalblue;
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
            .selectDate{
                width: 15vw;
            }
            .wImage{
                position: absolute;
                top: 5vh;
                right: 0vh;
            }
    }
    .km{
        color: red;
        font-weight: bold;
        margin-left: 1em;
    }
    .campInfo{
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
    }
    .img{
        width: 3.5vw;
        height: 3.5vh;
        margin-right: 15px;
    }
    .umb{
        width: 2vw;
        height: 4vh;
        margin-left: 15px;
    }
    .weatherSection{
        font-weight: bold;
        font-size: .8em;
        width: 100%;
        display: flex;
        align-items: center;
        div + div{
            margin-right:10px;
        }
        img + div{
            margin-right: 10px;
        }
        .selectDate{
            margin-right: 10px;
            width: 6vw;
            height: 2rem;
        }
        
        .umb{
            width: 10vw;
            height: 4vw;
        }
    }
    @media screen and (max-width: 768px) {
        .weatherSection{
            position: absolute;
            top: 3vh;
        }
    }
    

`;

const Navigiation = styled.div`
    margin-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15vh;
    .btnSection{
        display: flex;
        flex-direction: column;
        margin: 0 1vw;
        justify-content: center;
        align-items: center;
    }
    .cen{
        margin-right: 4vw;
    }
    .img{
        width: 3vw;
        height: 3vw;
    }
    
    .btn{
        background-color: rgba(20, 151, 42, 0.3);
        width: 5vw;
        height: 5vw;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .longBtn{
        background-color: rgba(20, 151, 42, 0.3);
        width: 5vw;
        height: 5vw;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: .8em;
        flex-wrap: wrap;
    }
    @media screen and (max-width: 768px) {
        .btn{
            width: 12vw;
            height: 12vw;
        }
        .img{
        width: 8vw;
        height: 8vw;
    }
    }
   
`;
const Information = styled.div`
    margin-top: 3.5vh;
    margin-bottom: 3.5vh;
    margin-left: 1em;
    display: flex;  
    width: 90%;
    height: auto;
    .campInfo{
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
        width: 5vw;
        margin-right: .5em;
        flex-basis: 15%;
    }
    .img{
        left: 2vw;
        width: 10vw;
        flex-basis: 25%;
        position: absolute;
    }
    .value{
        font-size: .8em;
        flex-basis: 75%;
        font-weight: 500;
        margin-right: 0;
    }
    @media screen and (max-width: 768px) {
        .campInfo{
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
        width: 10vw;
        margin-right: .5em;
        flex-basis: 20%;
    }
    }
`;
const ImageInfo = styled.div`
    padding-top: 3.5vh;
    margin-left: 1em;
    display: flex;  
    width: 95%;
    height: auto;
    margin-bottom: 5vh;
    .campInfo{
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
        width: 5vw;
        margin-right: .5em;
        flex-basis: 15%;
        position: absolute;
        left: 2em;
    }
    .img{
        left: 2vw;
        width: 10vw;
        flex-basis: 25%;
        position: absolute;
    }
    .value{
        font-size: .8em;
        flex-basis: 75%;
        font-weight: 500;
    }
    @media screen and (max-width: 768px) {
        .campInfo{
            position: absolute;
            left: 2em;
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
        width: 10vw;
        margin-right: .5em;
        
    }
    .value{
        font-size: .8em;
        flex-basis: 70%;
        font-weight: 500;
    }
    }
`;
const IconBox = styled.div`
    margin-top: 5vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: auto;
    margin-bottom: 15vh;

    .iconBoxDesc{
        margin-left: 1vw;
        margin-bottom: 1vw;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 50%;
    }
    .campInfo{
        font-weight: bold;
        font-size: .85em;
        margin-left: .5em;
        width: auto;
        margin-right: .5em;
        
    }
`;

const OjiDetailPage = (props) => {
    const {open, close, campInfo} = props
    const context = useContext(MarkerContext);
    const {myLoc, location, ojiLikeClicked} = context;
    const [minTem, setMinTem] = useState("");
    const [maxTem, setMaxTem] = useState("");
    const [pop, setPop] = useState("");
    const [sky, setSky] = useState("");
    const [pty, setPty] = useState("");
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(minDate);
    const formattedDate = selectedDate.replaceAll('-', '');
    
    useEffect(()=>{
        if(location[1] === 0) {
          return;
        } else{
            const currentDate = new Date();
            const currentHour = currentDate.getHours();
        
            // Check if current hour is between 00:00 and 05:00
            if (currentHour >= 0 && currentHour < 5) {
              // Subtract 1 day from the current date
              currentDate.setDate(currentDate.getDate() - 1);
            }
        
            const year = String(currentDate.getFullYear());
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");
        
            const date = year + month + day;
            let mapX = Math.floor(location[1]);
            let mapY = Math.floor(location[0]);
          const getWeather = async() => {
              const rsp = await AxiosApi.getWeather(mapX, mapY, date);
              const filteredData = rsp.data.filter(item => item.fcstDate === formattedDate && (item.category === 'TMN' || item.category === 'TMX'))
              const popData = rsp.data.filter(item => item.fcstDate === formattedDate && (item.category === 'POP' || item.category === 'SKY' || item.category === 'PTY')&& item.fcstTime === '1200')
              console.log(popData)
              let maxTemperature = -Infinity;
              let minTemperature = Infinity;
    
              filteredData.forEach(item => {
                const temperature = parseInt(item.fcstValue);
                if (temperature > maxTemperature) {
                  maxTemperature = temperature;
                }
                if (temperature < minTemperature) {
                  minTemperature = temperature;
                }
              });
              
              console.log('최고 기온:', maxTemperature);
              console.log('최저 기온:', minTemperature);
              setMinTem(minTemperature);
              setMaxTem(maxTemperature);
              setSky(popData[0].fcstValue);
              setPty(popData[1].fcstValue);
              setPop(popData[2].fcstValue);
              
          }
          getWeather();
        }
      },[location, formattedDate])

    const splitAddress = (address) => {
        const addressParts = address.split(' ');
        const province = addressParts[0]; // '강원도'
        const city = addressParts[1]; // '춘천시'
        const town = addressParts[2]; // '남면 가옹개길 52-9'
        return { province, city, town };
    };


    const calculateDistance = () => {
        if (campInfo && campInfo.length > 0) {
          const R = 6371; // 지구 반경 (단위: km)
          const lat1 = myLoc[0];
          const lon1 = myLoc[1];
          const lat2 = campInfo[0].mapY;
          const lon2 = campInfo[0].mapX;
      
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
      
      const findRoadUrl = () => {
        if(campInfo) {
            const endPoint = "https://map.kakao.com/link/to/";
            let name = campInfo[0].facltNm;
            let lat = campInfo[0].mapY;
            let lon = campInfo[0].mapX;
            return `${endPoint},${name},${lat},${lon}`
        }
      };
      
      const roadViewUrl = () => {
        if(campInfo) {
            const endPoint = "https://map.kakao.com/link/roadview/"
            let lat = campInfo[0].mapY;
            let lon = campInfo[0].mapX;
            return `${endPoint},${lat},${lon}`
        }
      }

      const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
      };

      const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };

      const getWeatherImage = () => {
        if (pty === '0') {
          switch (sky) {
            case '1':
                return <div className="img" style={{backgroundImage: `url(${sun})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            case '3':
                return <div className="img" style={{backgroundImage: `url(${sunClound})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            case '4':
                return <div className="img" style={{backgroundImage: `url(${cloud})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            default:
                
          }
        } else {
          switch (pty) {
            case '1':
                return <div className="img" style={{backgroundImage: `url(${rain})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            case '2':
                return <div className="img" style={{backgroundImage: `url(${snowRain})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            case '3':
                return <div className="img" style={{backgroundImage: `url(${snow})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            case '4':
                return <div className="img" style={{backgroundImage: `url(${cloudRain}})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>;
            default:
          }
        }
      };

      
    return(
        <Container>
        <button className={open ? "closeBtn" : "hide"} onClick={close}>숨기기</button>
        <DetailContainer>
            
            <div className={`container ${open ? "slideIn" : "slideOut"}`}>
                {/* <button className={open ? "closeBtn" : "hide"} onClick={close}>숨기기</button> */}
                {campInfo && campInfo.map((campInfo) => {
                    const { province, city, town } = splitAddress(campInfo.addr1);

                    return(
                    <>
                    <div className="detailPage" key={campInfo.intro}>
                    <TitleBar>
                        <TitleBarLeft>{campInfo.facltNm}</TitleBarLeft>
                        <TitleBarRight>
                            <Addr>
                                <p className="addr">{province}</p>
                                <p className="addr">＞</p>
                                <p className="addr">{city}</p>
                                <p className="addr">＞</p>
                                <p className="addr">{town}</p>
                            </Addr>
                            <ViewCount>
                                <VisibilityButton />
                                <div className="countNm">{campInfo.viewCount}</div>
                            </ViewCount>
                        </TitleBarRight>
                    </TitleBar>
                    <LickCommentShare>
                        <LikeCommentArea>
                            <FontAwesomeIcon icon={faHeart} size="lg" color="red"/>
                            <Number>{ojiLikeClicked ? 1 : 0}</Number>
                            <FontAwesomeIcon icon={faComment} size="lg" color="green"/>
                            <Number>0</Number>
                        </LikeCommentArea>
                        <ShareArea>
                            공유하기
                            <ShareButton />
                        </ShareArea>
                    </LickCommentShare>
                    <Section>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#9c9c9c" />
                        <div className="km">{calculateDistance()}</div>
                        <div className="campInfo">{campInfo.addr1}</div>
                        <div className="selectDateSec">
                            <input className="selectDate" type="date" min={minDate} max={maxDate} onChange={handleDateChange} value={selectedDate}/>
                            <div className="wImage">{getWeatherImage()}</div>
                        </div>
                    </Section>
    
                    <Section>
                    <FontAwesomeIcon icon={faLocationDot} size="lg" color="#9c9c9c" />
                        <div className="campInfo">캠핑난이도
                        {[...Array(5)].map((_, index) => (
                                <FontAwesomeIcon
                                key={index}
                                icon={index < Math.round(campInfo.diff) ? fasStar : farStar}
                                color={index < Math.round(campInfo.diff) ? "#ffc107" : "#e4e5e9"}
                                size="lg"
                                />
                            ))}
                        </div>
                        <div className="selectDateSec">
                            <div className="weatherSection">
                                <img className="img umb" src={highTem} alt="highTem Icon" />
                                <div>{maxTem}°C</div>
                                <img className="img umb" src={lowTem} alt="lowTem Icon" />
                                <div>{minTem}°C</div>
                                <img className="img umb" src={umbrellaImg} alt="Umbrella Icon" />
                                <div>{pop}%</div>
                            </div>
                        </div>
                    </Section>
                    <Navigiation>
                        <div className="btnSection">
                            <a href={findRoadUrl()} className="btn" target="_blank"><img className="img" src={navigationImg} alt="" /></a>
                            <p>길찾기</p>
                        </div>
                        <div className="btnSection">
                            <a href={roadViewUrl()}className="btn" target="_blank"><img className="img" src={roadMapImg} alt="" /></a>
                            <p>로드뷰</p>
                        </div>
                    </Navigiation>
                    <IconBox>
                        <div className="iconBoxDesc">
                            <FontAwesomeIcon icon={faLocationDot} size="lg" color="#9c9c9c" />
                            <div className="campInfo">야영지 시설</div>
                        </div>
                        <OjiIconList />
                    </IconBox>
                    <Information>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#9c9c9c" />
                        <div className="campInfo">야영지 정보</div>
                        <div className="value">
                        {campInfo.intro ? campInfo.intro : (campInfo.featureNm ? campInfo.featureNm : "소개글이 없습니다.")}
                        </div>
                    </Information>
                    <ImageInfo>
                        <FontAwesomeIcon icon={faLocationDot} size="lg" color="#9c9c9c" />
                        <div className="campInfo">이미지</div>
                        <div className="value">
                            <OjiImageList />
                        </div>
                    </ImageInfo>
                    
                    </div>
                    </>
                    );
                })}
            </div>
        </DetailContainer>
        </Container>
    )
}
export default OjiDetailPage;