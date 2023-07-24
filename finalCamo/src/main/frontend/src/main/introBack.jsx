import React from 'react';
import { styled } from 'styled-components';

const VideoStyle = styled.div`
    .video-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -10; /* 동영상을 다른 컨텐츠 뒤로 숨김 */
        overflow: hidden; /* 동영상이 컨테이너를 넘어가지 않도록 설정 */
    }
    .video-container video{
        width: 100vw;
        height: 100vh;
        object-fit: cover; /* 동영상 비율 유지 및 컨테이너에 꽉 차도록 설정 */
        background-color: black;
    }
`;

const VideoBackground = () => {
  return (
    <VideoStyle>
        <div className="video-container">
            <video autoPlay loop muted>
                <source src="/introMovie.mp4" type="video/mp4" />
            </video>
        </div>
    </VideoStyle>
  );
};

export default VideoBackground;
