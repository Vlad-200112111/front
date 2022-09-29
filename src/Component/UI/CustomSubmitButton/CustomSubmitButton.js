import {Button, Grid} from "@mui/material";

import useStylesMain from "../../../Styles/MainStyles";

const CustomSubmitButton = (props) => {
    const classesMain = useStylesMain()

    return (
        <>
            <Grid item xs={props.xs}>
                <Button
                    className={props.className? props.className: classesMain.button}
                    variant="contained"
                    type="submit"
                >
                    {props.contentCustomButton}
                </Button>
            </Grid>
        </>
    )
}

export default CustomSubmitButton;