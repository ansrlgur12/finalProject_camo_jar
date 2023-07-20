import { FavoriteBorder} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const FavoriteButtonBorder = forwardRef((props, ref) => {
return(
<>
<IconButton  ref={ref}
      color="error" 
      aria-label="favorite" 
      {...props}>
    <FavoriteBorder />
  </IconButton>
</>
);
}); export default FavoriteButtonBorder