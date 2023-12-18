import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
        MuiFormControl: {
            defaultProps: {
                sx: {
                    height: "2.5rem",
                    lineHeight: "2.5rem"
                },
            },
        },
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: "13px",
                    top: "-5px"
                },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    fontSize: "13px",
                    height: "2.5rem",
                    // padding: 0
                }
            }
        },
        MuiMenuItem: {
            defaultProps: {
                sx: {
                    fontSize: "13px",
                }
            }
        },
    },
});