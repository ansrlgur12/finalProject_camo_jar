import React, {useState} from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from 'styled-components';
import Modal from '../Commons/Modal';



const SearchAddress = ({handleAddress}) => {
  
  

    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    const onCompletePost = (data) => {
      console.log(data);
      handleAddress({
          fullAddress: data.address, 
          zipcode: data.zonecode,
      });
      closeModal();
  };

  
    const postCodeStyle = {
     
      display: "block",
      position: "absolute",
      top: "-10%",
      width: "398px",
      height: "450px",
      padding: "7px",
      zIndex: 100, 
      
    };


  return (
  <BtnWrapper>
       
      <button onClick={openModal}>
        주소찾기
         <Modal isOpen={isOpen} onClose={closeModal}>  
       
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}

        />
     </Modal> 
      
      </button>
      </BtnWrapper>
    
  );
};

export default SearchAddress;

const BtnWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  button {
    width: 100px;
    border: 0;
    margin-left: 21rem;
    color: #fff;
    background: #2D6247; 
    padding: 0.5rem 0.8rem;
    border-radius: 0.4rem;
    cursor: pointer;
  }


  @media screen and (max-width:768px) {
 button{
  width: 30vw;
  padding: 0.4rem 0.2rem;
  margin-left: 8rem;
 }
}
`;