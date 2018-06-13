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

class App extends Component {
    
    constructor(props) {
        super(props); 
    }    
    
    componentWillMount() {     
        console.log('componentWillMount');
    }
    
    componentDidMount() {
        // this.setUserState();         
        this.props.setUser(user.isLogin);
        console.log('componentDidMount');
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }
    
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    setUserState() {
        axios.get('/api/user/signin')
        .then(res => {});
    }

    render() {
      
        let menu = this.props.user.isLogin ? (
            <ul className="nav-list">
                <li><Link to="/">Home page</Link> | </li>                               
                <li><a href="/user/logout">Log Out</a></li>
            </ul>   
        ) : (
            <ul className="nav-list">
                <li><Link to="/">Home page</Link> | </li>
                <li><Link to="/user/signup">Sign Up</Link> | </li>
                <li><Link to="/user/signin">Sign In</Link></li>
            </ul>
        )       

        return (            
            <Router>
                <div className="wrapper">             
                <nav className="nav">{ menu }</nav>
                    <div className="content">                                                                
                        <Route path="/user/signin" component={PageSignIn}/>
                        <Route path="/user/signup" component={PageSignUp}/>
                        <Route exact path="/" render={() => <PageIndex user={this.props.user}/>}/>                        
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