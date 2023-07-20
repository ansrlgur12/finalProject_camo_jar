import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import introLogo from "../images/CAMO로고3.png"
import VideoBackground from "./introBack";
import Login from "./login/login";
import "../font.css";


const IntroStyle = styled.div`
    box-sizing: border-box;
    
    .Login{
        display: none;
    }
    .introLogoBox {
        width: 140px;
        height: 140px;
    }
    .introContainer {
        display: flex;
        flex-direction: column;
        padding-top: 24vh; // height와 합쳐서 100vh이면 한 화면 모두 차지, 넘으면 스크롤 발생
        height: 76vh;
        width: 100vw;
        background: linear-gradient(to right, black, transparent);
    }
    .introContainer2{
        padding-left: 10vw;
        opacity: 0;
        transition: opacity 0.6s ease-in-out;
    }
    .introContainer2.show{
        opacity: 1;
    }
    .introBody{

    }
    .camoBody {
        font-size: 3rem;
        font-weight: bold;
        color: #f9f9f9;
        margin: 20px 0 20px 0;
    }
    .loginBtn{
        font-family: 'GongGothicMedium';
        width: 80px;
        height: 40px;
        font-size: 1.2rem;
        border-radius: 8px;
        padding: 0;
        cursor: pointer;
    }
    .loginBtn:hover{
        background-color: #2D6247;
        padding: 0;
        color: #ccc
    }
    .p1{
        font-family: 'SBAggroB';
    }
    .p2 {
        font-size: 1.2rem;
    }
    p{
        margin: 8px;
    }
        @media screen and (max-width: 768px) {
        .introLogoBox {
            width: 140px;
            height: 140px;
        }
        .introContainer {
            display: flex;
            flex-direction: column;
            padding-top: 20vh; // height와 합쳐서 100vh이면 한 화면 모두 차지, 넘으면 스크롤 발생
            height: 76vh;
            width: 100vw;
            background: linear-gradient(to right, black, transparent);
        }
        .introContainer2{
            padding-left: 10vw;
            opacity: 0;
            transition: opacity 0.6s ease-in-out;
        }
        .introContainer2.show{
            opacity: 1;
        }
        .introBody{

        }
        .camoBody {
            font-size: 2rem;
            font-weight: bold;
            color: #f9f9f9;
            margin: 20px 0 20px 0;
        }
        .loginBtn{
            
            width: 80px;
            height: 40px;
            font-size: 1.2rem;
            border-radius: 8px;
            padding: 0;
            cursor: pointer;
        }
        .loginBtn:hover{
            background-color: #2D6247;
            padding: 0;
            color: #ccc
        }
        .p2 {
            font-size: 1rem;
        }
        p{
            margin: 8px;
        }
    }
`;

export const LoginStyle = styled.div`
    position: absolute;
    top: 46%;
    right: -100%;
    transform: translateY(-50%);
    transition: right 0.6s ease-in-out;

    &.show {
        right: 10%;
    }
`;

const Intro = () => {
    const [showText, setShowText] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const introLogoImg = {
        backgroundImage: `url(${introLogo})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const loginBtnClick = () => {
        setShowLogin(true);
      };

    return(
            <IntroStyle>
                <div className="introContainer video">
                    <VideoBackground />
                    <div className={`introContainer2 ${showText ? 'show' : ''}`}>
                        <div className="introHeader">
                            <div className="introLogoBox" style={introLogoImg}></div>
                        </div>
                        <div className="introBody">
                            <div className="camoBody">
                                    <p className="p1">
                                        환영합니다!<br /> 캠핑의 모든 것입니다.
                                    </p>
                                    <p className="p2">
                                        로그인해서 혜택을 누리세요!
                                    </p>
                                </div>
                        </div>
                        <div className="btnDiv">
                            <button className="loginBtn" onClick={loginBtnClick}>로그인</button>
                        </div>
                    </div>
                </div>
                <LoginStyle className={showLogin ? "show" : ""}>
                    {showLogin && <Login />}
                </LoginStyle>
            </IntroStyle>
    );
}

export default Intro;