import { Favorite} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const FavoriteButton = forwardRef((props, ref) => {
    
return(
<>
<IconButton  ref={ref}
      color="error"
      {...props}>
    <Favorite />
  </IconButton>
</>
);
}); export default FavoriteButton