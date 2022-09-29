import React, {useState, useEffect} from "react";
import useStylesMain from "../../../Styles/MainStyles";
import {
    AppBar,
    Button,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomFullScreenDialog = ({
                                    setOpenCustomFullScreenDialog,
                                    openCustomFullScreenDialog,
                                    titleCustomFullScreenDialog,
                                    fullScreenDialog,
                                    fullWidthScreenDialog,
                                    children,
                                    scrollType,
                                    maxWidth
                                }) => {

    const classesMain = useStylesMain()

    const closeCustomFullScreenDialogFunction = () => {
        setOpenCustomFullScreenDialog(false)
    }

    return (
        <div>
            <Dialog
                scroll={scrollType}
                maxWidth={maxWidth}
                fullWidth={fullWidthScreenDialog}
                fullScreen={fullScreenDialog}
                open={openCustomFullScreenDialog}
                onClose={closeCustomFullScreenDialogFunction}
                TransitionComponent={Transition}
            >
                <AppBar sx={{position: 'relative'}} className={classesMain.FullScreenDialog}>
                    <Toolbar>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {titleCustomFullScreenDialog}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeCustomFullScreenDialogFunction}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>
                        {/*<Button autoFocus color="inherit" onClick={closeCustomFullScreenDialogFunction}>*/}
                        {/*    save*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>
                    {children}
            </Dialog>
        </div>
    );
}

export default CustomFullScreenDialog;

