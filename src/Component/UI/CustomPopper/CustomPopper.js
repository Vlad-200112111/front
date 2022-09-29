import React, {useState} from 'react'
import {Button, Fade, Paper} from "@mui/material";
import {Grid, Typography, Box} from "@material-ui/core";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Popper from '@mui/material/Popper';
import useStylesMain from "../../../Styles/MainStyles";
import useStylesDrawer from "../../../Styles/DrawerStyles";
import {Link} from "react-router-dom";
import ListItemText from '@mui/material/ListItemText';

export default function CustomPopper(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const classesDrawer = useStylesDrawer()

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    return (
        <Box>
            <Popper style={{width: '300px', background: '#fff'}} open={open} anchorEl={anchorEl} placement={placement}
                    transition>
                {({TransitionProps}) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper style={{borderRadius: '0', border: '1px solid rgba(0, 0, 0, 0.12)'}}>
                            {
                                props.ItemList.content.map(contentItem =>
                                    <ListItem className={classesDrawer.ListItem} disablePadding>
                                        <ListItemButton component={Link} to={contentItem.link}>
                                            <ListItemText onClick={handleClick(props.Position)} primary={contentItem.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            }
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <ListItem className={classesDrawer.ListItem} onClick={handleClick(props.Position)} disablePadding>
                <ListItemButton>
                    {props.Name}
                </ListItemButton>
            </ListItem>

        </Box>
    );
}