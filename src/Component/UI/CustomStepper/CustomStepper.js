import {useState, useEffect} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useStylesMain from "../../../Styles/MainStyles";


const CustomStepper = (props) => {
    const classesMain = useStylesMain()
    const steps = props.listForStepper
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep}>
                {
                    steps?.map(item =>
                        <Step>
                            <StepLabel>{item}</StepLabel>
                        </Step>
                    )
                }
            </Stepper>

            <Box sx={{p: 4}}>
                {props.children}
                <br/>
                {props.contentStepper[activeStep]}
            </Box>

            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1, display:'none'}}
                >
                    Вернуться назад
                </Button>
                <Box sx={{flex: '1 1 auto'}}/>
                <Button
                    variant="contained"
                    size="medium"
                    className={classesMain.button}
                    disabled={props.activateNext || activeStep === steps.length - 1}
                    onClick={handleNext}>
                    Продолжить
                </Button>
            </Box>
        </Box>
    );
}
export default CustomStepper