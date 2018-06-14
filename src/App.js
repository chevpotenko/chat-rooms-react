import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';

import { user } from './dummy-data/dummy-data';
import { setUser  } from './actions/user-actions';

import PageIndex from './components/page-index/page-index';
import PageSignIn from './components/page-sign-in/sign-in';
import PageSignUp from './components/page-sign-up/sign-up';
import MainMenu from './components/page-layout/main-menu';

class App extends Component {
    
    constructor(props) {
        super(props); 
    }
    
    componentDidMount() {
        // this.setUserState();         
        this.props.setUser(user.isLogin);
        console.log('componentDidMount');
    }   

    setUserState() {
        axios.get('/api/user/signin')
        .then(res => {});
    }

    render() {
        return (            
            <Router>
                <div className="wrapper">             
                    <MainMenu/>
                    <div className="content">                                                                
                        <Route path="/user/signin" component={ PageSignIn }/>
                        <Route path="/user/signup" component={ PageSignUp }/>
                        <Route exact path="/" component={ PageIndex }/>                        
                    </div>
                </div>
            </Router>              
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        setUser: (val) => {
            dispatch(setUser(val))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);