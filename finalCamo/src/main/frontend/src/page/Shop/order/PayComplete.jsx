import Header from "../../../main/header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GridStlye } from "../shoppingMenu";
import Footer from "../../../main/footer";
import styled from 'styled-components';
import { ButtonWrapper } from "../productDetailOrder";

const Container = styled.div`
padding-top: 20rem;
margin-bottom:20rem;
display: flex;
justify-content: center;
align-items: center;

h1{
    color: #2D6247;
}
h3{
    font-size: 1rem;
}
button{
    font-size: 1rem;
}

`;
const PayComplete= () => {
const nav = useNavigate();


    return(
        <>
        <Header/>
        <Container>
        <GridStlye>
          
        <h1>구매 완료!</h1>
        <h3>이용해 주셔서 감사합니다.</h3>
        <ButtonWrapper>
        <button  onClick={()=>nav("/shopMain")}>쇼핑 계속하기</button>
        <button onClick={()=>nav("/OrderList")}>구매내역 확인</button>
        </ButtonWrapper>
        </GridStlye>
        </Container>
       
        </>
    );
}; export default PayComplete;