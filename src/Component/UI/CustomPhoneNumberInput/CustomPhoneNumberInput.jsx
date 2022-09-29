import React, {useState, useEffect} from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import useStylesMain from "../../../Styles/MainStyles";
import {Grid} from "@material-ui/core";


function CustomPhoneNumberInput(props) {

    const classesMain = useStylesMain()
    const [value,setValue]=useState()


    const handleOnChange = (value)=>{
        setValue({
            phone:value
        })
        console.log(value)
    }


    useEffect(() => {
        setValue(props.value)
    }, [props.value]);


    return (
        <Grid style={{width: '100%'}} item xs={props.xs}>

            <MuiPhoneNumber
                style={{width:'100%', marginTop:'0'}}
                variant='filled'
                name={props.name}
                countryCodeEditable={false}
                label={props.label}
                disableDropdown={true}
                onlyCountries={['ru']}
                inputClass={classesMain.Input}
                value={value}
                defaultCountry={'ru'}
                onChange={handleOnChange}
                helperText={props.helperText}
            />
        </Grid>
    );
}

export default CustomPhoneNumberInput;