import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal, Layout, Input, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import ReviewApi from '../../../API/ReviewAPI';
import Header from '../../../main/header';
import Functions from '../../../Functions';

const { Content } = Layout;
const { Option } = Select;


const StyledButton = styled.div`
  background: #2D6247;
  color:#fff;
  border-radius:4px;
  max-width: 80px;
  text-align: center;
  margin-left: 4rem;
  @media (max-width: 768px) {
    width:20vw;
    margin-left: 4rem;
    text-align: center;
  }
`

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
  .ant-modal-content {

    margin-top: 8rem;
  }
}
`;

const GlobalStyle = createGlobalStyle`
  .ck-editor__editable {
    height: 58vh;
    width: 39.5vw;
  }

 h2{
  text-align: center;
  margin-right: 37.5rem;
 }
  button.ant-btn{
    width: 6vw;
  background-color: #2D6247;
  display: flex;
  margin-top: 1rem;
  margin-left: 67.5rem;
  align-items: center;
  justify-content: center;
  color: #fff;
   &:hover {

      opacity: 0.7;
    }
  }
  @media screen and (max-width:768px) {
    .ck-editor__editable {
      height: 40vh;
      width: 79vw;

    }
    button.ant-btn{
      width: 23vw;
      margin-left: 13.8rem;
  }
  h2{
  text-align: left;
  margin-left: 0.5rem;
  white-space: nowrap;
 }
}
`;

const ReviewContainer = styled.div`
   max-width: 40vw;
  margin: 0 auto;
  border: 2px solid #2D6247;
  border-radius: 6px;

  @media screen and (max-width:768px) {
    max-width: 80vw;

  }
`;

const ModifiedReview = () => {
  const token = Functions.getAccessToken();
  const { id } = useParams();
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await ReviewApi.getReviewById(token, id);
        const reviewData = response.data;
        setData(reviewData.content);
        setTitle(reviewData.title);
        setPostType(reviewData.postType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
  }, [token, id]);

  const handleSubmit = async () => {
    try {
      const content = data;
      const date = new Date().toISOString();
      await ReviewApi.updateReview(token, id, title, content, date, postType);
      setModalVisible(true);
    } catch (error) {
      console.log(error);
      setError('리뷰 수정에 실패하였습니다.');
    }
  };


  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Header />
      <Content style={{  padding: '2rem', position: 'relative', backgroundColor: '#FFFFFF', marginTop: '4rem',display:'flex',justifyContent:'center',flexDirection:'column'}}>
      <h2>수정하기</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        <ReviewContainer>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
          />
          <Select
            style={{ width: '50%', borderRadius:'1px'}}
            value={postType}
            onChange={(value) => setPostType(value)}
            placeholder="카테고리를 선택해주세요."
          >
            <Option value="1">유료캠핑장</Option>
            <Option value="2">오지캠핑장</Option>
          </Select>
          <CKEditor
            editor={ClassicEditor}
            data={data}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'blockQuote',
              ],
              ckfinder: {
                uploadUrl: 'https://example.com/upload',
              },
            }}
            onReady={(editor) => {
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setData(data);
            }}
          />

          <StyledModal visible={modalVisible} onCancel={closeModal} footer={null} title={"수정 완료"}>
            <p>글이 성공적으로 수정되었습니다.</p>
            <StyledButton  onClick={() => nav("/community")}>확인</StyledButton>
          </StyledModal>
        </ReviewContainer>
        <Button onClick={handleSubmit}>수정하기</Button>
      </Content>
    </Layout>
  );
};

export default ModifiedReview;
