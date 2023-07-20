import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal, Layout, Input, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import ReviewApi from '../../../API/ReviewAPI';
import Header from '../../../main/header';
import Functions from '../../../Functions';

const { Content } = Layout;
const { Option } = Select;

const GlobalStyle = createGlobalStyle`
  .ck-editor__editable {
    height: 600px;
  }
`;

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #DDDDDD;
`;

const ModifiedReview = () => {
  const token = Functions.getAccessToken();
  const { id } = useParams();
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
      <Content style={{ padding: '120px', position: 'relative', backgroundColor: '#FFFFFF' }}>
        <ReviewContainer>
          <h2>수정하기</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
          />
          <Select
            style={{ width: '50%' }}
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
          <Button onClick={handleSubmit}>수정하기</Button>
          <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
            <h3>수정 완료</h3>
            <p>글이 성공적으로 수정되었습니다.</p>
            <Link to="/community">확인</Link>
          </Modal>
        </ReviewContainer>
      </Content>
    </Layout>
  );
};

export default ModifiedReview;
