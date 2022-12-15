import React, { Component } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import {THE_APP_NAME} from "../const";
import './header.css';
import book_logo from "../books-logo.png";
import axios from "axios";

// Edited by Xiao Lin
// The header will show our logo and branding on the left, and show the tabs on the right
function AppHeader(props) {

  function logMeOut() {
    axios({
      method: "POST",
      url:"http://localhost:5000/logout",
    })
    .then((response) => {
       props.token()
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    return (
            <header className="App-header">
                <div className="App-header-left">
                    <img src={book_logo} className="Project-logo" alt="project_dove_logo" width={100} length={100}/>
                    <div className="app-branding">
                        <Link to="/" className="app-title">{THE_APP_NAME}</Link>
                    </div>
                </div>
                <div className="App-header-right">
                    <div className="app-options">
                        <nav className="app-nav">
                            <ul>
                                <li>
                                    <NavLink to="/book">Book List</NavLink>
                                </li>
                                <li>
                                    <button onClick={logMeOut}>Logout</button>
                                </li>
                                <li>
                                    <a
                                        className="App-link"
                                        href="https://github.com/Hongguigui/DB-Library-Mgmt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
}

export default AppHeader;