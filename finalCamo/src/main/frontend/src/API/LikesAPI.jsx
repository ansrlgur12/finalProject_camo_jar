import axios from "axios";

export const CAMO_DOMAIN = "";

const LikesApi = {
   // 특정 리뷰 좋아요(JWT적용)
  likeReview: async (token, reviewId) => {
    try {
      return await axios.post(`${CAMO_DOMAIN}/likes/review/${reviewId}`, null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // 특정 리뷰 좋아요 갯수 조회(JWT조회)
  countReviewLikes: async (reviewId, token) => {
    try {
      return await axios.get(`${CAMO_DOMAIN}/likes/review/${reviewId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // 특정 제품 좋아요
  likeProduct: async (memberId, productId) => {
    return await axios.post(`${CAMO_DOMAIN}/likes/product/${productId}/member/${memberId}`);
  },

  // 특정 제품 좋아요 취소
  unlikeProduct: async (memberId, productId) => {
    return await axios.delete(`${CAMO_DOMAIN}/likes/product/${productId}/member/${memberId}`);
  },

  // 특정 제품 갯수 조회
  countProductLikes: async (productId) => {
    return await axios.get(`${CAMO_DOMAIN}/likes/product/${productId}`);
  },

  // 특정 캠핑장 좋아요
  likeCamp: async (memberId, campId) => {
    return await axios.post(`${CAMO_DOMAIN}/likes/camp/${campId}/member/${memberId}`);
  },

  // 특정 캠핑장 좋아요 JWT
  likeCampJwt: async (token, campId) => {
    try{
      return await axios.post(`${CAMO_DOMAIN}/likes/camp/${campId}`, null , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    } catch (error) {
      throw error;
    }
  },

  // 특정 캠핑장 좋아요 취소
  unlikeCamp: async (memberId, campId) => {
    return await axios.delete(`${CAMO_DOMAIN}/likes/camp/${campId}/member/${memberId}`);
  },

  // 특정 캠핑장 좋어요 갯수 조회
  countCampLikes: async (campId) => {
    return await axios.get(`${CAMO_DOMAIN}/likes/camp/${campId}`);
  },

  // 특정 캠핑장 좋어요 갯수 조회 jwt
  countCampLikesJwt: async (token, campId) => {
    try{
      return await axios.get(`${CAMO_DOMAIN}/likes/camp/${campId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    }catch(error){
      throw error;
    }
  },

  // 특정 리뷰 좋아요 취소
  unlikeReview: async (memberId, reviewId) => {
    return await axios.delete(`${CAMO_DOMAIN}/likes/review/${reviewId}/member/${memberId}`);
  },
};

export default LikesApi;
