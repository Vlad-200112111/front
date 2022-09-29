import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesElectiveDisciplines = makeStyles((theme) => ({
            card: {
                borderRadius: '0 !important',
                height: "auto",
                border: '1px solid rgba(0, 0, 0, 0.12)',
            },
            itemToggleButton: {
                width: '100%',
                '&.Mui-selected': {
                    color: '#ffffff !important',
                    background: 'rgb(90, 125, 205) !important',
                },
            }
        }
    )
);

export default useStylesElectiveDisciplines;
