import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Create a root for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with the provider
root.render(
  <Provider store={store}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
  </Provider>
);
