const KakaoLogin = () =>{
    const REST_API_KEY = "7a3bc8047fafe44d6da8a3d61c379bc6";
    const REDIRECT_URI = 'http://localhost:3000/auth';
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const handleLogin = () => {
      window.location.href = KAKAO_AUTH_URL
    }
    return(
        <>
        <div className="kakao" onClick={handleLogin}></div>
        </>
    )
}
export default KakaoLogin;
