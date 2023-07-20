import React, { useEffect, useState } from 'react';
import { HeartOutlined, EyeFilled } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profile from "../../../images/profile.png";
import camping from "../../../images/camping.png";
import Header from '../../../main/header';
import Sider from 'antd/es/layout/Sider';
import Sidebar from '../sidebar';
import ReviewApi from '../../../API/ReviewAPI';
import SmallSideBar from '../smallSidebar';
import Functions from '../../../Functions';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const { Meta } = Card;
const { Content } = Layout;

const StyledLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  margin-top: 10vh;
  flex: 1;
  padding: 20px;
  margin: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPostsWrapper = styled.div`
  padding: 40px;
  text-align: center;
`;

const PostContent = styled(Card)`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
`;

const MyReview = () => {
  const token = Functions.getAccessToken();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsByMember(token);
  }, []);

  const fetchPostsByMember = async () => {
    try {
      const response = await ReviewApi.getReviewsByMember(token);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderPosts = () => {
    return posts.map((post) => (
      <Col span={10} key={post.id}>
        <PostContent
          cover={
            <Link to={`/reviewDetail/${post.id}`}>
              <img
                alt="대표이미지"
                src={camping}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </Link>
          }
          actions={[<HeartOutlined />, <EyeFilled key="edit" />]}
        >
          <Meta avatar={<Avatar src={profile} />} title={post.title} description={post.author} />
        </PostContent>
      </Col>
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
        <MyPageImageBar type = {"active"} />
        <StyledContent style={{marginTop : '5vh'}}>
          <MyPostsWrapper>
            <Row gutter={[50, 15]}>{renderPosts()}</Row>
          </MyPostsWrapper>
        </StyledContent>
        </ImageFlexBox>
      </StyledLayout>
    </>
  );
};

export default MyReview;
