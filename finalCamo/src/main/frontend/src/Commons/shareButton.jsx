import { Share} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const ShareButton = forwardRef((props, ref) => {
return(
<>
<IconButton  ref={ref}
      color="info"     
      {...props}>
    <Share />
  </IconButton>
</>
);
}); export default ShareButton