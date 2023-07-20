import { AddShoppingCart} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const CartButton = forwardRef((props, ref) => {
    
return(
<>
<IconButton  ref={ref}
      color="success"
      {...props}>
    <AddShoppingCart />
  </IconButton>
</>
);
}); export default CartButton