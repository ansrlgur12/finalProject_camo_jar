import React from 'react';
import styled from 'styled-components';
import testImage from '../images/backgroundimg1.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import AxiosApi from '../API/TestAxios';

const CardContainer = styled.div`
width: 20vw;
height: 20vw;
border-radius: 15px;
display: flex;
flex-direction: column-reverse;
box-shadow: 1px 2px 5px gray;
`
const CardDesc = styled.div`
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
width: 100%;
height: 30%;
background-color: rgba(34, 34, 34, 0.8);
`;
const Title = styled.h2`
    color: white;
    margin: .5em;
    margin-bottom: 0;
`;
const CampDesc = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const CampDescSection = styled.div`
    color: white;
    margin: .5em;
    padding-bottom: 1em;
    font-size: 1.2em;
    .num{
        margin-left: .5em;
        
    }
`;

const CampCard = () => {

  const [campData, setCampData] = useState([]);

  useEffect(()=>{
    const getCampCard = async() => {
        const rsp = await AxiosApi.getCampData("ALL", "시.군.구");
        console.log(rsp.data);
        setCampData(rsp.data);

    }
    getCampCard();
  },[])

  return (
    <>
    {campData && campData.map((camp)=>(
    <CardContainer  style={{backgroundImage: `url(${camp.firstImageUrl})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <CardDesc>
            <Title>{camp.facltNm}</Title>
            <CampDesc>
                <CampDescSection>15.4km</CampDescSection>
                <CampDescSection><FontAwesomeIcon icon={faHeart} size="lg" color="red"/><span className='num'>3</span></CampDescSection>
            </CampDesc>
        </CardDesc>
    </CardContainer>
    ))}
</>
  );
}

export default CampCard;