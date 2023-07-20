import React, { useState, useEffect } from 'react';
import { HeartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Modal } from 'antd';
import styled from 'styled-components';
import camping from '../../../images/camping.png';
import ReviewApi from '../../../API/ReviewAPI';
import CommentForm from './commentForm';
import CommentList from './commentList';
import { useParams, Link } from 'react-router-dom';
import Header from '../../../main/header';
import LikesApi from '../../../API/LikesAPI';
import Functions from '../../../Functions';

const { Content } = Layout;

const ResponsiveContent = styled(Layout)`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

`
const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2.6rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #DDDDDD;
  @media (max-width: 768px) {
    width: 85vw;
    
  }
`;

const ReviewTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1.3rem;
`;

const ReviewContent = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
`;

const ReviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 1.3rem;
  @media (max-width: 768px) {
    width:60vw;
  }
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.3rem;
  @media (max-width: 768px) {
    width: 30vw;
    white-space: nowrap;
  }
`;

const ReviewDate = styled.p`
  font-size: 0.875rem;
  color: #888;
  @media (max-width: 768px) {
    font-size: 0.4rem;
  }
`;

const ReviewActions = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: ${({ liked }) => (liked ? '#f5222d' : '#888')};
  margin-left: 0.625rem;
  @media (max-width: 768px) {
    font-size: 0.6rem;
    margin-left: 0.1rem;
  }
`;

const ReviewDetail = () => {
  const token = Functions.getAccessToken();
  const [review, setReview] = useState(null);
  const [liked, setLiked] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await ReviewApi.getReviewById(token, id);
        const reviewData = response.data;
        setReview(reviewData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchReview();
  }, [token, id]);

  const handleLikeReview = async () => {
    try {
      if (!liked) {
        await LikesApi.likeReview(token, id);
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await ReviewApi.deleteReview(token, id);
      setShowDeleteModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Header />
      <ResponsiveContent>
      <Content style={{ padding: '7.5rem', position: 'relative', backgroundColor: '#FFFFFF' }}>
        {review ? (
          <ReviewContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewContent>{review.content}</ReviewContent>
            <ReviewImage src={review.img} alt="Review Image" />
            <ReviewMeta>
              <ReviewDate>작성일: {review.date}</ReviewDate>
              <ReviewActions>
                <ReviewButton onClick={handleLikeReview} liked={liked}>
                  <HeartOutlined />
                  좋아요
                </ReviewButton>
                <Link to={`/modifiedReview/${id}`}>
                  <ReviewButton>
                    <EditOutlined />
                    수정하기
                  </ReviewButton>
                </Link>
                <ReviewButton onClick={handleDeleteReview}>
                  <DeleteOutlined />
                  삭제하기
                </ReviewButton>
              </ReviewActions>
            </ReviewMeta>
            <CommentList reviewId={review?.id} />

            <Modal
              title="리뷰 삭제"
              visible={showDeleteModal}
              onOk={handleConfirmDelete}
              onCancel={handleCancelDelete}
              footer={null}
            >
              <h3>삭제 완료</h3>
              <p>글이 성공적으로 삭제되었습니다.</p>
              <Link to="/community">확인</Link>
            </Modal>
          </ReviewContainer>
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </Content>
        </ResponsiveContent>
    </>
  );
};

export default ReviewDetail;
