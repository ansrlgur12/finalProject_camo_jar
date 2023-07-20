import React, { useEffect, useState, useContext } from 'react';
import { HeartOutlined, EyeFilled } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import profile from "../../../images/profile.png";
import camping from "../../../images/camping.png";
import Header from '../../../main/header';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../sidebar';
import axios from 'axios';
import AxiosApi from '../../../API/TestAxios';
import { UserContext } from '../../../API/UserInfo';
import { MarkerContext } from '../../../context/MarkerInfo';
import SmallSideBar from '../smallSidebar';
import { Margin } from '@mui/icons-material';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';
import Functions from '../../../Functions';
import noImage from '../../../images/CAMOLOGO.png'

const { Meta } = Card;

const StyledLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  flex: 1;
  height: auto;
  padding: 1em;
  margin: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 1.5rem;
  }
  
  .mobileDisplay{
    display: none;
  }
  
  @media screen and (max-width: 768px) {
      .title{
        font-size: 1em;
      }
      .mobileDisplay{
        display: block;
      }
      .webDisplay{
        display: none;
      }
    }

`;

const MyPostsWrapper = styled.div`
  padding: 40px;
  text-align: center;
  height: auto;
  @media screen and (max-width: 768px) {
      margin-left: 1em;
      padding: 0;
    }
`;

const PostContent = styled(Card)`
  width: 18vw;
  margin: 2vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media screen and (max-width: 768px) {
      width: 31vw;
      height: 35vw;
      font-size: .5em;
    }
`;


const MyCamp = () => {
  const token = Functions.getAccessToken();
  const [posts, setPosts] = useState([]);
  const context = useContext(MarkerContext);
  const {setOverlayOpen, setLocation, setZoomLev, setMarkerLat, setMarkerLng} = context;
  const nav = useNavigate();

  useEffect(() => {
    fetchPostsByMember();
  }, []);

  const fetchPostsByMember = async () => {
    try {
      const response = await AxiosApi.memberLikedCamp(token);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const onClickImage = (x, y) => {
    nav("/mapMain");
    setZoomLev(1);
    setMarkerLat(y);
    setMarkerLng(x);
    setLocation([x, y])
    setOverlayOpen(true);
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <>
      <div className="webDisplay">
      <Col span={6} key={post.id}>
        <PostContent
          cover={
              <img
                onClick={()=>onClickImage(post.mapX, post.mapY)}
                alt="대표이미지"
                src={`${post.firstImageUrl ? post.firstImageUrl : noImage}`}
                style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
              />
          }
        >
          <Meta  title={post.facltNm}/>
        </PostContent>
      </Col>
      </div>
      <div className="mobileDisplay">
      <Col span={10} key={post.id}>
      <PostContent
        cover={
            <img
              onClick={()=>onClickImage(post.mapX, post.mapY)}
              alt="대표이미지"
              src={`${post.firstImageUrl ? post.firstImageUrl : noImage}`}
              style={{ width: '100%', height: '20vw', objectFit: 'cover' }}
            />
        }
      >
        <Meta title={post.facltNm}/>
      </PostContent>
    </Col>
    </div>
    </>
    ));
  };

  return (
    <>
      <Header />
      <StyledLayout>
        <SidebarContainer>
        <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ImageFlexBox>
          <MyPageImageBar type = {"camp"}/>
        <StyledContent style={{marginTop : '5vh', height : 'auto'}}>
          <div className="title">좋아요 누른 캠핑장</div>
          <MyPostsWrapper>
            <Row gutter={[5, 15]}>{renderPosts()}</Row>
          </MyPostsWrapper>
        </StyledContent>
        </ImageFlexBox>
      </StyledLayout>
    </>
  );
};

export default MyCamp;
