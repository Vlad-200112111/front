import React from 'react'
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useStylesMain from "../../../Styles/MainStyles";


const ClickAwayButton = (props) =>{
    const classesMain = useStylesMain()
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const styles = {
        width:'500%',
        position: 'absolute',
        top: 28,
        right: 0,
        zIndex: 50,
        border: '1px solid grey',
        p: 3,
        bgcolor: '#fff',
    };


    return(
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative'}}>
                <div style={{display:'flex', cursor:"pointer"}} onClick={handleClick}>
                    {props.title}
                </div>
                {open ? (
                    <Box sx={props?.style? props.style: styles}>
                        {props.children}
                    </Box>
                ) : null}
            </Box>
        </ClickAwayListener>
    )
}
export default ClickAwayButton