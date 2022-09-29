import {useState} from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import useStylesMain from "../../../Styles/MainStyles";


const CustomToggleButton = ({alignment,handleChange,listToggleButton, ...restProps}) => {
    const classesMain = useStylesMain()

    return(
        <>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
                {...restProps}
            >
                {
                    listToggleButton?.map(itemToggleButton =>
                        <ToggleButton
                            className={classesMain.toggleButton}
                            value={itemToggleButton.value}>
                            {itemToggleButton.label}
                        </ToggleButton>
                    )
                }
            </ToggleButtonGroup>
        </>
    )
}

export default CustomToggleButton