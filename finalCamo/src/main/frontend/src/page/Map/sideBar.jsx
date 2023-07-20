import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components"
import SideBarList from "./sideBarList";
import { MarkerContext } from "../../context/MarkerInfo";
import LocationSelect from "./locationSelect";
import OjiSideBarList from "./ojiSideBarList";
import "../../font.css";

const SidebarStyle = styled.div`
font-family: 'LINESeedKR-Bd' ;
position: fixed;
z-index: 1;
right: -23vw;

.container {
    width: 23vw;
    height: 80vh;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out;
  }

.slideOut {
    transform: translateX(0%); /* 오른쪽으로 이동하여 숨김 */
  }

.slideIn {
    transform: translateX(-110%); /* 다시 제자리로 이동하여 펼쳐짐 */
}
    
.hideBtn{
    font-size: 1em;
    font-weight: bold;
    z-index: 3;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 35vh;
    right: 24vw;
    border: 0px;
    background-color: rgba(146, 159, 139,0.8);
    color: white;
}
.hideBtn:hover{
    background-color: rgba(45, 98, 71, 0.8);
    font-size: 1em;
    font-weight: bold;
}
.searchBar{
    height: 45%;
    width: 17vw;
    outline: none;
}
.searchBtn{
    height: 60%;
}

.titleBar{
    background-color: rgba(45, 98, 71, 0.8);
    height: 9%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid #ccc;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.locationSelect{
    display: flex;
    align-items: center;
    justify-content: baseline;
    height: 8%;
    border-bottom: 1px solid #ccc;
    margin-left: 5px;
}

.selectBar{
    width: 30%;
    height: 70%;
    border-radius: 0px;
}

.reset{
    border: none;
    background-color: #ccc;
}
.selectBar + .selectBar{
    margin-left: 5px;
}
.sortBar{
    padding-left: 6px;
    height: 5%;
    display: flex;
    justify-content: baseline;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.sortBy{
    font-size: .7rem;
    margin: 5px 8px 5px 8px;
    cursor: pointer;
}
.selected{
    font-size: .8rem;
    color: orangered;
    font-weight: bold;
}
@media screen and (max-width: 768px) {
    position: fixed;
    z-index: 1;
    right: -75vw;
    bottom: 7vh;

    .container {
    width: 75vw;
    height: 75vh;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    transition: transform 0.3s ease-in-out;
  }

    .slideOut {
    transform: translateX(0%); /* 오른쪽으로 이동하여 숨김 */
  }

    .slideIn {
    transform: translateX(-102%); /* 다시 제자리로 이동하여 펼쳐짐 */
    }

    .hideBtn{
    z-index: 3;
    border-radius: 50px;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 40vh;
    right: 76vw;
    border: 0px;
    background-color: rgba(146, 159, 139,0.8);
    color: white;
    }
    .searchBar{
    height: 45%;
    width: 70%;
    outline: none;
    }
}
`;

const Sidebar = () => {
    const context = useContext(MarkerContext);
    const {change, setChange, selectedSortBy, setSelectedSortBy, currentData, closeSideBar, setCloseSideBar} = context;

    // const [closeMenu, setCloseMenu] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [dho, setDho] = useState('ALL');
    const [sigungu, setSigungu] = useState('시.군.구');

     
    useEffect(()=>{
        console.log(dho, sigungu, selectedSortBy)
    },[dho, sigungu, selectedSortBy])

    const handleDhoChange = (event) => {
        setDho(event.target.value);
        setSigungu("시.군.구")
      };
    
    const handleSigunguChange = (event) => {
      setSigungu(event.target.value);
    };

    const handleSortByClick = (sortBy) => {
      setSelectedSortBy(sortBy);
    };


    const hideMenuBar = () => {
        setCloseSideBar(!closeSideBar);
    }

    const searchCamp = (e) => {
        setSearchValue(e.target.value)
    }

    const clickSearchCamp = () => {
        setChange(1)
    }

    const handleResetClick = () => {
        setDho("ALL");
        setSigungu("시.군.구");
    }
    

   

    return(
        <SidebarStyle>
             <div className={`container ${closeSideBar ? "slideOut" : "slideIn"}`}>
                <div className="titleBar">
                    <input className="searchBar" type="text" placeholder="캠핑장 이름을 검색하세요" onChange={searchCamp}/>
                    <button className="searchBtn" onClick={clickSearchCamp}>검색</button>
                </div>
                
                <LocationSelect dho={dho} sigungu={sigungu} onDhoChange={handleDhoChange} onSigunguChange={handleSigunguChange} onResetClick={handleResetClick} />
                
                <div className="sortBar">
                    <p className={`sortBy ${selectedSortBy === '이름순' ? 'selected' : ''}`} onClick={() => handleSortByClick('이름순')}>이름순</p>
                    <p className={`sortBy ${selectedSortBy === '등록순' ? 'selected' : ''}`} onClick={() => handleSortByClick('등록순')}>등록순</p>
                    <p className={`sortBy ${selectedSortBy === '조회순' ? 'selected' : ''}`} onClick={() => handleSortByClick('조회순')}>조회순</p>
                    <p className={`sortBy ${selectedSortBy === '인기순' ? 'selected' : ''}`} onClick={() => handleSortByClick('인기순')}>인기순</p>
                    <p className={`sortBy ${selectedSortBy === '댓글순' ? 'selected' : ''}`} onClick={() => handleSortByClick('댓글순')}>댓글순</p>
                </div>
                <div className="locationList">
                    {currentData === "ojinoji" ? 
                    <OjiSideBarList searchValue={searchValue} change={change} dho={dho} sigungu={sigungu} />
                    :
                    <SideBarList searchValue={searchValue} change={change} dho={dho} sigungu={sigungu} />
                    }
                </div>
                <button className="hideBtn" onClick={hideMenuBar}>{closeSideBar ? "<<" : ">>"}</button>
            </div>
        </SidebarStyle>
    )
}
export default Sidebar;