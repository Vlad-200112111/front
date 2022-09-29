import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useStylesMain from "../../../Styles/MainStyles";

const CustomDialog = ({open, setOpen, content, title, onConfirm, onCancel, children}) => {
    const classesMain = useStylesMain()
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={onCancel ? onCancel : handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
                {
                    children
                }
            </DialogContent>
            <DialogActions>
                <Button className={classesMain.button}
                        onClick={onCancel ? onCancel : () => setOpen(false)}>Отмена</Button>
                <Button className={classesMain.button} onClick={() => {
                    setOpen(false)
                    onConfirm()
                }}>
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default CustomDialog