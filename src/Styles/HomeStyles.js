import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesHome = makeStyles((theme) => ({
        TableMainTd: {
            padding: 10,
            background: 'rgb(90,125,205)',
            color: '#fff',
            textAlign: 'center'
        },
        TableTd: {
            padding: 10,
            background: '#fff',
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(90, 125, 207, 0.8)'
        },
        toggleButton: {
            borderRadius: '0 !important',
            fontSize: '0.8rem !important',
            width: '100%',
            border: '0.5px solid rgb(90,125,205) !important',
            '&.Mui-selected': {
                color: '#ffffff !important',
                background: 'rgb(90,125,205) !important',
            },
            '&.MuiToggleButton-root': {
                color: '#485C90',
            },
        },
        Rings:{
            position:'sticky',
            top:70,
            '@media(max-width:992px)':{
                position:'static'
            }
        }
    }
    )
);

export default useStylesHome;
