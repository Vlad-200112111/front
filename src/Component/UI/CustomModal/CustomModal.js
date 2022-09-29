import {Typography, Modal, Box,Grid, Button} from "@material-ui/core";
import useStylesMain from "../../../Styles/MainStyles";
import CloseIcon from '@mui/icons-material/Close';
import {Link} from "react-router-dom";
import Grow from "@mui/material/Grow";

const CustomModal = (props) =>{
    const classesMain = useStylesMain()
return(
    <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >

        <Box className={props.ModalClassName?props.ModalClassName:classesMain.Modal}>
            <CloseIcon onClick={props.handleClose} className={classesMain.ModalClose}/>

            <Grow in={props.open}
            >
            <form onSubmit={props.onSubmit}>
                {
                    props.title?
                        <Typography className={classesMain.Title} align='center' variant='h4'>{props.title}</Typography>
                    :''
                }

                <Grid   container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}>

                        {props.children}
                   </Grid>
                    <Grid   container
                            direction="row-reverse"
                            >
                        <Grid item xs={4} xl={2} md={2}>
                            {
                                props.link?
                                    <Link to={props.link}>
                                        <Button
                                            disabled={props.disabled?props.disabled:false}
                                            variant="contained"
                                            type={props.buttonType}
                                            onClick={props.buttonClick?props.buttonClick:()=>console.log('')}
                                            className={classesMain.button}
                                        >
                                            {props.button}
                                        </Button>
                                    </Link>
                                    :
                                    <>
                                        {
                                            props.button?

                                                <Button
                                                    disabled={props.disabled?props.disabled:false}
                                                    variant="contained"
                                                    type={props.buttonType}
                                                    onClick={props.buttonClick?props.buttonClick:()=>console.log('')}
                                                    className={classesMain.button}
                                                >
                                                    {props.button}
                                                </Button>
                                                :''
                                        }
                                    </>



                            }

                    </Grid>
                </Grid>

            </form>
            </Grow>

        </Box>
    </Modal>
)
}
export default CustomModal