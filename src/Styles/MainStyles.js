import React from 'react'
import {makeStyles} from "@material-ui/core";


const useStylesMain = makeStyles((theme) => ({
        root: {
            color: '#004481'
        },
        button: {
            background: '#5A7DCF !important',
            borderRadius: '0 !important',
            color: '#fff !important',
            "&:hover": {
                background: '#3f67c0 !important',
            },
            cursor: 'pointer',
            marginTop: '10px !important',
            padding: '10px !important'
        },
        SecondButton: {
            background: 'rgb(255 152 69)',
            borderRadius: '0',
            color: '#fff !important',
            "&:hover": {
                background: 'rgb(245,121,58) !important',
            },
            cursor: 'pointer',
            marginTop: '10px !important',
            marginRight: '10px !important'
        },
        PhoneNumberDropDown: {
            color: '#000 !important',
            background: 'red'
        },
        Title: {
            color: '#485C90',
            fontWeight: 400,
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2.5rem !important',
            lineHeight: '91.02%',
            padding: '20px 0 50px 0'
        },
        backgroundMain: {
            padding: '1rem',
            background: '#fff',
            '@media(max-width:480px)': {
                padding: '0'
            }
        },
        Select: {


            '& .MuiInput-underline:after': {
                borderBottomColor: '#fff',
            },
            background: '#fff !important',
            color: '#000',
            padding: '0 !important'

        },
        Input: {
            background: '#fff !important',
            color: '#000',
            "& div": {
                background: '#fff !important'

            }
        },
        Accordion: {
            background: ''
        },
        SelectItems: {
            color: '#000 !important'
        },
        TabsItems: {
            color: '#5A7DCF !important',
            background: '#fff !important',

        },
        TabsItemsMobile: {
            '@media(max-width:480px)': {
                padding: '0 !important'
            }
        },
        TabsPanelMobile: {
            '@media(max-width:480px)': {
                padding: '35px 0 !important'
            }
        },


        TabActive: {
            // background: 'rgba(33, 50, 89, 0.6)'
        },
        TabItemText: {
            fontSize: '20px !important',
            color: '#485C90 !important',
            '@media(max-width:480px)': {
                fontSize: '0.8rem !important'
            }
        },
        TableContainer: {
            bottom: '30px',
            border: '3px solid transparent'
        },
        Text: {
            color: '#485C90 !important',
            // textAlign: 'center',
        },
        TextWhite: {
            color: '#fff !important'
        },
        TableHead: {
            border: 'solid 3px transparent'

        },
        TableCell: {
            border: '8px solid #fff',
            background: 'rgb(90, 125, 206) !important',
            color: '#fff !important',
            padding: '15px !important'
        },
        TableRow: {
            height: '60px',
            border: '3px solid transparent'
        },
        BoxForTabList: {
            color: '#fff',
            padding: '0 24px'
        },
        footer: {
            width: '100%',
            background: 'rgba(90, 125, 207, 0.8)',
            boxShadow: '-5px -5px 8px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(25px)',
        },
        textFooter: {
            color: "#ffffff",
            alignItems: "center",
            display: "flex",

        },
        IconForDocument: {
            background: 'rgb(255 152 69)',
            borderRadius: '0',
            color: '#fff',
            padding: '2px',
            margin: '2px',
            cursor: 'pointer',
        },
        MainBox: {
            width: '100%',
            padding: '25px',
            background: 'rgb(90, 125, 205)',
            color: '#fff'
        },
        Modal: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            minWidth: '40rem',
            background: '#fff',
            boxShadow: 24,
            padding: '40px',
            '@media(max-width:992px)': {
                minWidth: '90% !important',
                padding: '10px !important'
            }
        },
        ModalClose: {
            position: 'absolute',
            right: 15,
            borderRadius: '50%',
            padding: '3px',
            width: '1.5em',
            height: '1.5em',
            transition: 'all 0.3s ease !important',
            top: 15,
            color: '#485C90 !important',
            cursor: 'pointer',
            "&:hover": {
                background: '#dadada8f',
            }
        },
        radio: {
            color: 'rgba(0, 0, 0, 0.6)',
        },
        toggleButton: {
            borderRadius: '0 !important',
            fontSize: '0.8rem !important',
            width: '100%',
            border: '0.5px solid #485C90 !important',
            '&.Mui-selected': {
                color: '#ffffff !important',
                background: 'rgb(90, 125, 205) !important',
            },
            '&.MuiToggleButton-root': {
                color: '#485C90',
            },
        },
        buttonFontSizeMobile: {
            '@media(max-width:480px)': {
                fontSize: '0.5rem !important'
            }
        },
        card: {
            width: '100%',
            borderRadius: '0 !important',
        },
        cardContent: {
            border: '1px solid rgba(0, 0, 0, 0.12)',
            background: '#fff',
            borderRadius: '0'
        },
        TableMainTd: {
            padding: 10,
            background: 'rgba(90, 125, 207, 0.8)',
            color: '#fff',
            textAlign: 'center'
        },
        TableTd: {
            padding: 10,
            background: '#fff',
            color: 'rgba(0, 0, 0, 0.87)',
            border: '1px solid rgba(90, 125, 207, 0.8)'
        },
        cardFirstLine: {
            display: "flex",
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        titleForCard: {
            fontWeight: '600'
        },
        blueBackgroud: {
            background: 'rgb(90, 125, 205)'
        },
        ButtonGroup: {
            border: '0',
            borderRadius: '0 !important'
        },
        ButtonGroupItem: {
            background: '#5A7DCF !important',
            border: '1px solid #fff !important',
            color: '#fff !important',
            borderRadius: '0 !important'
        },
        FullScreenDialog: {
            background: '#5A7DCF !important',
        }
    })
);

export default useStylesMain;
