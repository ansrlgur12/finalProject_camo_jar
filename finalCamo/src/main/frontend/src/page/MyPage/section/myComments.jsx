import React, { useState, useEffect } from 'react';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import CommentApi from '../../../API/CommnetAPI';
import { Layout, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SmallSideBar from '../smallSidebar';
import Functions from '../../../Functions';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';

const MyComments = () => {
  const token = Functions.getAccessToken();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        const response = await CommentApi.getCommentsByMember(token);
        const myCommentsData = response.data;
        setComments(myCommentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyComments();
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <SidebarContainer>
        <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ImageFlexBox>
          <MyPageImageBar type = {"active"}/>
        <div style={{ padding: '24px' }}>
          {comments.map((comment) => (
            <Card
              key={comment.id}
              style={{ marginBottom: '50px' }}
              title={
                <Link
                  to={`/reviewDetail/${comment.reviewId}`}
                  style={{ fontWeight: 'bold', color: '#1890ff' }}
                >
                  {comment.content}
                </Link>
              }
            >
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
              />
            </Card>
          ))}
        </div>
        </ImageFlexBox>
      </Layout>
    </>
  );
};

export default MyComments;
