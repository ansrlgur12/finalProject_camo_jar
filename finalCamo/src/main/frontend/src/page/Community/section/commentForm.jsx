// import React, { useState } from 'react';
// import { Form, Input, Button, Modal } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import CommentApi from '../../../API/CommnetAPI';
// import Functions from '../../../Functions';
//
// const CommentForm = ({ reviewId } ) => {
//   const token = Functions.getAccessToken();
//   const [content, setContent] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const navigate = useNavigate();
//
//   const handleSubmit = async () => {
//     try {
//
//       console.log('token:', token);
//       console.log('reviewId:', reviewId);
//       console.log('content:', content);
//
//       await CommentApi.createComment(token, reviewId, content);
//       setContent('');
//       setIsModalVisible(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//
//   const handleOk = () => {
//     setIsModalVisible(false);
//     navigate(`/reviewDetail/${reviewId}`);
//   };
//
//   return (
//     <>
//       <Form onFinish={handleSubmit}>
//         <Form.Item>
//           <Input.TextArea
//             rows={4}
//             value={content}
//             onChange={e => setContent(e.target.value)}
//             placeholder="댓글을 작성해주세요."
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             작성
//           </Button>
//         </Form.Item>
//       </Form>
//
//       <Modal title="댓글 작성" visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
//         <p>댓글이 작성되었습니다.</p>
//       </Modal>
//     </>
//   );
// };
//
// export default CommentForm;
