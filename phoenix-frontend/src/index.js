import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* Context Imports */
import { AuthContextProvider } from 'contexts/AuthContext';
import { ChatContextProvider } from 'contexts/ChatContext';
import { DataContextProvider } from 'contexts/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <AuthContextProvider>
            <ChatContextProvider>
                <DataContextProvider>
                    <App />
                </DataContextProvider>
            </ChatContextProvider>
        </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
