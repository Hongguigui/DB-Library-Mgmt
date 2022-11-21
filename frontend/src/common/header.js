import React, { Component } from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';
import {THE_APP_NAME} from "../const";
import './header.css';
import book_logo from "../books-logo.png";

// Edited by Xiao Lin
// The header will show our logo and branding on the left, and show the tabs on the right
class AppHeader extends Component {
    render() {
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
}

export default AppHeader;