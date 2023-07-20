import React, { useState } from "react";
import styled from "@emotion/styled";
import MediaSidebar from "./mediaSidebar";

const SmallSideBarContainer = styled.div`
    display: none;
    background-color: white;
    @media screen and (max-width: 768px) {
    position: relative;
     display: flex;
     width: 1vh;
     justify-content: center;
     align-items: center;
     z-index: 2;
     .btn{
        background-color: rgba(45, 98, 71, 0.5);
        color: white;
        font-weight: bold;
        position: absolute;
        top: 40vh;
        width: 10vw;
        height: 10vw;
        border-radius: 50px;
        border: none;
     }
     .moveRight{
        left: 55vw;
     }
    }
`;

const SmallSideBar = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    const openSideBar = () => {
        setOpenSidebar(!openSidebar);
        console.log(openSidebar)
    }

    return(
        <>
        <SmallSideBarContainer>
            <div className="btnSection">
            <button className={openSidebar ? "btn moveRight" : "btn"} onClick={openSideBar}>{openSidebar ? "<<" : ">>"}</button>
            </div>
            
        </SmallSideBarContainer>
        {openSidebar ? <MediaSidebar /> : ""}
        </>
    );
}

export default SmallSideBar;