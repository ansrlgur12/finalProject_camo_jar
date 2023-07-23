import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../API/UserInfo';
import { HeartOutlined, EyeFilled, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Layout, Pagination, message } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 사고팔기header from '../../../images/사고팔기header.jpg';
import ReviewApi from '../../../API/ReviewAPI';
import LikesApi from '../../../API/LikesAPI';
import { SelectButton } from '../community';
import Header from '../../../main/header';
import Functions from '../../../Functions';

const { Meta } = Card;
const { Content } = Layout;

const ResponsiveMeta = styled(Meta)`
  
  
  @media (max-width: 768px) {
    text-align: center;
    font-size:0.1rem;
  }
`
const ResponsiveContent = styled(Content)`
  padding: 7.5rem;
  position: relative;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    padding: 0;
    padding-top: 10rem;
  }
`;
const ResponsiveImage = styled.img`
  width: 100%;
  height: 23vh;
  object-fit: cover;
 

  @media (max-width: 768px) {
    height: 10vh;
  }
`;

const ReviewContent = styled(Card)`
  width: 300px;
  margin: 0 auto;
  margin-bottom: 40px;
  border: 1px solid #DDDDDD;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  // 기본 상태에서의 그림자 효과
  transition: box-shadow 0.3s ease, transform 0.3s ease;  // 그림자와 변환 효과에 대한 전환 효과 적용

  &:hover {
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);  // 마우스 호버 상태에서의 그림자 효과
    transform: translateY(-10px);  // 마우스 호버 상태에서 카드를 약간 위로 이동
  }

  @media screen and (max-width:768px) {
    width:42vw;
    height: 31vh;
  }
`;


const WriteButton = styled(Link)`
  position: absolute;
  top: 50px;
  right: 190px;
  display: flex;
  align-items: center;
  background-color: #2E2E2E;
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  text-decoration: none;
  @media screen and (max-width:768px) {
    top: 7rem;
  right: 1rem;
    font-size: 0.625rem;
    width:20vw;
    white-space: nowrap;
    padding: 0.4rem 0.6rem;

  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  white-space: nowrap;
`;

const ReviewCards = () => {
  const token = Functions.getAccessToken();
  const [reviews, setReviews] = useState([]);
  const [likesCount, setLikesCount] = useState({});
  const { nickName, userImg } = useContext(UserContext);

  const heart = () => {
    message.success('좋아요 갯수가 현재 리뷰에 몇개가 있는지 알수있는 아이콘입니다.');
  };

  const view = () => {
    message.success('현재 리뷰의 조회수를 확인 할 수있습니다.');
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewApi.getAllReviews(token);
        const reviewData = response.data;
        setReviews(reviewData);
        console.log(reviewData);

        let likesCountData = {};
        for (let review of reviewData) {
          const likesResponse = await LikesApi.countReviewLikes(review.id, token);
          likesCountData[review.id] = likesResponse.data;
        }
        setLikesCount(likesCountData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [token]);



  const renderReviewCards = () => {
    return reviews.map((review, index) => {
      if (review.postType !== 1) {
        return null; // postType이 1이 아닌 경우, 리뷰 카드를 렌더링하지 않음
      }

      return (
        <Col xs={12} md={6}  key={index}>
          <ReviewContent
            cover={
              <Link to={`/reviewDetail/${review.id}`}>
                <ResponsiveImage
                  src={review.img}
                  alt="대표이미지"

                />
              </Link>
            }
            actions={[
              <span onClick={heart}><HeartOutlined /> {likesCount[review.id] || 0}</span>,
              <span onClick={view}><EyeFilled /> {review.viewCount || 0}</span>,
            ]}
          >
            <ResponsiveMeta
              avatar={<Avatar src={review.userImg} />}
              title={review.title}
              description={`작성자: ${review.nickName}`}
            />

          </ReviewContent>
        </Col>
      );
    });
  };

  return (
    <>
    <Header />
    <img
                  src={사고팔기header}
                  alt="대표이미지"
                  style={{ width: '100%', height: '32vh', objectFit: 'cover',paddingTop:'5rem'}}
                />
    <SelectButton />
    <Layout>
      < ResponsiveContent >
        <WriteButton to="/writeReviewPage" style={{backgroundColor: '#2D6247', color: 'white', borderColor: 'white'}}>작성하기<EditOutlined style={{ marginLeft: '2px'}} /></WriteButton>
        <Row gutter={[10, 15]}>
          {reviews.length > 0 ? renderReviewCards() : <p>리뷰가 없습니다.</p>}
        </Row>
        <PaginationWrapper>
          <Pagination defaultCurrent={1} total={15} />
        </PaginationWrapper>
      </ ResponsiveContent>
    </Layout>
    </>
  );
};

export default ReviewCards;