import { createContext, useState } from "react";
export const MarkerContext = createContext(null);

const MarkerStore = (props) => {
    const[markerLat, setMarkerLat] = useState(37.50802);
    const[markerLng, setMarkerLng] = useState(127.062835);
    const[zoomLev, setZoomLev] = useState(10);
    const[viewOverlay, setViewOverlay] = useState(false);
    const[overlayOpen, setOverlayOpen] = useState(false);
    const[closeMenu, setCloseMenu] = useState(false);
    const[location, setLocation] = useState([0,0]);
    const[currentData, setCurrentData] = useState("normal");
    const[change, setChange] = useState(0);
    const[selectedSortBy, setSelectedSortBy] = useState('이름순');
    const[myLoc, setMyLoc] = useState([]);
    const[contentId, setContentId] = useState("");
    const[isLatlng, setLatlng] = useState([]);
    const[xValue, setXValue] = useState(126.9784);
    const[yValue, setYValue] = useState(37.5667);
    const [count, setCount] = useState(0);
    const [likeClicked, setLikeClicked]= useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [closeSideBar, setCloseSideBar] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [ojiLikeClicked, ojiSetLickClicked]= useState(false);




    return(
        <MarkerContext.Provider value={{markerLat, setMarkerLat, markerLng, setMarkerLng, zoomLev, setZoomLev, viewOverlay, setViewOverlay, overlayOpen, setOverlayOpen,
            closeMenu, setCloseMenu, location, setLocation, currentData, setCurrentData, change, setChange, selectedSortBy, setSelectedSortBy, myLoc, setMyLoc, contentId, setContentId,
            isLatlng, setLatlng, xValue, setXValue, yValue, setYValue, count, setCount, likeClicked, setLikeClicked, commentCount, setCommentCount, closeSideBar, setCloseSideBar,
            isSubmit, setIsSubmit, ojiLikeClicked, ojiSetLickClicked }}>
            {props.children}
        </MarkerContext.Provider>
    );
};
export default MarkerStore;