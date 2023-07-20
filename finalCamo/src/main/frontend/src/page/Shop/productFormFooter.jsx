import React from "react";
import styled from "styled-components";



const OrderFormFooter=()=> {
  return (
    <Container>
      <InfoWrapper>
        
        <div>
          <p>택배배송 | 무료배송</p>
        </div>
      </InfoWrapper>
     
    </Container>
  );
}; export default OrderFormFooter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #d4d4d4;
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    p {
      &:nth-child(2) {
        color: #979797;
      }
    }
  }


`;