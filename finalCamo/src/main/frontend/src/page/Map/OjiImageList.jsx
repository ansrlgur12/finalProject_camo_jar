import React from "react";
import styled from "styled-components"
import AxiosApi from "../../API/TestAxios";
import { useEffect, useContext, useState } from "react";
import { MarkerContext } from "../../context/MarkerInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper";

const ImageBox = styled.div`

/* display: flex;
position: relative;
left: 4vw;
background-color: white;
    .imageContainer{
    margin-left: 1em;
    width: 100px;
    height: 10vh;
    background-color: #ccc;
    border-radius: 15px;
    
} */
.sBottom{
        margin-top: 5vh;
        padding: 1em;
        width: 34vw;
    }
    @media screen and (max-width: 768px) {
        .sBottom{
        margin-top: 0;
        padding: 1em;
        width: 65vw;
    }
}
`;

const CardContainer = styled.div`
width: 10vw;
height: 7vw;
border-radius: 15px;
display: flex;
flex-direction: column-reverse;
box-shadow: 1px 2px 5px gray;
@media screen and (max-width: 768px) {
    width: 20vw;
    height: 15vw;
    margin-top: 1em;
}
`;

const OjiImageList = () => {

    const context = useContext(MarkerContext);
    const { contentId } = context;
    const [imageUrls, setImageUrls] = useState([]);
  
    useEffect(() => {
      if (contentId === "") {
        return;
      } else {
        const urls = contentId.url ? contentId.url.split(",") : [];
        setImageUrls(urls);
      }
    }, [contentId]);
  
    return (
      <ImageBox>
        {/* {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="imageContainer"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        ))} */}
        <div className="sBottom">
    <Swiper
        // loop={true}
        modules={[Navigation, Pagination, Keyboard]}
        spaceBetween={8}
        slidesPerView={3}
        navigation
        keyboard={{enable:true}}
        scrollbar={{ draggable: true }}
    >
        
        {imageUrls && imageUrls.map((imageUrl, index)=>(
        <SwiperSlide>
        <CardContainer key={index}  style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer'}} >
        </CardContainer>
        </SwiperSlide>
        ))}
        
    </Swiper>
    </div>
      </ImageBox>
    );
  };
  
  export default OjiImageList;