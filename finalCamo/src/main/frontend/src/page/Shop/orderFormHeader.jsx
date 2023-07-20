/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";




const  OrderFormHeader =(props,product)=> {
  return (
    <Container>
      <TitleBox>
        <span>{props.product.brand|| 'brand'}</span>
        <h2>{props.product.productName}</h2>
      </TitleBox>
      <ImageWrapper2>
        {props.product &&  <img src={props.product.imageUrl} alt="img" />}
        </ImageWrapper2>
      <PriceBox>
        <span>{new Intl.NumberFormat('ko-KR').format(props.product.price) + "원"}</span>
      </PriceBox>
    </Container>
  );
}; export default OrderFormHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #888;
  margin-bottom: 20px;

`;
const ImageWrapper2 = styled.div`
  width: 100%;
  

  img {
    width: 60vw;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid #ccc;
    display: none;
  }
  @media screen and (max-width:768px) {
    justify-content: center;
img{
  margin-left: 2rem;
  display: block;
}
  
  }

`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #525252;
  }

  span {
    color: #707070;
    font-size: 1rem;
  }
`;

const PriceBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 700;
  }

  svg {
    margin-bottom: 4px;
  }
`;
