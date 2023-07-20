import React from 'react';
import styled from 'styled-components';

const QuantityInputWrapper = styled.div`
  display: flex;
  
  align-items: center;
  gap: 0.6rem;
  @media screen and (max-width:768px) {
   margin-left: 0.5rem;
    justify-content: left;
    gap: 0.3rem;
  }
`;

const Button = styled.button`
  background:  #2D6247;
  color: #fff;
  border: none;
 width: 2vw;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: bold;
  @media screen and (max-width:768px) {
    width:2vw;
    font-size: 0.8rem;
    display: flex;
  justify-content: center;
  align-items: center;
  }
`;

const Input = styled.input`
border: none;
  width: 4vw;
  text-align: center;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width:768px) {
    width:2vw;
    font-size: 0.8rem;
  }
`;

const QuantityInput = ({ quantity, setQuantity }) => {

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <QuantityInputWrapper>
      <Button onClick={handleDecrease}>-</Button>
      <Input type="number" value={quantity} readOnly />
      <Button onClick={handleIncrease}>+</Button>
    </QuantityInputWrapper>
  );
};

export default QuantityInput;
