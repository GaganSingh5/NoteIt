import {
    createRoot
} from 'react-dom/client';
import React from "react";
import App from './App';
import {
    BrowserRouter
} from "react-router-dom";
import { AuthProvider } from './Context/AuthProvider';


const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <AuthProvider>
            < App / >
        </AuthProvider>
    </BrowserRouter>
    // </React.StrictMode>
);

