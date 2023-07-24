import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./font.css";
import MainPage from './main/mainPage';
import ShopMain from './page/Shop/shopMain';
import MapMain from './page/Map/mapMain';
import OjiNojiMapMain from './page/Map/ojinoji';
import WriteNewMarker from './page/Map/writeNewMarker';
import KakaoLogin from './API/KaKaoLogin';
import TestPage from './page/Map/testPage';
import CartProvider from './context/CartContext';
import MyPage from './page/MyPage/myPage';
import UserInfo from './page/MyPage/section/userInfo';
import Delete from './page/MyPage/section/delete';
import OrderList from './page/MyPage/section/orderProduct';
import Cart from './page/MyPage/section/cart';
import NewPassword from './page/MyPage/section/newPassword';
import UserEdit from './page/MyPage/section/userEdit';
import MarkerStore from './context/MarkerInfo';
import MyComments from './page/MyPage/section/myComments';
import ProductDetailForm from './page/Shop/productDetail';
import Intro from './main/intro';
import ChannelService from './util/ChannelService';
import ReviewCards from './page/Community/section/reviewCards';
import BuySellCards from './page/Community/section/buySellCards';
import ReviewDetail from './page/Community/section/reviewDetail';
import Community from './page/Community/community';
import MyReview from './page/MyPage/section/myReview';
import MyFavorite from './page/MyPage/section/myFavorite';
import SignUpPage from './main/login/signUp';
import Login from './main/login/login';
import UserStore from './API/UserInfo';
import FavoriteProvider from './context/FavoriteContext';
import WriteReviewPage from './page/Community/section/writeReviewPage';
import ModifiedReview from './page/Community/section/modifiedReview';
import Danal from './page/Shop/order/danal';
import ImageTest from './page/Map/ImageTest';
import OrderPage from './page/Shop/order/orderPage';
import { OrderProvider } from './context/OrderContext';
import KakaoPay from './page/Shop/order/kakaoPay';
import Search from './main/search/search';
import MyCamp from './page/MyPage/section/myCamp';
import MyOji from './page/MyPage/section/myOji';
import PayComplete from './page/Shop/order/PayComplete';
import MobileCart from './page/MyPage/section/mobileCart';
import MobileFavorite from './page/MyPage/section/mobileFavorite';
import styled from '@emotion/styled';
import FindAccount from './main/login/findAccount';

const AppFontStyle = styled.div`
font-family: 'Pretendard-Regular';
`;

function App() {

  ChannelService.boot({
    "pluginKey": "c9dca6c0-c10b-43ae-8b33-46985229621d",
    "memberId": "유저ID",
    "profile": {
      "name": "유저Name",
      "email": "유저Email",
      "id": "유저ID"
    }
  });

  return (
    <AppFontStyle>
    <div className="App">
      <UserStore>
        <MarkerStore>
          <OrderProvider>
          <FavoriteProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/intro' element={<Intro />} />
                <Route path='/findAccount' element={<FindAccount />} />
                <Route path='/shopMain' element={<ShopMain />} />
                <Route path='/mapMain' element={<MapMain />} />
                <Route path='/ojinoji' element={<OjiNojiMapMain />} />
                <Route path='/newMark' element={<WriteNewMarker />} />
                <Route path='/search' element={<Search />} />
                <Route path='/community' element={<Community />} />
                <Route path='/buySellCards' element={<BuySellCards />} />
                <Route path='/reviewCards' element={<ReviewCards />} />
                <Route path='/writeReviewPage' element={<WriteReviewPage />} />
                <Route path='/modifiedReview/:id' element={<ModifiedReview />} />
                <Route path="/reviewDetail/:id" element={<ReviewDetail />} />
                <Route path='/myReview' element={<MyReview />} />
                <Route path='/myCamp' element={<MyCamp />} />
                <Route path='/myOji' element={<MyOji />} />
                <Route path='/MyComments' element={<MyComments />} />
                <Route path='/myPage' element={<MyPage />} />
                <Route path='/userInfo' element={<UserInfo />} />
                <Route path="/UserInfo" element={<UserInfo />} />
                <Route path="/Delete" element={<Delete />} />
                <Route path="/OrderList" element={<OrderList />} />
                <Route path="/Cart" element={<Cart />} />
                <Route path="/NewPassword" element={<NewPassword />} />
                <Route path="/UserEdit" element={<UserEdit />} />
                <Route path='/productDetailForm/:id' element={<ProductDetailForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/kakaologin' element={<KakaoLogin />} />
                <Route path='/testPage' element={<TestPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/myFavorite' element={<MyFavorite />} />
                <Route path='/danal' element={<Danal />} />
                <Route path='/imageTest' element={<ImageTest />} />
                <Route path='/kakaoPay' element={<KakaoPay />} />
                <Route path='/payComplete' element={<PayComplete />} />

                <Route path='/orderpage' element={<OrderPage />} />
                <Route path='/mobileCart' element={<MobileCart />} />
                <Route path='/mobileFavorite' element={<MobileFavorite />} />
           
              </Routes>
            </Router>
          </CartProvider>
          </FavoriteProvider>
          </OrderProvider>
        </MarkerStore>
      </UserStore>
    </div>
    </AppFontStyle>
  );
}

export default App;
