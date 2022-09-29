import CustomSelect from "./ComponentForFormGenerator/CustomSelect/CustomSelect";
import CustomTextarea from "./ComponentForFormGenerator/CustomTextarea/CustomTextarea";
import CustomInput from "./ComponentForFormGenerator/CustomInput/CustomInput";
import CustomDesktopDatePicker from "../CustomDesktopDatePicker/CustomDesktopDatePicker";
import CustomPhoneNumberInput from "./ComponentForFormGenerator/CustomPhoneNumberInput/CustomPhoneNumberInput";
import CustomAutocomplete from "./ComponentForFormGenerator/CustomAutocomplete/CustomAutocomplete";


const CustomFormGenerator = ({
                                 fields,
                                 xs,
                                 typeId
                             }) => {


    const options = [];
    for (let i = 0; i < fields?.length; i++) {
        options.push(fields[i].type === 'select' ?
            <CustomSelect
                xs={xs}
                disabled={false}
                label={fields[i].name}
                name={fields[i].objName}
                value={fields[i].value}
                typeId={typeId}
            >

            </CustomSelect>

            : fields[i].type === 'input' ?
                <CustomInput
                    xs={xs}
                    disabled={false}
                    label={fields[i].name}
                    name={fields[i].objName}
                    value={fields[i].value}
                    type={'text'}/>

                : fields[i].type === 'textarea' ?
                    <CustomTextarea
                        xs={xs}
                        disabled={false}
                        label={fields[i].name}
                        name={fields[i].objName}
                        value={fields[i].value}/>

                    : fields[i].type === 'datetime' ?
                        <CustomDesktopDatePicker
                            value={fields[i].value? fields.value:new Date()}
                            name={fields[i].objName}
                            xs={xs}
                            label={fields[i].name}/>

                        : fields[i].type === 'phone' ?
                            <CustomPhoneNumberInput
                                name={fields[i].objName}
                                value={fields[i].value}
                                xs={xs}
                                label={fields[i].name}/>

                            : fields[i].type === 'email' ?
                                <CustomInput
                                    xs={xs}
                                    disabled={false}
                                    label={fields[i].name}
                                    name={fields[i].objName}
                                    value={fields[i].value}
                                    type={'email'}/>
                                : fields[i].type === 'autocomplite' ?
                                    <CustomAutocomplete
                                        xs={xs}
                                        disabled={false}
                                        label={fields[i].name}
                                        name={fields[i].objName}
                                        value={fields[i].value}
                                        typeId={typeId}>

                                    </CustomAutocomplete>
                                    : ''
        )
    }

    return (
        <>
            {options}
        </>
    )
}

export default CustomFormGenerator;