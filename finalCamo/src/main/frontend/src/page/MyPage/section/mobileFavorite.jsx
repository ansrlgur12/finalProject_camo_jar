import React, { useState, useEffect,useContext } from 'react';
import { Table, Button } from 'antd';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FavoriteContext } from '../../../context/FavoriteContext';
import { useNavigate } from 'react-router-dom';
import AxiosApi from '../../../API/TestAxios';
import { UserContext } from '../../../API/UserInfo';
import EllipsisText from '../../../Commons/ellipsis';



const TableContainer = styled.div`
display: none;
margin-top: 10vh;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top:50px;
  .ant-checkbox-checked .ant-checkbox-inner {
  background-color:#2D6247;
  border-color: #2D6247; 
  
}
button.ant-btn{
    display: flex;
    justify-content: right;
    margin-top: 20px;
  background-color: #2D6247; 
   &:hover {
    background-color: #2D6247; 
      opacity: 0.7;
    }
}
.btnContainer{
    display: flex;
    justify-content: right;
}
.ant-table-thead > tr > th  {
  text-align: center;
  color: #fff;
    background: #2D6247; 
}

tbody {
  text-align: center;
}



@media screen and (max-width:768px) {
   display: block;
   .ant-table {
    
 font-size: 0.06rem;
}

}


`;







const MobileFavorite = ({fetchCartData}) => { 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); //현재 선택된 행의 key를 저장
  const { removeFromFavorite,setFavorite } = useContext(FavoriteContext); // cartContext사용
  const [data, setData] = useState([]);
  const { email } = useContext(UserContext);
  const nav = useNavigate();
  // 상태 정의
const [favoriteData, setFavoriteData] = useState([]);

// 서버로부터 데이터를 받아오는 함수
const fetchFavoriteData = async() =>{
    const response = await AxiosApi.favoriteList(email);
    if (response.status === 200) {
        setFavoriteData(response.data);
        setFavorite(response.data);
    }
}

useEffect(() => {
  fetchFavoriteData();
}, []); // 의존성 배열에 아무것도 넣지 않으면 컴포넌트가 마운트될 때만 실행

  const handleMoveToCart = async(favoriteItemId) => {
    try {
      console.log(email,favoriteItemId);
      const response = await AxiosApi.favoriteMoveToCart(favoriteItemId, email);
      if (response.status === 200) {
        removeFromFavorite(favoriteItemId);
        fetchFavoriteData();
        fetchCartData();
      } else {
        console.log('삭제에 실패하였습니다.'); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromFavorite = async (favoriteItemId) => {
    try {
      console.log(email,favoriteItemId);
      const response = await AxiosApi.favoriteDelete(favoriteItemId, email);
      if (response.status === 200) {
        removeFromFavorite(favoriteItemId);
        fetchFavoriteData();
      } else {
        console.log('삭제에 실패하였습니다.'); 
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const newData = favoriteData.map((item) => ({
      
      key: item.favoriteItemId, 
      id: item.favoriteItemId,
      productId: item.productId,
      productName: item.productName,
      imageUrl: item.imageUrl ,
      paymentAmount:new Intl.NumberFormat('ko-KR').format(item.price) + "원",
  
      
    }));

    setData(newData);
  }, [favoriteData]);
  const columns = [
    {
      title: '상품',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => <img onClick={() => nav(`/ProductDetailForm/${record.productId}`)} src={record.imageUrl} alt={record.imageUrl} style={{ width: '11.5vw', height: 'auto', border:'1px solid #ccc', borderRadius:'8px'}} />
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
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
    },
    {
      title: '삭제',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => ( // 이 함수가 IconButton을 반환
      <IconButton aria-label="delete" onClick={() => handleRemoveFromFavorite(record.key)}>
        <Delete/>
      </IconButton>
    )
    },
  ];



  

  const rowSelection = { //선택항목 제어 및 상태관리
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
     
    },
    
  };
 
 

  return (
    <>
       
        
          <TableContainer style={{ width: '80vw', overflowX: 'auto' }}>
           <h2> 찜목록</h2>
            <Table  rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data} 
                    tableLayout="fixed"/>
                    <div className="btnContainer">
                    <Button type="primary" className='btn' onClick={() => {
    selectedRowKeys.forEach(key => {
        handleMoveToCart(key);
    });
}}>
                장바구니 추가
              </Button>
              </div>
          </TableContainer>
        
      
    </>
  );
};

export default MobileFavorite;
