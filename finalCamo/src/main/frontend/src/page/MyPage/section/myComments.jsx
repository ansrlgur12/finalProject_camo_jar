import React, { useState, useEffect } from 'react';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import CommentApi from '../../../API/CommnetAPI';
import { Layout, Card, Avatar, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import SmallSideBar from '../smallSidebar';
import Functions from '../../../Functions';
import MyPageImageBar from './myPageImage';
import { ImageFlexBox } from './cart';
import { SidebarContainer } from './cart';
import AxiosApi from '../../../API/TestAxios';

const MyComments = () => {
  const token = Functions.getAccessToken();
  const [comments, setComments] = useState([]);
  const [nickName, setNickName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.userInfoMe(token);
        setUserImg(response.data.userImg);
        setNickName(response.data.nickName);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [token]);

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        const response = await CommentApi.getCommentsByMember(token);
        const data = response.data;

        const userComments = data.filter(comment => comment.nickName === nickName);

        setComments(userComments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyComments();
  }, [nickName]);


  const updateNickName = async (values) => {
    try {
      await AxiosApi.updateUserInfo({ nickName: values.nickName }, token);
      setNickName(values.nickName);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Layout>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ImageFlexBox>
          <MyPageImageBar type={"active"} />
          <div style={{ padding: '50px' }}>
            <Form form={form} onFinish={updateNickName}>

            </Form>
            {comments.map((comment) => (
              <Card
                key={comment.id}
                style={{ marginBottom: '20px' }}
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
                  avatar={<Avatar src={userImg} />}
                  title={nickName}
                  description={`작성날짜: ${new Date(comment.createdAt).toLocaleDateString()}`}
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
