import React from 'react';
import { Layout, Card, Space, Row, Col } from 'antd';
import styled from 'styled-components';
import Sidebar from './sidebar';
import Header from '../../main/header';
import SmallSideBar from './smallSidebar';

const { Content } = Layout;

const StyledContent = styled(Content)`
  margin-top: 9.5vh;
  padding: 24px;
  background-color: #FFFFFF;
  margin-top: 14vh;
`;

const CardWrapper = styled(Card)`
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const MoreLink = styled.a`
  color: #1890ff;
`;

//마이페이지 디폴트 카드형 화면 
const MyPageDefaultView = () => ( 
  <Row gutter={16}> 
    {Array(6).fill(0).map((_, i) => (
      <Col span={8} key={i}> 
        <CardWrapper>
          <Title>각각의 정보 {i+1}</Title>
          <p>내용</p>
          <MoreLink href="#">더보기</MoreLink>
        </CardWrapper>
      </Col>
    ))}
  </Row>
);

const MyPage = () => {
  return (
    <>
      <Header /> 
      <Layout>
        <Sidebar />
        <SmallSideBar />
        <StyledContent>
          <MyPageDefaultView />
        </StyledContent>
      </Layout>
    </>
  );
};

export default MyPage;
