import React, { useState, useEffect,useContext } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import Header from '../../../main/header';
import { CartContext } from '../../../context/CartContext';
import { ContentContainer } from '../../MyPage/section/cart';
import { useNavigate } from 'react-router-dom';
import Danal from './danal';
import OrderInput from '../../../Commons/OrderInput';
import SearchAddress from '../../../API/Address';
import { useOrderContext } from '../../../context/OrderContext';
import KakaoPay from './kakaoPay';
import EllipsisText from '../../../Commons/ellipsis';
import "../../../../src/font.css";

const TableContainer = styled.div`
  background-color: #FFFFFF;
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 5rem;
  width: 58vw;
  margin-left:22rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ant-checkbox-checked .ant-checkbox-inner {
  background-color:#2D6247;
  border-color: #2D6247;
  margin-bottom: 20rem;
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
  background-color: #2D6247;

  color: #fff;
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



@media screen and (max-width:768px) {
    padding:0.4rem;
   width: 86vw;
   overflow-x: auto;
  display:block;
  margin-left:0;

    .ant-table {
     margin-left:0.4rem;
      width: 100%;
    display:flex;
  font-size: 0.1rem;

}
.ant-table-tbody > tr > td {
  padding: 12px 16px;

}
.ant-table-thead > tr > th  {
  white-space: nowrap;
  padding: 8px 12px;
  background-color: #2D6247;

  color: #fff;
}
}
`;




const Container = styled.section`
overflow-x: auto;
border-radius: 4px;
border: none;

display: flex;
box-sizing: border-box;
padding-top: 70px;
width: 100vw;
height: auto;
margin: auto;
h1 {
    padding-top: 3rem;
    text-align: center;
  }

  h3 {
    margin-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }

  .payerName {
    margin-left: 0.8rem;
    height: auto;
    line-height: normal;
    padding: 0.6em 0.5em;
  }
  .scrollable-div {
    font-family: 'Pretendard-Regular';
  overflow: auto;
  height: 200px;
  width: 40vw;
}
  @media screen and (max-width:768px) {
  width:auto;
  .scrollable-div {

  width: 82vw;
}

}
`;
const Wrapper = styled.div`
  margin-top: 2rem;
  @media screen and (max-width:768px) {
 margin-top: 1rem;

}
`;

const BtnWrapper = styled.div`
  margin-top: 3rem;

  button {
    width: 100%;
    border: 0;
  cursor: pointer;
  
    color: #fff;
    background: #2D6247; 
    padding: 1rem 2rem;
    border-radius: 0.4rem;
  }

  button:disabled {
    background: #ccc;
  }

`;


const OrderPage = () => { 


  const [data, setData] = useState([]);
  const nav = useNavigate();
  const {selectedItems} = useContext(CartContext);
  const [orderList, setOrderList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [agree, setAgree] = useState(false);
  const { setOrderData } = useOrderContext();
  const [payMethodId, setPayMethodId] = useState(0); 






  
useEffect(() => {
  console.log(selectedItems);
  const newData = selectedItems.map((item) => ({
    key: item.cartItemId,
    id: item.productId,
    productName: item.productName,
    imageUrl: item.imageUrl,
    price: item.price,
    quantity: item.quantity,
  }));

  setData(newData);
  const cost = selectedItems.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));  
    return acc + price * item.quantity;
  }, 0);
  setTotalCost(cost);
  console.log(cost);
}, [selectedItems]);




const [inputs, setInputs] = useState({
  ordererName: '',
  ordererPhone: '',
  ordererEmail: '',
  delivName: '',
  delivPhone: '',
  zipcode: '',
  fullAddress: '',
  detailAddress: '',
  payMethodId: 0,
  payerName: '',
});

const {
  ordererName,
 ordererPhone,
  ordererEmail,
  delivName,
  delivPhone,
  zipcode,
  fullAddress,
  detailAddress,
} = inputs;

