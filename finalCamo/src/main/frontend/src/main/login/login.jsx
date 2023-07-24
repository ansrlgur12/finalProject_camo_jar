import React, { useContext, useState } from "react";
import { styled } from 'styled-components';
import introLogo from "../../images/CAMO로고.png"
import kakaologo from "../../images/kakaoLogo.png"
import naverlogo from "../../images/naverLogo.png"
import googlelogo from "../../images/googleLogo.png"
import KakaoLogin from "../../API/KaKaoLogin";
import SignUpPage from "./signUp";
import AxiosApi from "../../API/TestAxios";
import { useNavigate } from "react-router-dom";
import Modal from "../../util/modal";
import { UserContext } from "../../API/UserInfo";
import { Link } from 'react-router-dom';

const LoginStyle = styled.div`
    box-sizing: border-box;
    position: relative; // 추가

    .loginLogo{
        width: 100%;
        height: 120px;
        background-size: contain;
    }
    .container {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .loginInput {
        width: 90%;
        padding: 10px;
        margin: 10px auto;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    .loginButton {
        width: 94%;
        height: 2.2rem;
        padding: 0px;
        margin: 4px;
        background-color: #4caf50;
        color: #f2f2f2;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .loginButton:hover {
        background-color: #45a049;
        color: #f2f2f2;
    }
    .notLoginButton{
        cursor: pointer;
        width: 94%;
        height: 2.2rem;
        padding: 0px;
        margin: 4px;
        background-color: white;
        border: none;
        border-radius: 5px;
        color: red;
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .other {
        margin: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }
    .other1{
        cursor: pointer;
    }
    .other2{
        cursor: pointer;
    }
    .snsLogin{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .kakao {
        margin: 10px;
        width: 100px;
        height: 46px;
        background-size: cover;
        background-position: center;
        object-fit: contain;
        border-radius: 8px;

    }
    .google {
        margin: 10px;
        width: 100px;
        height: 46px;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
        object-fit: contain;

    }
    .naver {
        margin: 10px;
        width: 100px;
        height: 46px;
        border-radius: 8px;
        background-size: cover;
        background-position: center;
        object-fit: contain;
    }
    .snslog{
        opacity: 0;
    }
    @media screen and (max-width: 768px) {
        .container {
           width: 70vw;
        }
        .loginInput {
        width: 65vw;
        padding: 10px;
        margin: 10px auto;
        border-radius: 5px;
        border: 1px solid #ccc;
        }
        .loginButton {
            width: 69vw;
            height: 2.2rem;
            padding: 0px;
            margin: 4px;
            background-color: #4caf50;
            color: #f2f2f2;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .loginButton:hover {
            background-color: #45a049;
            color: #f2f2f2;
        }
        .notLoginButton{
            cursor: pointer;
            width: 69vw;
            height: 2.2rem;
            padding: 0px;
            margin: 4px;
            background-color: white;
            border: none;
            border-radius: 5px;
            color: red;
            align-items: center;
            display: flex;
            justify-content: center;
        }
        .kakao {
        margin: 10px;
        width: 46px;
        height: 46px;
        background-size: cover;
        background-position: left;
        object-fit: contain;
        border-radius: 8px;
        cursor: pointer;
    }
    .google {
        margin: 10px;
        width: 46px;
        height: 46px;
        border-radius: 8px;
        background-size: cover;
        background-position: left;
        object-fit: contain;
        cursor: pointer;
    }
    .naver {
        margin: 10px;
        width: 46px;
        height: 46px;
        border-radius: 8px;
        background-size: cover;
        background-position: 15% 50%;
        object-fit: contain;
        cursor: pointer;
    }
    }
`;

const SignUpStyle = styled.div`
    position: absolute;
    top: 46%;
    right: -100%;
    transform: translateY(-50%);
    /* transition: right 0.6s ease-in-out; */

    &.showSign {
        right: 0%;
    }

    &.cutSign{
        right: -100%;
    }
`;
// const SignUpStyle = styled.div`
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;

//     &.showSign {
//         display: inline-block;
//     }

//     &.cutSign{
//         display: none;
//     }
// `;

