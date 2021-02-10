import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import LoginPage from './components/LoginPage';
import AppRouter from './router/AppRouter';

ReactDOM.render(<AppRouter />, document.getElementById('root'));