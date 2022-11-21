import './App.css';
import React, { Component } from 'react';
import Alert from 'react-s-alert-v3';
import 'react-s-alert-v3/dist/s-alert-default.css';
import 'react-s-alert-v3/dist/s-alert-css-effects/slide.css';
import AppHeader from "../common/header";
import Home from '../home/Home';
import NotFound from '../common/NotFound';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import LoadingIndicator from "../common/LoadingIndicator";

// Edited by Xiao Lin
// Render the app, which has a header and a body
// Render the loading indicator if the app is in the loading stage
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }


        return (
            <div className="App">
                <div className="app-top-box">
                    <AppHeader/>
                </div>
                <div className="app-body">
                    <BrowserRouter>
                        <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                    </BrowserRouter>
                </div>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default App;
