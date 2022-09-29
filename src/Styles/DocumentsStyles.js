import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesDocumentsStyles = makeStyles((theme) => ({
            card: {
                borderRadius: '0 !important',
                border: '1px solid rgba(0, 0, 0, 0.12)',
            },
            hrLine: {
                marginLeft: 0,
                width: '90%',
                border: '1px solid rgba(0, 0, 0, 0.12)',
            },
            captionText: {
                color: '#485C90',
                fontSize: 14,
            },
            ModalClose: {
                position: 'absolute',
                right: 5,
                borderRadius: '50%',
                padding: '3px',
                width: '1.5em',
                height: '1.5em',
                transition: 'all 0.3s ease !important',
                top: 5,
                color: '#485C90 !important',
                cursor: 'pointer',
                "&:hover": {
                    background: '#dadada8f',
                }
            },
        ModalStyle:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            minWidth: '40rem',
            background: '#fff',
            boxShadow: 24,
            maxHeight:'800px',
            overflowY:'auto',
            padding: '40px',
            '@media(max-width:992px)': {
                maxHeight:'600px',
                minWidth: '90% !important',
                padding: '10px !important'
            },
            '@media(max-width:768px)': {
                maxHeight:'400px',
                minWidth: '90% !important',
                padding: '10px !important'
            },

        },
            overlineText: {
                color: '#485C90',
                letterSpacing: '0.08333em',
                fontSize: '1rem'
            }
        }
    )
);

export default useStylesDocumentsStyles;
