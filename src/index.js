import React from "react";
import ReactDOM from "react-dom";
import "@fontsource/roboto";
import "./index.css";
import { SnackbarProvider} from 'notistack';
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import AuthProvider from "./Providers/AuthProvider";
import reportWebVitals from "./reportWebVitals";
import theme from './Styles/Styles';
import {MuiThemeProvider} from "@material-ui/core";

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>

            <AuthProvider>

                <Router>
                    <SnackbarProvider maxSnack={3}
                                      hideIconVariant
                                      anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                      }}
                    >
                        <App/>
                    </SnackbarProvider>
                </Router>
            </AuthProvider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
