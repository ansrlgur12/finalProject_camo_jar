import React, { createContext, useState, useContext } from 'react';
export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  const addToFavorite = (product) => {
    // favorite에 상품을 추가
    setFavorite([...favorite, product]);
  };

  const isProductInFavorite = (product) => {
    // 이미 favorite에 해당 상품이 있는지 확인
    const existingProduct = favorite.find(item => item.id === product.id);

    // 이미 favorite에 해당 상품이 있다면 true를 반환
    if (existingProduct) {
      return true;
    }

    // favorite에 해당 상품이 없다면 false를 반환
    return false;
  };

  const removeFromFavorite = (favoriteItemId) => {
    setFavorite(prevFavorite =>
      prevFavorite.filter(item => item.id !== favoriteItemId) // 주어진 상품 ID와 일치하지 않는 상품들만을 남김
    );
  };

  return (
    <FavoriteContext.Provider value={{ setFavorite, favorite, addToFavorite, removeFromFavorite, isProductInFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );  
};

export const useFavorite = () => useContext(FavoriteContext);
export default FavoriteProvider;
