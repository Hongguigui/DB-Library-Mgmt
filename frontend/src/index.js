import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { BrowserRouter as Router } from 'react-router-dom';

//Reference: exempli-gratia
//Edited by Xiao Lin

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

