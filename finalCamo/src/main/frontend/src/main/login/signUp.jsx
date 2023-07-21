import React, { useState } from 'react';
import { styled } from 'styled-components';
import introLogo from "../../images/CAMO로고.png"
import AxiosApi from '../../API/TestAxios';
import Modal from '../../util/modal';
import { useNavigate } from 'react-router-dom';


const SignUpStyle = styled.div`
    box-sizing: border-box;
    .overlap{
        font-family: "GongGothicMedium";
        height: 30px;
        background-color: white;
        border: .5px solid black;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        color: #595959;

    }
    .logo{
        width: 100%;
        height: 100px;
        background-size: contain;
    }
    .signup-page {
        width: 380px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .signForm * {
        box-sizing: border-box;
        margin: 2px;
    }
    .signup-page .form-group {
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
    }
    .signup-page label {
        display: block;
    }
    .textInput {
        width: 100%;
        height: 2rem;
        border: 1px solid #ccc;
        border-radius: 3px;
    }
    .joinSuccess{
        width: 120px;
        height: 40px;
        padding: 10px 15px;
        background-color: #2D6247;
        color: #fff;
        border: none;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap
    }
    .backBtn{
        width: 120px;
        height: 40px;
        padding: 10px 15px;
        background-color: #2D6247;
        color: #fff;
        border: none;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap
    }
    .joinFail{
        width: 120px;
        height: 40px;
        padding: 10px 15px;
        background-color: white;
        border: .5px solid black;
        border-radius: 3px;
        text-align: center;
        cursor: pointer;
        white-space: nowrap
    }
    .joinSuccess:hover {
        background-color: #45a049;
    }
    .agree {
        padding: 0;
        margin: 0;
    }
    .agree label{
        display: flex;
        box-sizing: border-box;
        align-items: center;
    }
    .agree input{
        padding: 0;
        margin: 10px 10px 10px 0;
        width: 20px;
    }
    .chSign{
        display: flex;
        justify-content: space-evenly;
    }
    &.goBackStyle {
        display: none;
    }
    .hint{
        display: flex;
        justify-content: space-between;
    }
    .message{
        font-size: .8rem;
    }
    .checkNick{
        font-size: .8rem;
    }
    .checkEmail{
        font-size: .8rem;
    }
    .success {
        color: royalblue;
    }
    .error {
        color: red;
    }
    @media screen and (max-width: 768px) {
        .signup-page{
            width: 70vw;
        }
    }
`;

