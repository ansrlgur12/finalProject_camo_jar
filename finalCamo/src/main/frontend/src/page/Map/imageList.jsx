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
left: 5vw;
background-color: white;
    .imageContainer{
    margin-left: 1em;
    width: 100px;
    height: 10vh;
    background-color: #ccc;
    border-radius: 15px;

    
    
}
@media screen and (max-width: 768px) {
    left: 5em;
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

const ImageList = () => {

    const context = useContext(MarkerContext);
    const {contentId} = context;
    const [imageUrl, setImageUrl] = useState([]);

    useEffect(()=>{
        if(contentId === ""){
            return;
        }else{
            console.log(contentId.contentId);
            const getImageData = async() => {
                const rsp = await AxiosApi.getImage(contentId.contentId);
                if(rsp.status === 200) {
                console.log(rsp.data);
                setImageUrl(rsp.data);
                }
            }
            getImageData();
        }
    },[contentId])
    return(
        // <ImageBox>
        // {imageUrl && imageUrl.map((image)=>(
        //     <div key={image.serialnum} className="imageContainer" style={{ backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}></div>
        // ))}
        // </ImageBox>
        <ImageBox>
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
        
        {imageUrl && imageUrl.map((image)=>(
        <SwiperSlide>
        <CardContainer  style={{backgroundImage: `url(${image.imageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', cursor: 'pointer'}} >
        </CardContainer>
        </SwiperSlide>
        ))}
        
    </Swiper>
    </div>
    </ImageBox>
    )
}

export default ImageList;