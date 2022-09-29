import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesOlympiads = makeStyles((theme) => ({
            card:{
                border:'1px solid rgba(0, 0, 0, 0.12)',
                height:'100%',
                position:'relative'
            },
            cardContent:{
                background:'#fff',
                borderRadius:'0',
                height:'45%',
                marginBottom:'15%'
            },
            button:{
                background:'rgb(90, 125, 205)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            },
            controlPanel:{
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
            },
            cardActions: {
                position: 'absolute',
                bottom: 0,
                width: '100%'
            },
            detailsImg:{
                '@media (max-width: 992px)':{
                    maxWidth:'100%',
                    objectFit:'cover'
                }
            }

        }
    )
);

export default useStylesOlympiads;
