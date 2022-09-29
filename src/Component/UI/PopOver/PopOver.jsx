import React, {useState} from 'react'
import {Button, Fade, Paper} from "@mui/material";
import {Grid, Typography} from "@material-ui/core";
import Popper from '@mui/material/Popper';
import useStylesMain from "../../../Styles/MainStyles";
function PopOver({description, content, black}){
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const classesMain = useStylesMain()
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const handleClose = () =>{
        setAnchorEl(null)
        setPlacement(null)
        setOpen(null)
    }
    return(
        <span>
            <Popper style={{ padding:'10px', width:'500px', zIndex:'10000'}} open={open?open:false} anchorEl={anchorEl} placement={placement} transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper >
                            <Typography  className={classesMain.backgroundMain} >{description}</Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
                <Button

                    style={{
                        minWidth:'25px',
                        padding:'0',
                        textDecoration:'underline',
                        color:black? '#000': '#fff',
                        textTransform: 'capitalize'
                }}
                    onMouseLeave={handleClose}
                    onMouseEnter={handleClick('right')}
                >

                        {content}

                </Button>
        </span>
    )
}
export default PopOver;