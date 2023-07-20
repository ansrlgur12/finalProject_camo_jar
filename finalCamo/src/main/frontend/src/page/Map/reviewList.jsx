import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import NaverAPI from "../../API/NaverAPI";
const ReviewCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    margin: 0 2vw;
    padding: 1em;
    box-shadow: 1px salmon;
    .name{
        padding-bottom: 2vh;
        border-bottom: .5px solid #ccc;
        margin-bottom: 2vh;
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
`;
const ReviewList = styled.div`
    padding-top: 2vh;
    padding-bottom: 2vh;
    height: auto;
    display: flex;
    border-bottom: .5px solid #ccc;
    .right{
        cursor: pointer;
        margin-left: 2vw;
    }
    .desc{
        font-size: .8em;
        display: flex;
        flex-wrap: wrap;
    }
    .blogNm{
        margin-top: 1vh;
        color: royalblue;
        font-weight: bold;
        font-size: .8em;
    }
    .date{
        font-size: .8em;
        font-weight: 500;
    }
    .title{
        font-size: 1.1em;
        margin-bottom: .5em;
    }
    .nameDate{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
const CampReview = () => {

    const context = useContext(MarkerContext);
    const {contentId} = context;
    const [blogData, setBlogData] = useState([]);
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        const getBlogData = async () => {
            const rsp = await NaverAPI.SearchBlogs(contentId.facltNm);
            console.log(rsp.data)
            setBlogData(rsp.data.items)
        }
        getBlogData();
        
    },[contentId])

    const formatDate = (dateString) => {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}.${month}.${day}`;
      };

      const postClick = (link) => {
        window.open(link, "_blank");
      };

      const stripHtmlTags = (htmlString) => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(htmlString, "text/html");
        return parsed.body.textContent;
      };

      const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedBlogs = blogData.slice(startIndex, endIndex);

    const totalCamps = blogData.length;
    const totalPages = Math.ceil(totalCamps / pageSize);
    
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
        setCurrentPage(pageNumber);
      };

    return(
        <ReviewCard>
                {displayedBlogs && displayedBlogs.map((blog) => (
                    <ReviewList>
                    <div className="right" onClick={()=>postClick(blog.link)}>
                    <div className="title" dangerouslySetInnerHTML={{ __html: blog.title }}></div>
                    <div className="desc">{stripHtmlTags(blog.description)}</div>
                    <div className="nameDate">
                        <div className="blogNm">{blog.bloggername}</div>
                        <div className="date">{formatDate(blog.postdate)}</div>
                    </div>
                </div>
                    </ReviewList>
                ))}
                 <div className="btnBox">
                {startPage > 1 && (<button className="arrowBtn" onClick={() => handlePageChange(startPage - 1)}>{"<"}</button>)}
                {[...Array(endPage - startPage + 1)].map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <button className={pageNumber === currentPage ? "numBtn active" : "numBtn"} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                    );
                })}
                {endPage < totalPages && (<button className="arrowBtn" onClick={() => handlePageChange(endPage + 1)}>{">"}</button>)}
            </div>
        </ReviewCard>
    )
};
export default CampReview;