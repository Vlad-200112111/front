import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';

const CustomAlert = (props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true)
    }, [props.activeAlert]);

    return (
        <>
            <Box sx={{width: props.width}}>
                <Collapse in={open}>
                    <Alert severity={props.severity}
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       setOpen(false);
                                   }}
                               >
                                   <CloseIcon fontSize="inherit"/>
                               </IconButton>
                           }
                           sx={{mb: 2}}
                    >
                        <AlertTitle>{props.title}</AlertTitle>
                        {props.content}
                    </Alert>
                </Collapse>
            </Box>
        </>
    )
}
export default CustomAlert;