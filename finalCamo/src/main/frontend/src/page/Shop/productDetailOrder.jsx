
import React, {useState,useContext, useEffect} from "react";
import OrderFormFooter from "./productFormFooter";
import OrderFormHeader from "./orderFormHeader";
import styled from "styled-components";
import OrderInfo from "./orderInfo";
import { useNavigate } from "react-router-dom";
import QuantityInput from "./quantityInput";
import { CartContext } from "../../context/CartContext";
import Modal from "../../Commons/Modal";
import  { UserContext } from "../../API/UserInfo";
import AxiosApi from "../../API/TestAxios";
import { ModalStyle } from "../../main/header";
import Functions from "../../Functions";

const Container = styled.div`
  padding: 32px 24px;
  width: 100%;
  .modalBackground{
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background: rgba(0, 0, 0, 0.8);
}

/* 모달창 영역을 꾸민다 */
.modalBox{
  position: absolute;
  top: calc(50vh - 100px); left: calc(50vw - 200px);
  background-color: white;
  display: flex; justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  width: 400px;
  height: 200px;
}
 .btnWrapper{
    display: flex;
  gap:4rem;
  .modalBtn{
    width:80px;
  border-radius: 10px;
  color: #fff;
  background-color: #2D6247;
  padding:10px;
  }

 }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  button {
    cursor: pointer;
    font-weight: bold;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #ccc;
    border-radius: 10px;
    color:#2D6247;
    background-color: #fff;
    flex: 1;
    padding: 20px;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const ProductDetailOrder=({product})=> {
  const [quantity, setQuantity] = useState(1);
const nav = useNavigate();
const { email } = useContext(UserContext);
const { addToCart,setSelectedItems } = useContext(CartContext);
const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
const [addedCartItemId, setAddedCartItemId] = useState(null);
const token = Functions.getAccessToken();

const loginCheck = () => {
  if (!token) {
      setIsLoginModalOpen(true);
  } else {
      handleBuyNow();
  }
};
const loginCheck2 = () => {
  if (!token) {
    setIsLoginModalOpen(true);
  } else {
    setIsAddToCartModalOpen(true);
  }
};




const closeLoginModal = () => {
  setIsLoginModalOpen(false);
};



const closeAddToCartModal = () => {
  setIsAddToCartModalOpen(false);
};



const handleAddToCart = async () => {
  try {
    console.log(product.id, quantity, email);
    const response = await AxiosApi.addToCart(product.id, quantity, email);

    if(response.status === 200) {
      console.log('성공');
      console.log(response.data);

      // Context에 아이템 추가
      addToCart(product, quantity);
      closeAddToCartModal();

      // 추가된 상품의 cartItemId 저장
      console.log(response.data);
      setAddedCartItemId(response.data);


      // 아이템 정보를 반환
      return {
        cartItemId: response.data,
        productId: product.id,
        productName: product.productName,  // product 객체의 실제 속성에 따라 변경해야 함
        imageUrl: product.imageUrl, // product 객체의 실제 속성에 따라 변경해야 함
        price: product.price,       // product 객체의 실제 속성에 따라 변경해야 함
        quantity: quantity,
      };
    } else {
      console.log('오류');
    }
  } catch(error) {
    console.error( error);
  }
};


const handleBuyNow = async() =>{
  const addedItem = await handleAddToCart();
  if (addedItem) {
    // 추가된 상품만 선택
    const selectedItems = [{
      key: addedItem.cartItemId,
      id: addedItem.productId,
      productName: addedItem.productName,
      imageUrl: addedItem.imageUrl,
      price: new Intl.NumberFormat('ko-KR').format(addedItem.price) + "원",
      quantity: addedItem.quantity,
    }];

    // 변환된 데이터를 setSelectedItems 함수에 전달
    setSelectedItems(selectedItems);
    console.log(selectedItems);
  }

  nav("/orderPage");
};



  return (
    <>

    <Container>
      <OrderFormHeader product={product}/>
      <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
      <OrderFormFooter />
      <OrderInfo  quantity={quantity} price={product.price}/>

     <ButtonWrapper>

        <button onClick={loginCheck2}>ADD TO CART</button>

        <Modal isOpen={isAddToCartModalOpen} onClose={closeAddToCartModal}>

        <p>상품을 카트에 추가하시겠습니까?</p>
         <div className="btnWrapper">
        <button className="modalBtn"  onClick={handleAddToCart}>
      예</button>
        <button className="modalBtn" onClick={() => {  closeAddToCartModal() }}>아니오</button>

        </div>
      </Modal>
        <button onClick={loginCheck}>BUY NOW</button>
        </ButtonWrapper>


    </Container>
    <ModalStyle>
            <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
                <p>로그인 후 확인 가능합니다.</p>
                <div className="btnWrapper">
                    <button className="modalBtn" onClick={() => {
                        closeLoginModal()
                        nav("/intro");
                    }}>
                        로그인
                    </button>
                </div>
            </Modal>
            </ModalStyle>
   
    </>
  );
}; export default ProductDetailOrder;

