import './App.css';
import React, { Component } from 'react';
import Alert from 'react-s-alert-v3';
import 'react-s-alert-v3/dist/s-alert-default.css';
import 'react-s-alert-v3/dist/s-alert-css-effects/slide.css';
import AppHeader from "../common/header";
import Home from '../home/Home';
import NotFound from '../common/NotFound';
import {Route, Routes} from "react-router-dom";
import BookList from "../User/book/BookList";
import useToken from "../User/login/useToken";
import Login from "../User/login/Login";
import BorrowBook from "../User/book/BorrowBook";
import Profile from "../User/login/Profile";
import BorrowedBook from "../User/book/BorrowedBookList";

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
                            <Routes>
                                <Route exact path="/" element={<Home/>}/>
                                <Route exact path="/book" element={<BookList/>}/>
                                <Route exact path="/borrow/:id" element={<BorrowBook token={token} setToken={setToken}/>}/>
                                <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}/>
                                <Route exact path="/borrowed" element={<BorrowedBook token={token} setToken={setToken}/>}/>
                                <Route element={<NotFound/>}/>
                            </Routes>
                        )}
                </div>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }

export default App;
