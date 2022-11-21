import React, { Component } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

// Reference: exempli-gratia
// Edited by Xiao Lin

//When navigated to a link that is not part of the app, show a 404 not found indicator with a button to go back
class NotFound extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    404
                </h1>
                <div className="desc">
                    The Page you're looking for was not found.
                </div>
                <Link to="/"><button className="go-back-btn btn btn-primary" type="button">Go Back</button></Link>
            </div>
        );
    }
}

export default NotFound;