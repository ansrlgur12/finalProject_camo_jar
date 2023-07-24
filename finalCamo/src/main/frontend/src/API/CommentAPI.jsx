import axios from 'axios';

export const COMMENT_API_URL = '';

  // 댓글 작성
const CommentApi = {
  createComment: async (token, reviewId, content, nickName) => {
    const comment = {
      content: content,
      nickName: nickName
    };

    try {
      return await axios.post(`${COMMENT_API_URL}/comment/${reviewId}`, comment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error){
      throw error;
    }
  },

  // 댓글 수정
  updateComment: async (token, reviewId, content) => {
    const comment = {
      content: content
    };

    try {
      return await axios.put(`${COMMENT_API_URL}/comment/${reviewId}`, comment, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (token, reviewId) => {
    try {
      return await axios.delete(`${COMMENT_API_URL}/comment/${reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // 댓글 조회
  getCommentByReview: async (reviewId) => {
    return await axios.get(`${COMMENT_API_URL}/comment/review/${reviewId}`);
  },

  // 특정 회원의 댓글 조회
  getCommentsByMember: async (token) => {
    try {
      return await axios.get("COMMENT_API_URL/comment/member", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  }
};

export default CommentApi;