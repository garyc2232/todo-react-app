import "./App.css";
import { Provider } from "react-redux";
import store from "./features/store";
import { ThemeProvider, createTheme } from "@mui/material";
import LandingPage from "./pages/LandingPage";
import React from "react";
import { Modal } from "./components/organisms/Modal";

function App() {
    const theme = createTheme();
    return (
        <React.StrictMode>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <LandingPage />
                    <Modal />
                </ThemeProvider>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
