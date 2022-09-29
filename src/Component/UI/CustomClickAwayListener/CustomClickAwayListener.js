import React, {useState} from 'react';
import useStylesMain from "../../../Styles/MainStyles";
import Box from "@mui/material/Box";

function CustomClickAwayListener({setOpenCustomClickAwayListener, openCustomClickAwayListener, title, children}) {

    const styles = {
        width: '450px',
        height: '550px',
        right: '0',
        position: 'absolute',
        zIndex: 50,
        border: '1px solid grey',
        p: 3,
        bgcolor: '#fff',
    };

    function handleClick() {
        setOpenCustomClickAwayListener((prev) => !prev);
    }

    return (
        <div style={{position: "relative"}}>
            <div style={{display: 'flex', cursor: "pointer"}} onClick={handleClick}>
                {title}
            </div>
            {openCustomClickAwayListener ? (
                <Box sx={styles}>
                    {children}
                </Box>
            ) : ''}
        </div>
    );
}

export default CustomClickAwayListener;