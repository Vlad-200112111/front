import {createTheme} from "@material-ui/core";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#004481',
        },
        secondary: {
            main: '#ff9845',
        },
        white: {
            main: '#ffffff',
        },
        text: {
            primary: '#004481',
            secondary: 'rgba(2,2,2,0.54)',
        },
    },
    spacing: 8,
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#395fb6',
                color: '#fff',
            },
        },

        MuiTab: {
// general overrides for your material tab component here
            root: {
                backgroundColor: '#255',
                '&$selected': {
                    backgroundColor: 'blue',
                }
            },
        },
        MuiInputBase: {
            input: {
                background: "rgb(255,255,255)",
                color: "rgb(0,0,0)"
            },
        },

        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },

            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition:
                    'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
    props: {
        MuiAppBar: {
            color: 'inherit',
        },
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: 'small',
        },
        MuiButton: {
            size: 'small',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'small',
        },
        MuiTooltip: {
            arrow: true,
        },
    },
})

export default theme;