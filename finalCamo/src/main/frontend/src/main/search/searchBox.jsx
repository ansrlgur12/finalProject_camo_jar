import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IconButton } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";



const SearchBox = () => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/search`);
  };

  return (
  
    <IconButton aria-label="search" onClick={onClickHandler}>
    <SearchRounded/>
</IconButton>
  );
};

export default SearchBox;
