import React from "react";
import styled from "styled-components";
import "../../font.css";

const InfoStyled = styled.div`
    background-color: black;
    color: white;
    border-radius: 10px;
    height: 1.2em;
    padding: 5px;
    text-align: center;
    line-height: 1;
    padding-top: .5em;
 `;

const InfoWindow = (props) => {

    const {name} = props;

    return (
        <InfoStyled>{name}</InfoStyled>
    );
};

export default InfoWindow;
