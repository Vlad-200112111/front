import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import CustomAlert from "../../UI/CustomAlert/CustomAlert";
import Button from "@mui/material/Button";
import useStylesMain from "../../../Styles/MainStyles";

function ItemToolbar({element, caption}) {
    const classesMain = useStylesMain()

    function copyElement() {

    }

    return (
        <Grid item>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={6}>
                    {element}
                </Grid>
                <Grid item xs={4}>
                    <Typography
                        display="block"
                        gutterBottom
                        style={{fontSize: 16, color: '#485C90', textAlign: 'center'}}>
                        {caption}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        style={{width: '100%'}}
                        className={classesMain.button}
                        onClick={copyElement}
                    >
                        Скопировать
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ItemToolbar;