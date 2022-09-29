import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesDrawer = makeStyles((theme) => ({
            Drawer:{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    overflow: 'unset'
                },
                '@media(max-width:768px)':{
                    position:'absolute',

                }
            },
            AppBar: {

                background: '#fff !important',
                boxShadow: 'none'

            },
            containerCustomItemsMenu: {
                color:'#485C90',
                marginLeft: '17px',
                marginTop: '10px',
                maxWidth: '90%',
                padding: '0 !important',
                overflow: 'hidden',
            },
            customItemsMenuContent: {
                marginLeft: '30px',
                padding: '0 !important',
                maxHeight: '0',
                transition: 'max-height 0.5s ease',
            },
            showCustomItemsMenuContent: {
                maxHeight: '500px',
                opacity: '1',
                visibility: 'visible',
                transition: 'max-height 0.5s ease',
            },
            DrawerHeader: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '30px',
                marginBottom: '20px'
            },
            ListItem: {
                padding: '0 !important',
                background: '#fff',
                zIndex: '10',

                "&:hover": {
                    background: 'rgba(210,215,234,0.43)',

                },
            },
            ListItemText: {
                position: 'relative',
                zIndex: '10'
            }
        }
    )
);

export default useStylesDrawer;
