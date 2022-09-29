import Chip from "@mui/material/Chip";
import useStylesMain from "../../../Styles/MainStyles";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const CustomTag = ({label,style, ...restProps}) =>{
    const classesMain = useStylesMain()

    return(
        <Chip
            deleteIcon={<HighlightOffIcon className={classesMain.TextWhite}/>}
            style={style?style:{
                margin:'2px',
                background:'rgb(90,125,205)',
                color:'#fff'}}
            label={label}
            variant="outlined"
            {...restProps}
        />
    )
}
export default CustomTag