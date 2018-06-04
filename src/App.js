import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import {user} from './dummy-data/dummy-data';

import PageIndex from './components/page-index/page-index';
import PageSignIn from './components/page-sign-in/sign-in';
import PageSignUp from './components/page-sign-up/sign-up';

const userState = [{
    id: 'login',
    value: user[0].value
}];

class App extends Component {   

    render() {
        return (
            <Router>
                <div className="wrapper">                
                    <nav className="nav">                        
                        {userState[0].value ? (
                                <ul className="nav-list">
                                    <li><Link to="/">Home page</Link> | </li>                               
                                    <li><Link to="/user/logout">Log Out</Link></li>
                                </ul>   
                            ) : (
                                <ul className="nav-list">
                                    <li><Link to="/">Home page</Link> | </li>
                                    <li><Link to="/user/signup">Sign Up</Link> | </li>
                                    <li><Link to="/user/signin">Sign In</Link></li>
                                </ul>
                         )} 
                    </nav>
                    <div className="content">                
                        <Route exact path="/" component={ () => <PageIndex user={userState}/>} />
                        <Route path="/user/signin" component={PageSignIn} />
                        <Route path="/user/signup" component={PageSignUp} /> 
                    </div>                
                </div>
            </Router>
        );
    }
}

export default App;
