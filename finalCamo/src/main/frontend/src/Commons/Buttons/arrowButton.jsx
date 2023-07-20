import {ArrowCircleRightOutlined} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const ArrowButton = forwardRef((props, ref) => {
    
    return(
    <>
    <IconButton ref={ref}
          {...props}>
        <ArrowCircleRightOutlined/>
      </IconButton>
    </>
    );
    }); export default ArrowButton