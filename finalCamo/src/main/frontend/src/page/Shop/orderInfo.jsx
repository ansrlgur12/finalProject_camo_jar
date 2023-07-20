/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";


const OrderInfo =({ quantity, price })=> {
    const totalPrice = quantity * price;
  return (
    <Container>
      <div>
        <InfoTag>QUANTITY</InfoTag>
        <span>{quantity}</span>
      </div>
      <div>
        <InfoTag>TOTAL PRICE</InfoTag>
        <TotalPriceWrapper>
          <span>{new Intl.NumberFormat('ko-KR').format(totalPrice)}원</span>
        </TotalPriceWrapper>
      </div>
    </Container>
  );
}; export default OrderInfo;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
   align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #d4d4d4;
  margin-bottom: 1rem;

  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    span {
      &:nth-child(2) {
        font-weight: 600;
        font-size: 20px;
      }
    }
  }
`;

const InfoTag = styled.span`
  font-size: 1rem;
  color: #878787;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
        font-size: 20px;
`;