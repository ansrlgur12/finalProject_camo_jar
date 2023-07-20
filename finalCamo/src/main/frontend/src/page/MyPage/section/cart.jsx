import React, { useState, useEffect,useContext } from 'react';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import Sidebar from '../sidebar';
import { CartContext } from '../../../context/CartContext';
import QuantityInput from '../../Shop/quantityInput';
import MyFavorite from './myFavorite';
import DeleteButton from '../../../Commons/Buttons/deleteButton';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../../API/TestAxios';
import { UserContext } from '../../../API/UserInfo';
import SmallSideBar from '../smallSidebar';
import MobileCart from './mobileCart';
import Modal from '../../../Commons/Modal';



export const LayoutContainer = styled.div` 
  display: flex;
  /* padding-top: 100px; */


`;

export const SidebarContainer = styled.div`
  margin-top:120px;
  flex: 0 0 200px;
  height: 100vh;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  @media screen and (max-width: 768px) {
      display: none;
    }
`;

export const ContentContainer = styled.div`
  margin-top: 100px;
  flex: 1;
  padding: 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;


`;

const TableContainer = styled.div`
width:70vw;
  background-color: #FFFFFF;
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  /* text-align: center; */
  .ant-checkbox-checked .ant-checkbox-inner {
  background-color:#2D6247;
  border-color: #2D6247; 
}

button.ant-btn{
  background-color: #2D6247; 
   &:hover {
    background-color: #2D6247; 
      opacity: 0.7;
    }
}
.ant-table-thead > tr > th  {
  text-align: center;
  color: #fff;
    background: #2D6247; 
}

tbody {
  text-align: center;
  

  align-items: center;
  justify-content: center;
}
.ant-table-cell div{
  align-items: center;
  justify-content: center;
}
.mobileCart{
  display: none;
}
.modalBtn{
    width:6vw;
  border-radius: 10px;
  color: #fff;
  background-color: #2D6247;
  padding:0.6rem;
  cursor: pointer;
  }
  .modalBtn:hover{
    opacity: 0.7;
  }
@media screen and (max-width:768px) {
display: none;
}
`;

const TotalPayment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
`;

const TotalAmount = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

// export const MyPageImageBar = styled.div`
//   width: 76vw;
//   height: 10vh;
//   padding-top: 10vh;
//   background-color: #d64040;
//   margin: auto;
//   @media screen and (max-width: 768px) {
//     width: 85%;
//     }
// `;

export const ImageFlexBox = styled.div`
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;





const Cart = () => { 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //현재 선택된 행의 key를 저장
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0); //현재 선택된 항목들의 총합계 금액
  const { setCart,removeFromCart,setQuantity: setQuantityInContext,setSelectedItems,selectedItems } = useContext(CartContext); // cartContext사용
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const { email } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);


// 상태 정의
const [cartData, setCartData] = useState([]);

const openModal = () => {
  setIsOpen(true);
};

const closeModal = () => {
  setIsOpen(false);
};

// 서버로부터 데이터를 받아오는 함수
const fetchCartData= async()=> {
    const response = await AxiosApi.cartList(email);
    if (response.status === 200) {
        setCartData(response.data);
        setCart(response.data);
    }
}

// useEffect 내에서 fetchCartData 호출
useEffect(() => {
    fetchCartData();
}, []); // 의존성 배열에 아무것도 넣지 않으면 컴포넌트가 마운트될 때만 실행
const setQuantity = async (key, quantity) => {
  setQuantityInContext(key, quantity);

  if (window.location.pathname === '/cart') {
    const response = await AxiosApi.updateItem(key, quantity, email);
    if (response.status !== 200) {
      console.error('실패');
    } else {
      fetchCartData();
    }
  }
};
useEffect(() => {
  const newData = cartData.map((item) => ({
      key: item.cartItemId, 
      id: item.productId,
      productName: item.productName,
      imageUrl: item.imageUrl,
      price: new Intl.NumberFormat('ko-KR').format(item.price) + "원",
      quantity: item.quantity,
  }));

  setData(newData);
}, [cartData]);

const handleRemoveFromCart = async (cartItemId) => {
  try {
    console.log(email,cartItemId);
    const response = await AxiosApi.deleteItem(cartItemId, email);
    if (response.status === 200) {
      removeFromCart(cartItemId);
      fetchCartData(); // 장바구니 데이터를 다시 가져옵니다.
    } else {
      console.log('삭제에 실패하였습니다.'); 
    }
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  const selectedData = data.filter((item) => selectedRowKeys.includes(item.key));
  setSelectedItems(selectedData);
}, [selectedRowKeys]);
  const columns = [
    {
      title: '상품 이미지',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => <img src={record.imageUrl} alt={record.imageUrl} style={{ width: '11.5vw', height: 'auto', border:'1px solid #ccc', borderRadius:'8px'}} />
    },
    {
      title: '상품명',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div onClick={() => nav(`/ProductDetailForm/${record.id}`)} style={{  cursor: 'pointer' }}>{text}</div>
        ),
    },
    
  
    {
      title: '판매가',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <QuantityInput
        quantity={record.quantity}
        setQuantity={quantity => setQuantity(record.key, quantity)}
      />)
    },
    {
      title: '삭제하기',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => ( // 이 함수가 IconButton을 반환
       <DeleteButton onClick={() => handleRemoveFromCart(record.key)}/>
       )
      },
    ];

  useEffect(() => { //선택된 항목들의 총금액을 다시 계산하고, 상태 업데이트
    const totalAmount = calculateTotalPaymentAmount();
    setTotalPaymentAmount(totalAmount);
  }, [selectedRowKeys]);

  const calculateTotalPaymentAmount = () => { //선택된 항목들의 총 금액을 계산하는 함수
    let totalAmount = 0; //선택된 항목들의 총금액 저장 용도
    selectedRowKeys.forEach((key) => { //각 항목 반복문 실행
      const item = data.find((d) => d.key === key); 
      const paymentAmount = parseFloat(
        item.price.replace(',', '').replace('원', '')
      );
      const quantity = item.quantity;
      totalAmount += paymentAmount * quantity;
    });
    return totalAmount;
  };

  const rowSelection = { //선택항목 제어 및 상태관리
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
     
    },
    
  };
 


  return (
    <>
    
      <Header />
      <LayoutContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <SmallSideBar />
        <ContentContainer>
          <TableContainer>
          <h2> 장바구니</h2>
            <Table className="cart-table" rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    tableLayout="fixed"
                    />
            <TotalPayment>
              <TotalAmount>
                총 합계 금액: {totalPaymentAmount.toLocaleString()}원
              </TotalAmount>
              {selectedItems.length > 0 ? (
        <Button type="primary" onClick={() => nav("/orderpage")}>
          결제하기
        </Button>
      ) : (
        <Button type="primary" onClick={() => setIsOpen(true)}>
          결제하기
        </Button>
      )}
      
            </TotalPayment>
            
            <Modal isOpen={isOpen} onClose={closeModal}>
       
       <p>구매할 상품을 선택하세요.</p>
        <div className="btnWrapper">
       <button className="modalBtn"  onClick={() => {  closeModal(); }}>닫기</button>
       
        
       </div>
     </Modal>
          </TableContainer>
          <MobileCart/>
          <MyFavorite fetchCartData={fetchCartData}/>
         
        </ContentContainer>
        
        
      </LayoutContainer>
    </>
  );
};

export default Cart;