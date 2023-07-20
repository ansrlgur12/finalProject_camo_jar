import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import MainSection1 from './mainSection1';
import Header from './header';
import { UserContext } from '../API/UserInfo';
import { useNavigate } from 'react-router-dom';
import MainSection3 from './mainSection3';
import Footer from './footer';
import MainSection2 from './mainSection2';
import "../font.css";

export const MainPageStyle = styled.div`
    font-family: 'GeekbleMalang2WOFF2';
`;


const MainPage = () => {
    const context = useContext(UserContext);
    const { email } = context;
    const nav = useNavigate();

    useEffect( () => {
        if(!email) {
            nav('/intro');
        }
    }, [email, nav]);
   
    return (
        <>
            <MainPageStyle>
                <Header/>
                <MainSection1/>
                <MainSection2/>
            </MainPageStyle>

        </>
    );
};

export default MainPage;
