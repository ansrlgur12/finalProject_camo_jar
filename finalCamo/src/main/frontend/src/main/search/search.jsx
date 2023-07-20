import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../header";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input, message } from 'antd';
import 검색1header from '../../images/검색1header.jpg';
import ReviewApi from '../../API/ReviewAPI';

const SearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  height: 100vh;

  .title {
    font-size: 2rem;
    margin-top: 20px;
  }

  .searchCategory { 
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    width: 100%;
    border-bottom: 1px solid #000;
  }

  .category {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 10px;
    transition: all 0.3s;
  }

  .category:hover {
    background-color: #f1f1f1;
  }

  .selected {
    color: #2E2E2E;
    font-weight: bold;
  }

  .noSelected {
    display: none;
  }

  .searchInput {
    margin-top: 20px;
    width: 28.7vw;
    font-size: 1.5rem;
    padding: 0.625rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    @media screen and (max-width:768px) {
      width:65vw;
    }
  }

  .searchResult {
    margin-top: 20px;
    width: 28.7vw;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    @media screen and (max-width:768px) {
      width:80vw;
    }
  }

  .list {
    padding: 0.625rem;
    overflow-y: auto;
    max-height: 46.5vh;
  }

  .list p {
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .list p:hover {
    color: #2D6247;
  }
`;

const { Search } = Input;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query'));
  const [isSearched, setIsSearched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === 'category1') {
      navigate('/mapmain');
    } else {
      setSelectedCategory(category);
    }
  };

  const onClickSearch = async () => {
    if (!searchValue.trim()) {
      message.error('검색어를 입력해주세요.');
      return;
    }

    try {
      let response;
      if (selectedCategory === 'category1') { 
        response = await ReviewApi.searchCamps(searchValue);
      } else if (selectedCategory === 'category3') { 
        response = await ReviewApi.searchProducts('brand', searchValue);
      } else {
        response = await ReviewApi.searchReviews(searchValue);
      }
      const results = response.data;
      setSearchResults(results);
      setIsSearched(true);
    } catch (error) {
      console.error("검색중 에러:", error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      onClickSearch();
    }
  }, []);

  const navigateToReviewDetail = (reviewId) => {
    navigate(`/reviewDetail/${reviewId}`);
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/ProductDetailForm/${productId}`);
  };

  const navigateToCampDetail = (campId) => { 
    navigate(`/campDetail/${campId}`);
  };

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Header />
      <img
        src={검색1header}
        alt="대표이미지"
        style={{ width: '100%', height: '270px', objectFit: 'cover' }}
      />
      <SearchStyle>
        <div className="totalContainer">
          <div className="title">
            <h3>통합검색</h3>
          </div>
          <div className={isSearched ? 'searchResult' : 'noSearched'}>
            <div className="searchCategory">
              <p className={`category ${selectedCategory === 'category1' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category1')}>캠핑장</p>
              <p className={`category ${selectedCategory === 'category2' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category2')}>캠핑정보</p>
              <p className={`category ${selectedCategory === 'category3' ? 'selected' : ''}`} onClick={() => handleCategoryClick('category3')}>쇼핑</p>
            </div>
            <Search
              className="searchInput"
              placeholder="상단에 카테고리 선택후 검색어를 입력해주세요.."
              value={searchValue}
              onChange={handleSearchInput}
              onSearch={onClickSearch}
              enterButton
            />
            <div className={selectedCategory === 'category1' ?  "list" : 'noSelected'}>
              <hr />
              {searchResults.map((result) => (
                <p key={result.id} onClick={() => navigateToCampDetail(result.id)}>{result.facltNm}</p>
              ))}
            </div>
            <div className={selectedCategory === 'category2' ?  "list" : 'noSelected'}>
              <hr />
              {searchResults.map((result) => (
                <p key={result.id} onClick={() => navigateToReviewDetail(result.id)}>{result.title}</p>
              ))}
            </div>
            <div className={selectedCategory === 'category3' ?  "list" : 'noSelected'}>
              <hr />
              {searchResults.map((result) => (
                <p key={result.id} onClick={() => navigateToProductDetail(result.id)}>{result.productName}</p>
              ))}
            </div>
          </div>
        </div>
      </SearchStyle>
    </>
  );
};

export default SearchPage;
