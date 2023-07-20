import ShopCategory from "./shoppingMenu";
import SliderContainer from "./shoppingSlide";
import { GridStlye } from "./shoppingMenu";
import Header from "../../main/header";
import { useState } from "react";



const ShopMain = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const handleCategoryChange = (category) => {
      setLoading(true); // 카테고리 변경 시 로딩 시작
      setSelectedCategory(category);
    };
  

    return(
        <>
        <Header/>
       
        <GridStlye>
       
        <ShopCategory onCategoryChange={handleCategoryChange} setLoading={setLoading} />
        <SliderContainer selectedCategory={selectedCategory}  setLoading={setLoading} loading={loading}/>
     
        </GridStlye>
       
        </>
    );
 

}; export default ShopMain;