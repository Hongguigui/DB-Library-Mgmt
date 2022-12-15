import './App.css';
import React, { Component } from 'react';
import Alert from 'react-s-alert-v3';
import 'react-s-alert-v3/dist/s-alert-default.css';
import 'react-s-alert-v3/dist/s-alert-css-effects/slide.css';
import AppHeader from "../common/header";
import Home from '../home/Home';
import NotFound from '../common/NotFound';
import {Route, Switch} from "react-router-dom";
import BookList from "../User/book/BookList";
import useToken from "../User/login/useToken";
import Login from "../User/login/Login";
import Profile from "../User/login/Profile"

// Edited by Xiao Lin
// Render the app, which has a header and a body
// Render the loading indicator if the app is in the loading stage
function App() {
  const { token, removeToken, setToken } = useToken();

        return (
            <div className="App">
                <div className="app-top-box">
                    <AppHeader token={removeToken}/>
                </div>
                <div className="app-body">
                    {!token && token!=="" &&token!== undefined?
                        <Login setToken={setToken} />
                        :(
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/book" component={BookList}/>
                                <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
                                <Route component={NotFound}/>
                            </Switch>
                        )}
                </div>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }

export default App;
