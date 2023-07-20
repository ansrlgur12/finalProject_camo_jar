import React from 'react';
import styled from 'styled-components';



const OrderInput = (props) => {
  const { label, name, value, onChange, ...otherProps } = props;
  return (
    <InputContainer>
      <label>{label}</label>
      <input name={name} value={value} onChange={onChange} {...otherProps} />
    </InputContainer>
  );
};

export default OrderInput;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
 white-space: nowrap;
  font-weight: 600;
  color: #ccc;

  input {
   margin-left: 1rem;
    width: 20vw;
    height: auto;
    line-height: normal;
    padding: 0.6em 0.5em;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 0;
    outline-style: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 4px;
  }

  input:focus {
    border: 2px solid #ccc;
  }
  @media screen and (max-width:768px) {
    font-size: 1rem;
   
   
  input{
    width: 40vw;
    height: 1rem;
    margin-right: 1.5rem;
  }
  label{
    white-space: nowrap;
    width: 14vw;
    height: 6vh;
  }
}
`;