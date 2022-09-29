import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesCourses = makeStyles((theme) => ({
            fileDragOver:{
                border: '2px solid #345196 !important'
            },
            controlPanel: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            cardForCourses: {
                position: 'relative',
                height: '100%'
            },
            cardContentForCourses: {
                marginBottom: '15%',
                height: '80%'
            },
            cardActions: {
                position: 'absolute',
                bottom: 0,
                width: '100%'
            }
        }
    )
);

export default useStylesCourses;
