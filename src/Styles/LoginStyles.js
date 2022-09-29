import React from 'react'
import {makeStyles} from "@material-ui/core";



const useStylesForLogin = makeStyles((theme) => ({
            root: {
                padding: theme.spacing(3),
            },
            buttonSpacing: {
                marginLeft: theme.spacing(1),
            },
            formAuthorization: {
                background: '#fff',
                border: '#878787 1px solid',
                boxShadow: '-5px -5px 8px rgba(0, 0, 0, 0.25)',
                backdropFilter: 'blur(25px)',
                padding: '60px',
            },
            logo: {
                margin: 20,
                height: 200,
                width: 130,
                marginLeft: "auto",
                marginRight: "auto"
            },
            iconButton: {
                color: '#5A7DCF'
            },

        }
    )
);

export default useStylesForLogin