const Login = () => {
    const [showSign, setShowSign] = useState(false);
    const nav = useNavigate();
    const logo = {
        backgroundImage : `url(${introLogo})`,
        backgroundSize : 'contain',
        backgroundRepeat: 'no-repeat',
    };
    const kakaoLogo = {
        backgroundImage: `url(${kakaologo})`,
        backgroundRepeat: 'no-repeat'
    };
    const googleLogo = {
        backgroundImage: `url(${googlelogo})`,
        backgroundRepeat: 'no-rereat'
    };
    const naverLogo = {
        backgroundImage: `url(${naverlogo})`,
        backgroundRepeat: 'no-rereat'
    };

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        onClickLogin();
      }
    };

    // Context API에 값을 저장
    const context = useContext(UserContext);
    const {setIsLogin,setEmail,setUserImg,userImg} = context;

    // 아이디, 패스워드 입력
    const[email, setEmail2] = useState("");
    const[password, setPassword] = useState("");

    // 오류메세지
    const[idMessage, setIdMessage] = useState("");
    const[pwMessage, setPwMessage] = useState("");

    // 유효성검사
    const[isEmail, setIsEmail] = useState(false);
    const[isPw, setIsPw] = useState(false);

    // 팝업처리(모달)
    const[modalOpen, setModalOpen] = useState(false);
    const[loginFinishOpen, setLoginFinishOpen] = useState(false);


    const closeModal = () => {
        setModalOpen(false);
    }

    const signBtnClick = () => {
        setShowSign(true);
    };

    const onClickLogin = async() => {
        try {
            // 로그인을 위해 Axios 호출
            const response = await AxiosApi.memberLogin(email, password);
            if(response.data) {
                console.log("로그인");
                setLoginFinishOpen(true);
                setIsLogin(true);
                setEmail(email);

                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('email', email);
            }
            else {
                console.log("로그인 에러");
                setModalOpen(true);
            }
        } catch(error){
            setModalOpen(true);
        }
    };

    const onChangeEmail = (e) => {
        // 5 ~ 20자리의 영문자, 숫자, 언더스코어로 이루어진 문자열 체크
        const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const emailCurrent = e.target.value;
        setEmail2(emailCurrent);
        if(!regexEmail.test(emailCurrent)){
            setIdMessage("5자리 이상 20자리 미만으로 입력해주세요");
            setIsEmail(false);
        } else {
            setIdMessage("올바른 형식 입니다.");
            setIsEmail(true);
        }
    };

    const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value;
        setPassword(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setIsPw(false)
        } else {
            setIsPw(true);
        }
    };



    return(
        <LoginStyle>
                <div class="container">
                    <div className="loginLogo" style={logo}></div>
                    <div>
                        <input onChange={onChangeEmail} placeholder="이메일 로그인" className="loginInput"/>
                    </div>
                    <div>
                        <input type="password" onChange={onChangePw} placeholder="비밀번호" className="loginInput" onKeyPress={onKeyPress}/>
                    </div>
                    <div>
                        {(isEmail && isPw) ?
                        <div className="loginButton" onClick={onClickLogin}>로그인</div> :
                        <div className="notLoginButton">로그인</div> }
                    </div>
                    <Modal open={modalOpen} confirm={closeModal} justConfirm = {true} header = {"오류"}>계정을 다시 확인해 주세요.</Modal>
                    <Modal open={loginFinishOpen} confirm={()=>nav("/")} justConfirm = {true} header={"환영합니다."}>로그인에 성공했습니다.</Modal>
                    <div className="other">
                    <Link to="/findAccount" className="other1">계정찾기</Link>
                        <div className="other2" onClick={signBtnClick}>회원가입</div>
                    </div>
                    <div className="snsLogin">
                        <div className="snslog kakao" style={kakaoLogo}></div>
                        <div className="snslog naver" style={naverLogo}></div>
                        <div className="snslog google" style={googleLogo}></div>
                    </div>
                </div>
                <SignUpStyle className={showSign ? "showSign" : "cutSign"}>
                    {showSign && <SignUpPage />}
                </SignUpStyle>
        </LoginStyle>
    );
}

export default Login;