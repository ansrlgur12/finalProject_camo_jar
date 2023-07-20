import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, Checkbox } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import { UserContext } from '../../../API/UserInfo';
import AxiosApi from '../../../API/TestAxios';
import Modal from '../../../util/modal';
import SmallSideBar from '../smallSidebar';
import Functions from '../../../Functions';
import { storage } from '../../../firebase/firebaseConfig';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
width: 70vw;
margin: auto;
  margin-top: 5vh;
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
  @media screen and (max-width: 768px) {
    width: 50vw;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  width: 300px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    width: 50vw;
  }
`;

const StyledUserEdit = styled(Form)`
  width: 600px;

  .hint {
    font-size: 0.6rem;
    margin: 0;
  }
  .success {
    color: royalblue;
    margin: 0;
  }
  .error {
    color: red;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 50vw;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  margin: auto;
`;

const normFile = (e) => {
  if (Array.isArray(e)) {
    // e가 배열인 경우 e를 그대로 반환
    return e;
  }
  return e?.fileList; // 배열이 아니면 fileList를 반환
};

const UserEdit = () => {
  const token = Functions.getAccessToken();

  // 전송 데이터
  const [userAddr, setAddr] = useState('');
  const [userPhoneNm, setUserPhoneNm] = useState('');
  const [userImg, setUserImg] = useState('');

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [modalText, setModalText] = useState('중복된 아이디 입니다.');

  const closeModal = () => {
    setFinishModal(false);
    setModalOpen(false);
  };

  const changeAddr = (e) => {
    setAddr(e.target.value);
  };

  const changePhone = (e) => {
    setUserPhoneNm(e.target.value);
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      setUserImg(downloadUrl);
    } catch (error) {
      console.log(error);
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  };

  const subUserInfo = async () => {
    const infoUpdate = await AxiosApi.userUpdate(token, userAddr, userPhoneNm, userImg);
    if (!infoUpdate.data === true) {
      setModalText('입력 사항을 다시 확인해 주세요.');
      setModalOpen(true);
    } else {
      setFinishModal(true);
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
          <MyPageImageBar type = {"info"}/>
        <ContentContainer>
          <StyledCheckbox>나의 정보 수정하기</StyledCheckbox>

          <StyledUserEdit>
            <Form.Item label="User ID" name="userId">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Address" name="userAddr">
              <Input onChange={changeAddr} />
            </Form.Item>
            <Form.Item label="Phone Number" name="userTel">
              <Input onChange={changePhone} />
            </Form.Item>
            <Form.Item
              label="Profile Image"
              name="userImage"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                beforeUpload={async (file) => {
                  await uploadImage(file);
                  return false;
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>사진 올리기</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item>
              <StyledButton type="primary" onClick={subUserInfo}>
                회원 정보 변경
              </StyledButton>
            </Form.Item>
          </StyledUserEdit>
        </ContentContainer>
        </ImageFlexBox>
      </LayoutContainer>
      <Modal open={modalOpen} confirm={closeModal} justConfirm={true} header="오류">
        {modalText}
      </Modal>
      <Modal open={finishModal} confirm={closeModal} justConfirm={true} header="성공">
        회원 정보가 변경 되었습니다.
      </Modal>
    </>
  );
};

export default UserEdit;
