import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App/App';
import { ContextProvider } from './context/Context';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <App /> 
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

