import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import SmallSideBar from '../smallSidebar';
import AxiosApi from '../../../API/TestAxios';
import Functions from '../../../Functions';
import { useNavigate } from 'react-router-dom';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const LayoutContainer = styled.div`
  display: flex;
`;

// const SidebarContainer = styled.div`
//   flex: 0 0 200px;
//   height: 10vh;
//   background-color: #FFFFFF;
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

const ContentContainer = styled.div`
  width: 70vw;
  margin: auto;
  margin-top: 5vh;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const NoticeList = styled.ul`
  list-style: disc inside;
  padding: 20px;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 16px;
  border: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

function Delete() {
  const token = Functions.getAccessToken();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteMember = async () => {
    try {
      await AxiosApi.userDelete(token);
      setShowModal(true); 
    } catch (error) {

    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/intro'); 
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
          <h4>정말 탈퇴 하시겠습니까?</h4>
          <NoticeList>
            <li>탈퇴신청 시 바로 처리됩니다.</li>
            <li>회원 탈퇴 신청 시, 계정이 영구적으로 삭제됩니다.</li>
          </NoticeList>
          <div>
            <ConfirmButton onClick={handleDeleteMember} type="button">
              확인
            </ConfirmButton>
          </div>
        </ContentContainer>
        </ImageFlexBox>
      </LayoutContainer>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <h3>탈퇴 처리가 완료되었습니다.</h3>
            <button onClick={handleCloseModal}>확인</button>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default Delete;
