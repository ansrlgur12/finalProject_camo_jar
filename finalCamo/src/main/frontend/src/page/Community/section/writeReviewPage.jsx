import React, { useState, useEffect} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Modal, Layout, Input, Select } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import ReviewApi from '../../../API/ReviewAPI';
import Header from '../../../main/header';
import { Link } from 'react-router-dom';
import { storage } from '../../../firebase/firebaseConfig';
import Functions from '../../../Functions';
import AxiosApi from '../../../API/TestAxios';

const { Content } = Layout;
const { Option } = Select;

const GlobalStyle = createGlobalStyle`

  .ck-editor__editable {
    height: 500px;

  }

 h2{
  text-align: center;
  margin-right: 34rem;
 }
  button.ant-btn{
    width: 6vw;
  background-color: #2D6247;
  display: flex;
  margin-top: 1rem;
  margin-left: 65.8rem;
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

    }
    button.ant-btn{
      width: 23vw;
      margin-left: 14rem;
  }
  h2{
  text-align: left;
  margin-left: 1rem;
  white-space: nowrap;
 }
}
`;

const ReviewContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  border: 2px solid #2D6247;
  border-radius: 6px;

  @media screen and (max-width:768px) {
    max-width: 80vw;

  }
`;

const WriteReviewPage = () => {
  const token = Functions.getAccessToken();
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState('카테고리를 선택해주세요');
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [userImg, setUserImg] = useState('');
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.userInfoMe(token);
        console.log(response)
        setUserImg(response.data.userImg);
        setNickName(response.data.nickName);
      } catch (error) {
        console.log(error);

    }
  };

  getUserInfo();
}, [token]);


  const handleSubmit = async () => {
    try {

      const content = data;
      const date = new Date().toISOString();
      const viewCount = 0;
      const img = image ? await uploadImage(image) : null;

      await ReviewApi.createReview(token, title, content, date, postType, viewCount, img, userImg, nickName);

      setModalVisible(true);
    } catch (error) {
      console.log(error);
      setError('리뷰 작성에 실패하였습니다.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const downloadUrl = await fileRef.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      console.log(error);
      throw new Error('이미지 업로드에 실패하였습니다.');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Layout>
      <GlobalStyle />
      <Header />
      <Content style={{ padding: '2rem', position: 'relative', backgroundColor: '#FFFFFF', marginTop: '4rem',display:'flex',justifyContent:'center',flexDirection:'column' }}>
      <h2>작성하기</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        <ReviewContainer>
          <Input
            style={{borderRadius:'1px'}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
          />
          <Select
            style={{ width: '50%',borderRadius:'1px' }}
            value={postType}
            onChange={(value) => setPostType(value)}
            placeholder="카테고리를 선택해주세요."
          >
            <Option value="1">캠핑 정보</Option>
            <Option value="2">사고 팔기</Option>
          </Select>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <CKEditor
  editor={ClassicEditor}
  data="글을 작성해주세요!"
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
      'uploadImage' // 이미지 업로드 버튼 추가
    ],
    ckfinder: {
      uploadUrl: 'https://example.com/upload',
    },
  }}
  onReady={(editor) => {
    console.log('Editor is ready to use!', editor);
  }}
  onChange={(event, editor) => {
    let data = editor.getData();
    data = data.replace(/<\/?p>/g, '');
    console.log({ event, editor, data });
    setData(data);
  }}
/>


          <Modal visible={modalVisible} onCancel={closeModal} footer={null}>
            <h3>작성 완료</h3>
            <p>글이 성공적으로 작성되었습니다.</p>
            <Link to="/community">확인</Link>
          </Modal>
        </ReviewContainer>
        <Button onClick={handleSubmit} style={{backgroundColor: '#2D6247', color: 'white', borderColor: 'white'}}>작성하기</Button>
      </Content>
    </Layout>
  );
};

export default WriteReviewPage;
