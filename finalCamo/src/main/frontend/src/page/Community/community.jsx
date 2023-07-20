import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Header from "../../main/header";
import ReviewCards from "./section/reviewCards";
import styled from "styled-components";

const ButtonStyle = styled.div`
  .large-button {
    width: 11.5vw;
    height: 5.8vh;
    font-size: 1.1rem;
    margin-right: 1.875rem;
    background: #2D6247;
    color: #FFFFFF;
    border-radius: 8px;
    transition: background 0.3s, color 0.3s;
  }

  .large-button:hover {
    background: #367d5b;
    color: #FFFFFF;
  }

  .centered-div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  @media screen and (max-width:768px) {
    .large-button {
    width: 30vw;
    height: 5.8vh;
    margin-left: 1.2rem;
    margin-right: 1.2rem;
  }
}

`;


export const SelectButton = () => {
  return (
    <ButtonStyle>
      <div className="centered-div">
        <Link to="/reviewCards">
          <Button className="large-button">
            캠핑 정보
          </Button>
        </Link>
        <Link to="/buySellCards">
          <Button className="large-button">
            사고 팔기
          </Button>
        </Link>
      </div>
    </ButtonStyle>
  );
};

const Community = () => {
  return (
    <>
      <ReviewCards />
    </>
  );
};

export default Community;