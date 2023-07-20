import React, {useState, useContext} from "react";
import { MainStyle } from "./mapMain";
import markerImage from "../../images/모닥불.png";
import Header from "../../main/header";
import Sidebar from "./sideBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AxiosApi from "../../API/TestAxios";
import { MarkerContext } from "../../context/MarkerInfo";
import OjiKakaoMap from "./OjiKaKao";
import OjiOverlay from "./ojiOverlay";
import newMark from "../../images/종이펜.png"
import "../../font.css";



const OjiNojiMapMain = () => {
    const context = useContext(MarkerContext);
    const {overlayOpen, setOverlayOpen, setCurrentData, isSubmit} = context;
    const [markerPositions, setMarkerPositions] = useState([]);
    const nav = useNavigate();

    useEffect(()=>{
        const loading = async() => {
            const getOjiNojiData = async() => {
                const rsp = await AxiosApi.getOjiNojiData("ALL", "시.군.구");
                const positions = rsp.data.map(item => [item.mapY, item.mapX, item.facltNm]);
                console.log(rsp);
                if(rsp.request.status === 200) {
                    setMarkerPositions(positions);
                    setCurrentData("ojinoji")
                    console.log(positions);
                }
            }
            getOjiNojiData();
            console.log(markerPositions);
        } 
        loading();
    },[isSubmit])

    const closeOverlay = () => {
        setOverlayOpen(false)
      }

    return(
        <>
        <Header/>
        <MainStyle>
            <div className="App">
                <div id="wrap" style={{width: '100vw', height: '89vh'}}>
                <OjiKakaoMap markerPositions={markerPositions} campLocMarkerImg={markerImage}/>
                <Sidebar />
                <OjiOverlay open={overlayOpen} close={closeOverlay}/>
                <div className="selectBtn">
                    <div className="btnSection" onClick={()=>nav("/newMark")}>
                        <img className="img" src={newMark} alt="" />
                        <p>캠핑장 등록</p>
                    </div>
                </div>
                </div>
            </div>
        </MainStyle>
        </>
    );
}
export default OjiNojiMapMain;