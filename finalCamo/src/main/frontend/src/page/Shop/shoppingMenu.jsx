import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTent, faBed, faLightbulb, faKitchenSet, faChair, faBox, faScrewdriverWrench,faFireBurner, faFan, faCaravan} from '@fortawesome/free-solid-svg-icons';
import  styled from 'styled-components';
import React, {useState} from 'react';


export const GridStlye = styled.div`
  
    box-sizing: border-box;
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    padding-bottom: 70px;

     .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.6rem; 
    width:40vw;
    border: 1px solid #ccc;
    padding: 0.6rem;
    border-radius: 2px;
    margin-top: 6rem;
    margin-bottom:3rem;
  }
  
  .grid-item {
    border-radius: 4px;
    box-shadow: 1px 1px 1px #ccc;
    border: 1px solid #ccc;
    height: 11.5vh;
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid-item:hover{
    box-shadow: 0px 3px 1px rgba(46, 229, 157, 0.4);
  }
 

 


  .itemName{
    margin-top: 1.3rem;

  }
  @media screen and (max-width:768px) {
    .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.6rem; 
    width:86vw;
    border: 1px solid #ccc;
    padding: 0.6rem;
    border-radius: 2px;
    margin-top: 6rem;
    margin-bottom:3rem;
  }
  
  .grid-item {
    border-radius: 4px;
    box-shadow: 1px 1px 1px #ccc;
    border: 1px solid #ccc;
    height: 9vh;
    text-align: center;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .itemName{
  font-size: 0.5rem;
  margin-top: 0.6rem;
  }
  }
`
const Button = styled.div`
     width: 100%;
    height: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:#2D6247;
@media screen and (max-width:768px) {
  width: 14vw;

  
}
`;

const ShopCategory = ({ onCategoryChange,setLoading}) => {
  const [selectedItem, setSelectedItem] = useState(null);
 
    const items = [
        {icon: faTent, name: '텐트'},
        {icon: faBed, name: '취침장비'},
        {icon: faLightbulb, name: '라이트'},
        {icon: faKitchenSet, name: '키친'},
        {icon: faChair, name: '캠핑가구'},
        {icon: faBox, name: '수납용품'},
        {icon: faScrewdriverWrench, name: '공구'},
        {icon: faFireBurner, name: 'BBQ'},
        {icon: faFan, name: '계절용품'},
        {icon: faCaravan, name: 'RV용품'}
      ];
      const handleClick = (name) => { 
        setLoading(true);
        setSelectedItem(name);
        
        setTimeout(() => { 
         
         
          onCategoryChange(name.toLowerCase());
        }, 0); 
        
      }
  return (
    
    <div className="grid-container">
  {items.map((item, index) => {
          const isSelected = item.name === selectedItem;
          const style = isSelected ? { background: "#2D6247", color: "#fff" } : {};
        return (
          <div className="grid-item" key={index}>
            <Button style={style}  onClick={() => handleClick(item.name)}>
              <FontAwesomeIcon icon={item.icon} size='lg' />
              <div className='itemName'>{item.name}</div>
            </Button>
          </div>
        );
      })}
    </div>
  );
}; export default ShopCategory;