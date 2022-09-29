import {Grid, Button} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
const CustomButton = (props) =>{
    const classesMain = useStylesMain()
    return(
        <Grid item>
            <Button
                variant="contained"
                size="medium"
                style={props.style}
                component={props.component}
                disabled={props.disabled}
                onClick={props.onClick}
                className={classesMain.button}>
                {props.name}
            </Button>
        </Grid>
    )
}
export default CustomButton