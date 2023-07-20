import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import Modal from '../../../util/modal';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../../API/TestAxios';
import SmallSideBar from '../smallSidebar';
import Functions from '../../../Functions';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
width: 50vw;
margin-left: auto;
margin-right: auto;
  margin-top: 5vh;
  height: 150px;
  flex: 1;
  padding: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    width: 70vw;
    padding: 30px;
    padding-top: 50px;
  }
`;

const StyledForm = styled.div`
  width: 800px;
  @media screen and (max-width: 768px) {
    width: 40vw;
  }
  
`;

const StyledFormItem = styled.div`
  margin-bottom: 50px;
  width: 40vw;
  margin-left: auto;
  margin-right: auto;
  .message {
    font-size: 0.8rem;
  }
  .checkNick {
    font-size: 0.8rem;
  }
  .success {
    color: royalblue;
  }
  .error {
    color: red;
  }
  @media screen and (max-width: 768px) {
    font-size: .8em;
    width: 100%;
    .message {
    font-size: 0.7rem;
  }
  .checkNick {
    font-size: 0.7rem;
  }
    
  }
  
`;

const NewPassword = () => {
  const token = Functions.getAccessToken();
  const navigate = useNavigate();

  const [newPwd, setNewPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');

  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);
  const [pwdMessage, setPwdMessage] = useState('');
  const [checkPwdMessage, setCheckPwdMessage] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [modalText, setModalText] = useState('');


  const closeModal = () => {
    if (finishModal) {
      navigate('/intro');
    }
    setFinishModal(false);
    setModalOpen(false);
  };

  const passwordChange = (e) => {
    const passwordCurrent = e.target.value;
    setNewPwd(passwordCurrent);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,25}$/;
    const hasNumber = /\d/;
    const isPwValid = passwordRegex.test(passwordCurrent) && hasNumber.test(passwordCurrent);
    setIsPw(isPwValid);
    setPwdMessage(isPwValid ? '안전한 비밀번호에요 : )' : '숫자+영문자 조합으로 8자리 이상 입력해주세요!');
  };

  const checkPasswordChange = (e) => {
    const passwordCurrent = e.target.value;
    setCheckPwd(passwordCurrent);
    if (passwordCurrent !== newPwd) {
      setCheckPwdMessage('비밀 번호가 일치하지 않습니다.');
      setIsConPw(false);
    } else {
      setCheckPwdMessage('비밀 번호가 일치 합니다.');
      setIsConPw(true);
    }
  };

  const changeConfirm = async () => {
    console.log('New Password:', newPwd);

    try {
      const newPasswordResponse = await AxiosApi.updateUserPwd(token, newPwd);
      if (newPasswordResponse.status === 200) {
        setFinishModal(true);
      } else {
        setModalOpen(true);
        setModalText("비밀 번호 변경에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      setModalText("비밀 번호 변경에 실패했습니다.");
    }
  };

  return (
    <>
      <Header />
      <LayoutContainer>
        <SidebarContainer>
        <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ImageFlexBox>
            <MyPageImageBar type = {"info"} />
        <ContentContainer>
          <StyledForm>
            <StyledFormItem>
              <label>New Password</label>
              <Input.Password
                placeholder="새로운 비밀번호를 입력하세요"
                onChange={passwordChange}
              />
              {newPwd.length > 0 && (
                <span className={`message ${isPw ? 'success' : 'error'}`}>
                  {pwdMessage}
                </span>
              )}
            </StyledFormItem>
            <StyledFormItem>
              <label>Confirm Password</label>
              <Input.Password
                placeholder="다시한번 입력해주세요."
                onChange={checkPasswordChange}
              />
              {checkPwd.length > 0 && (
                <span className={`message ${isConPw ? 'success' : 'error'}`}>
                  {checkPwdMessage}
                </span>
              )}
            </StyledFormItem>
            <StyledFormItem>
              {isPw && isConPw ? (
                <Button type="primary" onClick={changeConfirm}>
                  비밀번호 변경
                </Button>
              ) : (
                <Button type="primary" disabled>
                  비밀번호 변경
                </Button>
              )}
            </StyledFormItem>
          </StyledForm>
        </ContentContainer>
        </ImageFlexBox>
      </LayoutContainer>
      <Modal open={modalOpen} confirm={closeModal} justConfirm={true} header="오류">
        {modalText}
      </Modal>
      <Modal open={finishModal} confirm={closeModal} justConfirm={true} header="성공">
        비밀 번호가 변경 되었습니다.
      </Modal>
    </>
  );
};

export default NewPassword;
