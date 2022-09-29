import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesCalendarStudySchedule = makeStyles((theme) => ({
            calendar:{
                maxWidth: '100vw',
                overflowX: 'auto',
                '@media(max-width:2300px)': {
                    maxWidth:'70vw'
                },
                '@media(max-width:1700px)': {
                    maxWidth:'50vw'
                },
                '@media(max-width:1280px)': {
                    maxWidth:'40vw'
                }
            }
        }
    )
);

export default useStylesCalendarStudySchedule;
