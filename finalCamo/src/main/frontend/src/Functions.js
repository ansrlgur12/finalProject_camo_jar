import axios from "axios";

export const domain = "http://localhost:8111";

const Functions = {
    //accessToken 세터
    setAccessToken : (accessToken) => {
        window.localStorage.setItem("accessToken", accessToken);
      },
    //accessToken 게터
    getAccessToken : () => {
        return window.localStorage.getItem("accessToken");
      },
    //refreshToken 세터
    setRefreshToken : (refreshToken) => {
        window.localStorage.setItem("refreshToken", refreshToken);
    },
    //refreshToken 게터
    getRefreshToken : () =>{
        return window.localStorage.getItem("refreshToken");
    },

    //  헤더에 AccessToken 설정하는 함수
    setAuthorizationHeader : () => {
        const accessToken = Functions.getAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
      },
    
    // 토큰 재발급 함수
    tokenRenewal: async() => {
        const token = {
          refreshToken : Functions.getRefreshToken()
        }
        const rsp = await axios.post(domain + "/auth/reissue", token)
        Functions.setAccessToken(rsp.data.accessToken); 
        Functions.setAuthorizationHeader();
      },

    // 401 에러시 토큰 재발급 함수 실행하는 함수
    handleApiError: async(error) => {
      if (error.response && error.response.status === 401) {
        // 토큰이 만료되었거나 유효하지 않은 경우
        await Functions.tokenRenewal();
      } else {
        // 그 외의 오류 처리
        console.error('API 요청 오류:', error);
        // 에러 메시지를 표시하거나 기타 처리를 수행
      }
    }

}

export default Functions;