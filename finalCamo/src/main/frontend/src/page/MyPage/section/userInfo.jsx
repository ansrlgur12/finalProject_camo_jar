import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import SmallSideBar from '../smallSidebar';
import AxiosApi from '../../../API/TestAxios';
import Functions from '../../../Functions';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const StyledLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  flex: 1;
  height: auto;
  padding: 20px;
  margin: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .img{
    border: .5px solid #ccc;
    border-radius: 50px;
    padding: 1em;
    width: 8vw;
    height: 8vw;
  }
  .title{
    color: rgb(74, 74, 74);
    font-size: 2em;
    margin-bottom: 2em;
  }
  @media screen and (max-width: 768px) {
    .title{
    color: rgb(74, 74, 74);
    font-size: 2em;
    margin-bottom: 1em;
  }
} 
`;

const InformationBox = styled.div`
  display: flex;
  .left{
    margin-right: 3em;
  }
  .right{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .section{
    display: flex;
    flex-direction: row;
  }
  .desc{
    margin-right: 2em;
    font-weight: bold;
    color:  #5e5e5e;;
  }
  .userInfo{
    color: #2d6247;
  }
  @media screen and (max-width: 768px) {
        .img{
          width: 17vw;
          height: 17vw;
          padding: .3em;
        }
        .left{
          margin-right: 1em;
        }
        .userInfo{
          font-size: .5em;
          color: #2d6247;
        }
        .desc{
          font-size: .5em;
          margin-right: 1em;
          font-weight: bold;
          color:  #5e5e5e;;
          width: 20vw;
        }
  }
`;

const UserInfo = () => {
  const token = Functions.getAccessToken();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await AxiosApi.userInfo(token);
      const { data } = response;
      console.log(data);
      setUserInfo(data); // 회원 정보 업데이트
    } catch (error) {
  
    }
  };

  if (!userInfo) {
    return null; 
  }

  const { nickName, userPhoneNm, email, userAddr, userImg } = userInfo;

  return (
    <>
      <Header />
      <StyledLayout>
        <SidebarContainer>
        <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ImageFlexBox>
        <MyPageImageBar type = {"info"} />
        <StyledContent style={{ marginTop: '3vh' }}>
          {/* <Descriptions title="회원 정보">
          <Descriptions.Item label="프로필이미지">
            {userImg && <img className='img' src={userImg} alt="User" style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} />}
          </Descriptions.Item>
            <Descriptions.Item label="닉네임">{nickName}</Descriptions.Item>
            <Descriptions.Item label="전화번호">{userPhoneNm}</Descriptions.Item>
            <Descriptions.Item label="이메일">{email}</Descriptions.Item>
            <Descriptions.Item label="주소">
              {userAddr}
            </Descriptions.Item>
          </Descriptions> */}
          <div className='title'>회원정보</div>
          <InformationBox>
            <div className="left">
              <img src={userImg} alt="" className="img" style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}/>
            </div>
            <div className="right">
              <div className="section"><div className='desc'>닉네임</div><div className='userInfo'>{nickName}</div></div>
              <div className="section"><div className='desc'>전화번호</div><div className='userInfo'>{userPhoneNm}</div></div>
              <div className="section"><div className='desc'>이메일</div><div className='userInfo'>{email}</div></div>
              <div className="section"><div className='desc'>주소</div><div className='userInfo'>{userAddr}</div></div>
            </div>
          </InformationBox>
        </StyledContent>
        </ImageFlexBox>
      </StyledLayout>
    </>
  );
};

export default UserInfo;