const handleChange = (e) => {
  const { value, name } = e.target;
  if (name === "ordererPhone" || name === "delivPhone") {
  
    let digitOnlyValue = value.replace(/\D/g, "");

    //하이픈 추가
    if (digitOnlyValue.length > 2) {
      if (digitOnlyValue.length < 7) {
        digitOnlyValue = digitOnlyValue.replace(/(\d{3})(\d{1,4})/, "$1-$2");
      } else {
        digitOnlyValue = digitOnlyValue.replace(
          /(\d{3})(\d{4})(\d{1,4})/,
          "$1-$2-$3"
        );
      }
    }
    setInputs({
      ...inputs,
      [name]: digitOnlyValue,
    });
  } else {
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
};


const [isSameInfo, setIsSameInfo] = useState(false);

const handleIsSameInfo = () => {
  setIsSameInfo(!isSameInfo);
  if (!isSameInfo) {
    setInputs({
      ...inputs,
      delivName: ordererName,
      delivPhone: delivPhone,
    });
  }
};

const handleAddress = (data) => {
  setInputs({
    ...inputs,
    fullAddress: data.fullAddress,
    zipcode: data.zipcode,
  });
};

const handleAgree = () => {
  setAgree(!agree);

  setOrderData(orderdata); 
};

const handlePayMethod = (e) => {
  const { value, name } = e.target;
  if (name === "payMethodId") {
    setPayMethodId(Number(value));  
  } 
};

const orderdata = {
   
  products: orderList,
  totalCost,
  orderer_name: ordererName,
  orderer_phone: ordererPhone,
  orderer_email: ordererEmail,
  deliv_name: delivName,
  deliv_Phone: delivPhone,
  address: fullAddress,
  zipcode: zipcode,
  
  agree,
};

 
 


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
        <EllipsisText text={record.productName} maxLine={1} />
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
    },
    {
      title: '배송비',
      dataIndex: 'delivery',
      render: () => <p style={{whiteSpace:'nowrap'}}> 무료</p>,
      
       
      },
    ];

 




    
  
 


  return (
    <>
      <Header />
     
        <Container>
        
       
        <ContentContainer >
       
        
          
           
      
     
      <TableContainer>
      <h3>주문 상품</h3>
      <Table  
                    columns={columns}
                    dataSource={data} /> 
                    </TableContainer>
   
     
      <TableContainer>
      <h3>주문자 정보</h3>
      <Wrapper>
        <OrderInput
          label={'보내는 분'}
          name="ordererName"
          value={ordererName}
          onChange={handleChange}
        />
        <OrderInput
          label={'휴대폰'}
          name="ordererPhone"
          value={ordererPhone}
          onChange={handleChange}
        />
       
      </Wrapper>
      <h3>배송 정보</h3>
      <Wrapper>
        <input type="checkbox" value={isSameInfo} onClick={handleIsSameInfo} />
        <label>주문자 정보와 동일</label>
        {isSameInfo ? (
          <>
            <OrderInput
              label={'받는 분'}
              name="ordererName"
              value={ordererName}
              onChange={handleChange}
            />
            <OrderInput
              label={'휴대폰'}
              name="ordererPhone"
              value={ordererPhone}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <OrderInput
              label={'받는 분'}
              name="delivName"
              value={delivName}
              onChange={handleChange}
            />
            <OrderInput
              label={'휴대폰'}
              name="delivPhone"
              value={delivPhone}
              onChange={handleChange}
            />
          </>
        )}
        <SearchAddress  handleAddress={handleAddress} />
        <OrderInput label={'우편번호'} value={zipcode} readOnly={true} />
        <OrderInput label={'주소'} value={fullAddress} readOnly={true} />
        <OrderInput
          label={'상세주소'}
          name="detailAddress"
          value={detailAddress}
          onChange={handleChange}
        />
     
      </Wrapper>
      <h3>결제 수단</h3>
      <Wrapper>
        <input
          type="radio"
          name="payMethodId"
          value={0}
          onChange={handlePayMethod}
          defaultChecked
        />
        <label htmlFor="0">신용카드</label>
        <input
          type="radio"
          name="payMethodId"
          value={1}
          onChange={handlePayMethod}
        />
        <label htmlFor="1">카카오페이</label>
     
      </Wrapper>
      <h3>개인정보 수집/제공</h3>
      <div class="scrollable-div">
      개인정보 처리방침 약관


1.개인정보의 수집 및 이용 목적

회사는 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:
서비스 제공: 회사는 고객에게 서비스를 제공하기 위해 개인정보를 수집하고 이용합니다. 이는 서비스 이용에 필요한 기능을 제공하고 사용자의 요청에 따라 서비스를 제공하는 데에 활용됩니다.
계약 이행: 회사는 계약을 체결한 경우, 개인정보를 해당 계약의 이행에 필요한 범위 내에서 사용할 수 있습니다.
마케팅 및 광고: 회사는 개인정보를 마케팅 및 광고 활동에 활용할 수 있습니다. 이를 통해 회사는 사용자에게 관심 있는 상품 또는 서비스를 제공하고 맞춤형 광고를 전달할 수 있습니다.
고객 지원: 회사는 고객 지원 및 문의 응대를 위해 개인정보를 수집 및 이용할 수 있습니다.

2.수집하는 개인정보의 범위

회사는 다음과 같은 개인정보를 수집할 수 있습니다:
신상정보: 성명, 연락처, 이메일 주소 등
계정 정보: 아이디, 비밀번호 등
결제 정보: 신용카드 정보, 은행 계좌 정보 등
서비스 이용 기록: 서비스 사용 내역, 방문 일시 등

3.개인정보의 보유 및 이용 기간

회사는 개인정보를 수집한 목적이 달성되거나 회원의 동의 철회 시까지 개인정보를 보유 및 이용합니다. 단, 관련 법령에 따라 일정 기간 동안 보관해야 할 필요가 있는 경우에는 해당 기간 동안 개인정보를 보관할 수 있습니다.

4.개인정보의 제공 및 공유

회사는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다. 단, 다음과 같은 경우에는 예외적으로 개인정보를 제공할 수 있습니다:
회원의 동의가 있는 경우
법령에 의거하거나, 법적 절차에 따라 제공이 요구되는 경우

5.개인정보의 보호 조치

회사는 회원의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취하고 있습니다:
개인정보 암호화: 중요한 개인정보는 암호화하여 저장 및 관리됩니다.
접근 제한: 개인정보에 접근할 수 있는 권한을 가진 직원은 최소한으로 제한되며, 접근 권한은 업무 수행에 필요한 범위로 제한됩니다.
보안 프로토콜: 네트워크 트래픽을 암호화하고, 악성 코드에 대한 대응 조치 및 침입 탐지 시스템을 도입하여 개인정보를 보호합니다
</div>
      <Wrapper>
        <input
          type="checkbox"
          name="agree"
          onClick={handleAgree}
          value={agree}
        />
        결제 진행 필수 전체 동의
        
        <BtnWrapper>
        {agree ? (
                 payMethodId === 0 ? (
                  <Danal totalCost={totalCost.toLocaleString()}selectedItems={selectedItems}/>
                ) : (
                  <KakaoPay totalCost={totalCost.toLocaleString()}selectedItems={selectedItems}/>
                )
                ) : (
                  <button type="button" disabled>
                    결제하기
                  </button>
                )}
        </BtnWrapper>
      </Wrapper>
      </TableContainer>
    
      </ContentContainer>
        
          </Container>
      </>
  );
};export default OrderPage;