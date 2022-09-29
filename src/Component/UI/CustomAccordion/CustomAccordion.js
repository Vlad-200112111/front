import React from 'react';
import {styled} from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import useStylesMain from "../../../Styles/MainStyles";
import useStylesDocumentsStyles from "../../../Styles/DocumentsStyles";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: '#fff' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? '#fff'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function CustomAccordion({title, content}) {
    const classesMain = useStylesMain()
    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    return (
        <>
            <Accordion sx={{border: '1px solid #fff !important'}} expanded={expanded === 'panel'} onChange={handleChange('panel')}>
                <AccordionSummary>
                    <Typography className={classesMain.TextWhite}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{background: '#fff !important', border: '1px solid #485C90 !important'}}>
                    {content}
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default CustomAccordion;