const SignUpPage = () => {
    const nav = useNavigate();
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState('');
    const [checkEmail2, setCheckEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [goBackPage, setGoBackPage] = useState(false);


    // 유효성 검사
    const [isId, setIsId] = useState(false);
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);
    const [isMail, setIsMail] = useState(false);
    const [isOverlap, setIsOverlap] = useState(false);
    const [isOverlap2, setIsOverlap2] = useState(false);
    const [isOver, setIsOver] = useState(false)
    const [isOver2, setIsOver2] = useState(false)

    // 오류 메시지
    const [nameMessage, setNameMessage] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");
    const [checkPwdMessage, setCheckPwdMessage] = useState("");
    const [mailMessage, setMailMessage] = useState("");

    // 팝업
    const [modalOpen, setModalOpen] = useState(false);
    const [finishModal, setFinishModal] = useState(false);
    const [modalText, setModelText] = useState("중복된 아이디 입니다.");
    const closeModal = () => {
        setModalOpen(false);
    };

    // 로고 이미지
    const logo = {
        backgroundImage : `url(${introLogo})`,
        backgroundSize : 'contain',
        backgroundRepeat: 'no-repeat',
    };

    // 닉네임(아이디를 입력하지 않아서 닉네임 부분을 isId로 대체)
    const nameChange = (e) => {
        setNickName(e.target.value);
        if (e.target.value.length < 5 || e.target.value.length > 12) {
            setNameMessage("5자리 이상 12자리 미만으로 입력해 주세요.");
            setIsId(false);    
        } else {
            setNameMessage("올바른 형식 입니다.");
            setIsId(true);
        }
    };

    // 닉네임 중복 확인
    const checkNickName = async() => {
        const isOverlap = await AxiosApi.checkNick(nickName);
        console.log(isOverlap)
        if (isOverlap.data === false) {
            console.log(isOverlap)
            setIsOverlap("중복된 닉네임입니다.");
            setIsOver(true);
          } else {
            setIsOverlap("사용 가능한 닉네임입니다.");
            setIsOver(false);
          }
    };

    // 이메일
    const emailChange = (e) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);
        if (!emailRegex.test(emailCurrent)) {
            setMailMessage('이메일을 확인하세요');
            setIsMail(false);
        } else {
            setEmail(e.target.value);
            setMailMessage('이메일 형식에 맞습니다.');
            setIsMail(true);
        }
    }

    // 이메일 인증
    const conEmail = async() => {
        const isOverlap2 = await AxiosApi.emailCheck(email);
        console.log(isOverlap2.data);
        if (isOverlap2.data === false) {
            console.log(isOverlap2)
            setIsOverlap2("이미 가입된 이메일입니다.");
            setIsOver2(true);
          } else {
            setIsOverlap2("사용 가능한 이메일입니다.");
            setIsOver2(false);
            setCheckEmail(isOverlap2.data.toString());
          }
    };
    
    // 이메일 인증코드 담기
    const emailCheck = (e) => {
        setCheckEmail2(e.target.value.toString()); // 입력한 인증번호를 문자열로 변환하여 저장
    }


    // 비밀번호
    const passwordChange = (e) => {
        //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value ;
        setPassword(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwdMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwdMessage('안전한 비밀번호에요 : )')
            setIsPw(true);
        }  
        console.log("Password : " + e);
    };

    // 비밀번호 검사
    const checkPasswordChange = (e) => {
        const passwordCurrent = e.target.value ;
        setCheckPassword(passwordCurrent)
        if (passwordCurrent !== password) {
            setCheckPwdMessage('비밀 번호가 일치하지 않습니다.')
            setIsConPw(false)
        } else {
            setCheckPassword(e.target.value);
            setCheckPwdMessage('비밀 번호가 일치 합니다.')
            setIsConPw(true);
        }  
        console.log("checkPwd : " + e);
    };

    // 약관 동의
    const agreementChange = (e) => {
        setAgreed(e.target.checked);
        console.log("agree : " + e);
    };

    const onClickLogin = async() => {
        console.log(checkEmail, checkEmail2);
        if(checkEmail === checkEmail2){
            if(agreed){
                const memberReg = await AxiosApi.memberReg(nickName, email, password, agreed);
                console.log('Response:', memberReg.data);
                if(memberReg.data.email && memberReg.data.nickName) { 
                    console.log("Inside condition: member is registered");
                    setFinishModal(true);
                } else { 
                    console.log("Inside condition: member is not registered");
                    setModalOpen(true);
                    setModelText('인증번호 or 이메일을 확인하세요.');
                }
            } else {
                setModalOpen(true);
                setModelText("이용 약관에 동의해야 합니다.");
                return;
            }
        } else {
            setModalOpen(true);
            setModelText("이메일 인증 번호가 맞지 않습니다.");
            return;
        }
    };
    
    

    const goBack = () => {
        setGoBackPage(true);
    };

    return (
        <SignUpStyle className={goBackPage ? 'goBackStyle' : ''}>
            <div className="signup-page">
                <div className="logo" style={logo}></div>
                <div className="signForm">
                    <div className="form-group">
                        <label htmlFor="name">닉네임:</label>
                        
                        <button className='overlap' onClick={checkNickName}>중복확인</button>
                    </div>
                    <input
                        type="text"
                        value={nickName}
                        onChange={nameChange}
                        required
                        className='textInput'
                        placeholder=' 5자리 이상 12자리 미만으로 입력해 주세요.'
                    />
                    <div className="hint">
                        {nickName.length > 0 && <span className={`message ${isId ? 'success' : 'error'}`}>{nameMessage}</span>}
                        <div className='checkNick'>
                            <span className={`checkNick ${isOver ? 'error' : 'success'}`}>{isOverlap}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일:</label>
                        <button className='confirm' onClick={conEmail}>이메일 인증</button>
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={emailChange}
                        required
                        className='textInput email1'
                        placeholder=' example@example.com'
                    />
                    <div className="hint">
                        {email.length > 0 && <span className={`message ${isMail ? 'success' : 'error'}`}>{mailMessage}</span>}
                        <div className='checkEmail'>
                            <span className={`checkEmail ${isOver2 ? 'error' : 'success'}`}>{isOverlap2}</span>
                        </div>
                    </div>
                    {/* 이메일 인증 */}
                    <input
                        type="text"
                        required
                        className='textInput email2'
                        placeholder=' 이메일 인증 번호를 입력하세요.'
                        onChange={emailCheck}
                    />
                    
                    <div className="form-group">
                        <label htmlFor="password">비밀번호:</label>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        required
                        className='textInput'
                        placeholder=' 숫자+영문자 조합으로 8자리 이상 입력해주세요.'
                    />
                    <div className="hint">
                        {password.length > 0 && <span className={`message ${isPw ? 'success' : 'error'}`}>{pwdMessage}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="checkPassword">비밀번호 확인:</label>
                    </div>
                    <input
                        type="Password"
                        value={checkPassword}
                        onChange={checkPasswordChange}
                        required
                        className='textInput'
                        placeholder=' 동일한 비밀번호를 입력해 주세요.'
                    />
                    <div className="hint">
                        {checkPassword.length > 0 && <span className={`message ${isConPw ? 'success' : 'error'}`}>{checkPwdMessage}</span>}
                    </div>
                    <div className="agree">
                        <label>
                            <input
                            type="checkbox"
                            checked={agreed}
                            onChange={agreementChange}
                            required
                            />
                            <div>이용 약관에 동의합니다.</div>
                        </label>
                    </div>
                    <div className="chSign">
                        {(isId && isPw && isConPw && agreed && isMail) ?
                        <div className="joinUs joinSuccess" onClick={onClickLogin}>가입하기</div> :
                        <div className="joinFail" onClick={onClickLogin}>가입하기</div>}
                        <div className="backBtn" onClick={goBack}>돌아가기</div>
                    </div>
                    <Modal open={modalOpen} confirm={closeModal} justConfirm={true} header="오류">{modalText}</Modal>
                    <Modal open={finishModal} confirm={()=>nav("/")} justConfirm={true} header="성공">회원가입에 성공했습니다!</Modal>
                </div>
            </div>
        </SignUpStyle>
    );
};

export default SignUpPage;
