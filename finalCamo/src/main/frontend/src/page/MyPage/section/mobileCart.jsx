import React, { useState, useEffect,useContext } from 'react';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import { CartContext } from '../../../context/CartContext';
import QuantityInput from '../../Shop/quantityInput';
import DeleteButton from '../../../Commons/Buttons/deleteButton';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../../API/TestAxios';
import { UserContext } from '../../../API/UserInfo';
import MobileFavorite from './mobileFavorite';
import EllipsisText from '../../../Commons/ellipsis';
import Modal from '../../../Commons/Modal';
import { useLocation } from 'react-router-dom';


const TableContainer = styled.div`
display: none;
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
.ant-table {
  font-size: 0.4rem;
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
  font-size: 0.1rem;
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
.modalBtn{
    width:20vw;
  border-radius: 10px;
  color: #fff;
  background-color: #2D6247;
  padding:0.6rem;
  cursor: pointer;
  }
  

@media screen and (max-width:768px) {
    padding:0.8rem;
   width: 84vw;
   overflow-x: auto;
  display:block;
    .ant-table {
      width: 100%;
    display:flex;

  font-size: 0.1rem;
}
.ant-table-tbody > tr > td {
  padding: 8px 8px;
}
.ant-table-thead > tr > th  {
  color: #fff;
    background: #2D6247; 
  padding: 8px 8px;
}
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





const MobileCart = () => { 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //현재 선택된 행의 key를 저장
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0); //현재 선택된 항목들의 총합계 금액
  const { setCart,removeFromCart,setQuantity: setQuantityInContext,setSelectedItems,selectedItems } = useContext(CartContext); // cartContext사용
  const [data, setData] = useState([]);
  const nav = useNavigate();
  const { email } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
 let location = useLocation();

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

  if (location.pathname === '/cart') {
    const response = await AxiosApi.updateItem(key, quantity, email);
    if (response.status !== 200) {
      console.error('Failed to update item quantity');
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
      title: '상품',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => <img onClick={() => nav(`/ProductDetailForm/${record.id}`)}  src={record.imageUrl} alt={record.imageUrl} style={{ width: '11.5vw', height: 'auto', border:'1px solid #ccc', borderRadius:'8px'}} />
    },
    {
      title: '상품명',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <EllipsisText text={record.productName} maxLine={2} />
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
      title: '삭제',
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
            <MobileFavorite fetchCartData={fetchCartData} />

    </>
  );
};

export default MobileCart;