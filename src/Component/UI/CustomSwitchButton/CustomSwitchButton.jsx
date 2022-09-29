import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const CustomSwitchButton = ({label, defaultChecked, checked, onChange, restProps})=>{
    return(
        <FormControlLabel checked={checked} onChange={onChange} {...restProps} control={<Switch defaultChecked={defaultChecked} />} label={label} />
    )
}
export default CustomSwitchButton