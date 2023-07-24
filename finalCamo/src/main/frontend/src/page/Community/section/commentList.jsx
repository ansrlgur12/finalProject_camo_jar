import React, { useState, useEffect, useCallback } from 'react';
import { List, Button, Popconfirm, message, Modal, Input, Form } from 'antd';
import Functions from '../../../Functions';
import styled from 'styled-components';
import AxiosApi from '../../../API/TestAxios';
import CommentApi from '../../../API/CommnetAPI';

const StyledModal = styled(Modal)`
  width: 400px;
  @media (max-width: 768px) {
    display: flex;
  align-items: center;
  justify-content: center;
  .ant-modal-content {
    width: 70vw;
    margin-top: 8rem;
    margin-right: 5.5rem;
  }
}
`;

const ResponsiveButton = styled(Button)`
   @media screen and (max-width:768px) {
    width:10vw;
    font-size: 0.4rem;
   }
`;

const CommentList = ({ reviewId }) => {
  const token = Functions.getAccessToken();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [nickName, setNickName] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await CommentApi.getCommentByReview(reviewId);
      const commentsData = response.data;
      setComments(commentsData);
    } catch (error) {
      console.log(error);
    }
  }, [reviewId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, reviewId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await AxiosApi.userInfoMe(token);
        setNickName(response.data.nickName);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, [token]);

  const handleSubmit = async () => {
    try {
      const response = await CommentApi.createComment(token, reviewId, content, nickName);
      console.log(response)
      const newComment = response.data;
      setComments([...comments, newComment]);
      fetchComments();
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await CommentApi.deleteComment(token, commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
      fetchComments();
      message.success('댓글이 삭제되었습니다.!');
    } catch (error) {
      console.log(error);
      message.error('작성한 본인이 아니면 삭제할수없습니다.');
    }
  };

  const showModal = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await CommentApi.updateComment(token, reviewId, editingContent);
      setComments(comments.map(comment => comment.id === editingCommentId ? { ...comment, content: editingContent } : comment));
      fetchComments();
      message.success('댓글이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.log(error);
      message.error('댓글 수정이 실패하였습니다.');
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="댓글을 작성해주세요."
          />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{backgroundColor: '#2D6247', borderColor: 'white'}}>
  작성
</Button>

        </Form.Item>
      </Form>

      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={comment => (
          <List.Item
            actions={[
              // <ResponsiveButton type="link" onClick={() => showModal(comment.id, comment.content)}>수정하기</ResponsiveButton>,
              <Popconfirm
                title="정말 댓글을 삭제하시겠습니까?"
                onConfirm={() => handleDelete(comment.id)}
                okText="Yes"
                cancelText="No"
              >
                <ResponsiveButton type="link" style={{backgroundColor: '#2D6247', color: 'white', borderColor: 'white'}}>삭제하기</ResponsiveButton>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              title={comment.nickName}
              description={(
                <>
                  {comment.content}
                  <br />
                  <small>{new Date(comment.createdAt).toLocaleString()}</small>
                </>
              )}
            />
          </List.Item>
        )}
      >
        <StyledModal title="댓글 수정" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input.TextArea value={editingContent} onChange={e => setEditingContent(e.target.value)} />
        </StyledModal>
      </List>
    </>
  );
};

export default CommentList;
