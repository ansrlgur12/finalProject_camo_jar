import React from "react";
import { styled } from "styled-components";
import itemp1 from "../images/itemp1.jpg";
import itemp2 from "../images/itemp2.jpg";
import itemp3 from "../images/itemp3.jpg";
import { useNavigate } from "react-router-dom";
import "../font.css";
import MainSection3 from "./mainSection3";

const Section2 = styled.div`
    margin-top: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    
    .itemBtn{
        font-family: 'LINESeedKR-Bd';
        width: 10vw;
    }
    .container2{
        width: 90vw;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .item{
        margin: 0;
        padding: 0;
        cursor: pointer;
        position: relative;
    }

    .item:hover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .item:hover .itemtext,
    .item:hover .desc {
        transform: translateY(-20px);
        opacity: 1;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        
    }

    .item1{
        width: 38vw;
        height: 500px;
        margin-right: 2vw;
        background-image: url(${itemp1});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item2{
        width: 50vw;
        background-image: url(${itemp2});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item3{
        width: 100vw;
        height: 500px;
        margin-top: 4vh;
        background-image: url(${itemp3});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 5vh;
    }

    .itemtext {
        color: white;
        font-size: 2rem;
        margin-left: 40px;
        transform: translateY(20px);
        opacity: 0;
        text-shadow: 2px 2px 5px #ccc; /* 테두리 색과 크기 설정 */
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
    .desc{
        color: white;
        font-size: 1.2rem;
        margin-top: 1em;
        margin-left: 40px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }

    .itemBtn {
        font-size: 1.2rem;
        margin: 10px 0 0 40px;
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    }
    @media screen and (max-width: 768px) {
        margin-top: 20px;
         .item1{
        width: 38vw;
        height: 20vh;
        margin-right: 2vw;
        background-image: url(${itemp1});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item2{
        width: 50vw;
        background-image: url(${itemp2});
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .item3{
        width: 100vw;
        height: 25vh;
        margin-top: 4vh;
        background-image: url(${itemp3});
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .itemtext {
        color: white;
        font-size: 1rem;
        margin-top: 1rem;
        margin-left: 1rem;
        transform: translateY(0px);
        opacity: 1;
    }
    .desc{
        font-size: .8rem;
        margin-top: 1rem;
        margin-left: 1rem;
        transform: translateY(0px);
        opacity: 1;
    }
    .itemBtn {
        width: 15vw;
        font-size: .8rem;
        margin: 1rem 0 0 1rem;
        transform: translateY(0px);
        opacity: 1;
    }

    .item:hover .itemtext,
    .item:hover .desc {
        transform: translateY(0px);
    }
    }
`;

const MainSection2 = () => {
    const nav = useNavigate();
    return (
        <Section2>
            <div className="container2">
                <div className="item item1" onClick={() => nav('/newMark')}>
                    <div className="itemtext">무료로 이용할 수 있는<br /> 캠핑장을 공유해주세요!</div>
                    <div className="desc">오지·노지 등록하기</div>
                </div>
                <div className="item item2" onClick={() => nav('/shopMain')}>
                    <div className="itemtext">인기 제품을 만나러 가요!</div>
                    <div className="desc">쇼핑</div>
                </div>
                <MainSection3 />
                <div className="item item3" onClick={() => nav('/community')}>
                    <div className="itemtext">캠퍼들 사이에 소문난 캠핑장을 확인해 보세요!</div>
                    <div className="desc">캠핑정보 게시판</div>
                </div>
            </div>
        </Section2>
    );
};

export default MainSection2;
