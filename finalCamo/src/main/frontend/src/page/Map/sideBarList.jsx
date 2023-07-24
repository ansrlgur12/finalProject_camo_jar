import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { MarkerContext } from "../../context/MarkerInfo";
import { useContext } from "react";
import AxiosApi from "../../API/TestAxios";
import noImage from "../../images/CAMOLOGO.png"

const ListStyle = styled.div`

.count{
    margin-left: .5em;
    margin-top: .5em;
    font-size: .8em;
    display: flex;
    align-items: center;
}

.red{
    margin: 0;
    padding: 0;
    margin-left: .4em;
    color: royalblue;
    font-weight: bold;
}

.listContainer{
    height: 13vh;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: row;



}
.leftSide{
    flex-basis: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.imageContainer{
    margin-left: 1em;
    width: 100px;
    height: 10vh;
    background-color: #ccc;
    border-radius: 15px;
}
.rightSide{
    padding-left: 10px;
    display: flex;
    flex-direction: column;
}
.campTitle{
    margin-top: 1em;
    font-weight: bold;
}
.campAddr{
    display: flex;
    flex-direction: row;
}
.addr{
    margin-top: .5em;
    font-size: .8em;
    margin-right: .3em;
    color: royalblue;
    font-weight: bold;
}
.btnBox{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.numBtn{
    width: 30px;
    height: 30px;
    border: .5px solid #ccc;
    background-color: white;
    font-size: large;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
}
.numBtn + .numBtn{
    margin-left: 10px;
}
.active{
    background-color: rgb(45, 98, 71);
    color: white;
}

.arrowBtn{
    margin: 0 10px;
    border: .5px solid #ccc;
    background-color: white;
}

.arrowBtn:active{
    background-color: rgb(45, 98, 71);
    color: white;
}

@media screen and (max-width: 768px) {
    .numBtn{
        width: 25px;
        height: 25px;
        font-size: medium;
    }
}
`;

const SideBarList = (props) => {
    const context = useContext(MarkerContext);
    const {searchValue, change, dho, sigungu} = props;
    const {setMarkerLat, setMarkerLng, setZoomLev, setChange, currentData, setOverlayOpen, setLocation, selectedSortBy, setCloseSideBar} = context;
    const [currentPage, setCurrentPage] = useState(0);
    const [campListData, setCampListData] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 4;


    useEffect(()=>{

        if(currentData === 'animal') {
            const getAnimalList = async() => {
                const rsp = await AxiosApi.getSidebarList(dho, sigungu, currentPage, pageSize, selectedSortBy);
                console.log(rsp.data);
                console.log(rsp.data.totalElements);
                setTotalPages(rsp.data.totalPages);
                setCampListData(rsp.data.content);
            }
            getAnimalList();
        } else if(currentData === 'normal') {
            const getCampList = async() => {
                const rsp = await AxiosApi.getSidebarList(dho, sigungu, currentPage, pageSize, selectedSortBy);
                console.log(rsp.data);
                console.log(rsp.data.totalElements);
                setTotalPages(rsp.data.totalPages);
                setCampListData(rsp.data.content);
            }
            getCampList();
        } else if(currentData === "ojinoji") {
            const getOjiList = async ()=> {
                const rsp = await AxiosApi.getOjiNojiData(dho, sigungu);
                setCampListData(rsp.data);
                setCurrentPage(1);
            }
            getOjiList();
        }

    },[currentData, dho, sigungu, currentPage, selectedSortBy])

    useEffect(()=>{
        if(change === 1) {
            console.log(searchValue)
            const searchCamp = async() => {
                const rsp = await AxiosApi.searchCampData(searchValue, currentData, currentPage, pageSize);
                setCampListData(rsp.data.content);
                console.log(rsp.data.totalPages);
                setTotalPages(rsp.data.totalPages);
                setCurrentPage(0);
                setChange(0)
            }
            searchCamp();
        }
    },[change, searchValue, currentData, selectedSortBy])


    const onClickData = (x, y) => {
        console.log(x)
        console.log(y)
        setMarkerLng(x);
        setMarkerLat(y);
        setZoomLev(1);
        setLocation([x, y]);
        setOverlayOpen(true);
        setCloseSideBar(true);
    }

    const sortCamps = (camps) => {
        switch (selectedSortBy) {
          case '이름순':
            return [...camps].sort((a, b) => a.facltNm.localeCompare(b.facltNm));
          case '등록순':
            return [...camps].sort((a, b) => new Date(b.createdtime) - new Date(a.createdtime));
          case '조회순':
            return [...camps].sort((a, b) => Number(b.viewCount) - Number(a.viewCount));
          case '인기순':
            return [...camps].sort((a, b) => Number(b.likes) - Number(a.likes));
          case '댓글순':
            return [...camps].sort((a, b) => Number(b.comments) - Number(a.comments));
          default:
            return [...camps];
        }
      };


      // 정렬된 캠핑장 목록
      const sortedCamps = sortCamps(campListData);

    
        // 현재 페이지를 중심으로 앞/뒤로 표시할 페이지 버튼의 개수
    const maxPageButtons = 5;
    const pageButtonRange = Math.floor(maxPageButtons / 2);

    // 현재 페이지를 기준으로 표시할 페이지 버튼의 범위 계산
    let startPage = Math.max(currentPage - pageButtonRange, 1);
    let endPage = Math.min(currentPage + pageButtonRange, totalPages);

    // 표시할 페이지 버튼의 개수가 maxPageButtons보다 작을 경우 범위 조정
    if (endPage - startPage < maxPageButtons - 1) {
        if (currentPage - startPage < pageButtonRange) {
        endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
        } else {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
      };

    const splitAddress = (address) => {
        const addressParts = address.split(' ');
        const province = addressParts[0]; // '강원도'
        const city = addressParts[1]; // '춘천시'
        const town = addressParts[2]; // '남면 가옹개길 52-9'
        return { province, city, town };
    };

    return (
        <ListStyle>
          {campListData && campListData.map((campListData) => {
            const { province, city, town } = splitAddress(campListData.addr1);
    
            return (
              <div className="listContainer" key={campListData.facltNm}>
                <div className="leftSide">
                  <div className="imageContainer" style={{ backgroundImage: `url(${campListData.firstImageUrl ? campListData.firstImageUrl : noImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
                </div>
                <div className="rightSide" onClick={() => onClickData(campListData.mapX, campListData.mapY)}>
                  <div className="campTitle">
                    {campListData.facltNm.length > 12 ? campListData.facltNm.substring(0, 12) + "..." : campListData.facltNm}
                  </div>
                  <div className="campAddr">
                    <p className="addr">{province}</p>
                    <p className="addr">＞</p>
                    <p className="addr">{city}</p>
                    <p className="addr">{town ? "＞" : ""}</p>
                    <p className="addr">{town ? town : ""}</p>
                  </div>
                </div>
              </div>
            );
            })}
            <div className="btnBox">
                {startPage > 1 && (<button className="arrowBtn" onClick={() => handlePageChange(startPage - 1)}>{"<"}</button>)}
                {[...Array(endPage - startPage + 1)].map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <button className={pageNumber === currentPage + 1 ? "numBtn active" : "numBtn"} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                    );
                })}
                {endPage < totalPages && (<button className="arrowBtn" onClick={() => handlePageChange(endPage + 1)}>{">"}</button>)}
            </div>
        </ListStyle>
    )
}

export default SideBarList;