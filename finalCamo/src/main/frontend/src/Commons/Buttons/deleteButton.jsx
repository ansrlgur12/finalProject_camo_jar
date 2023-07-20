import {Delete} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { forwardRef } from 'react';


const DeleteButton = forwardRef((props, ref) => {
    
    return(
    <>
    <IconButton ref={ref}
          {...props}>
        <Delete/>
      </IconButton>
    </>
    );
    }); export default DeleteButton