import React from "react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import campImage from "../../../images/캠핑이미지바.jpg"
import activeImage from "../../../images/작성이미지바.jpg"
import infoImage from "../../../images/인포이미지바.jpg"

const MyPageImageBarStyle = styled.div`
  width: 76vw;
  height: 12vh;
  padding-top: 10vh;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 85%;
    }
`;

const MyPageImageBar = (props) => {

    const {type} = props;
    const [image, setImage] = useState("");
    useEffect(()=> {
        console.log(type)
        if(type === "camp"){
            setImage(campImage)
        }else if(type === "active"){
            setImage(activeImage)
        }else if(type === "info"){
            setImage(infoImage)
        }


    }, [type])


    return(
        <>
        {type && type === "active" ?
            <MyPageImageBarStyle style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: '50% 57%'}} /> :
            <MyPageImageBarStyle style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} />
        }
        </>
    )
}
export default MyPageImageBar;
