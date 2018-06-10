import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from "react-router-dom";
import axios from 'axios';

import {user} from '../../dummy-data/dummy-data';

import PageIndex from '../../components/page-index/page-index';
import PageSignIn from '../../components/page-sign-in/sign-in';
import PageSignUp from '../../components/page-sign-up/sign-up';
import MainMenu from '../../components/page-layout/main-menu';

class PageLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userState: [{
                id: 'login',
                value: user[0].value
            }]
        }
    }    
    
    componentWillMount() {
        console.log('componentWillMount')
    }
    
    componentDidMount() {
        console.log('componentDidMount')
    }

    shouldComponentUpdate() {
        console.log(' shouldComponentUpdate')
    }
    
    componentDidUpdate() {
        console.log('componentDidUpdate')
    }
    
    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    setUserState() {
        axios.get('/api/user/signin')
        .then(res => {            
            let user = [...this.state.userState];
            user[0].value = res.data.value;            
            this.setState({userState: user});
            console.log(this.state.userState);           
        });
    }

    render() {
        return (            
            <Router>
                <div className="wrapper">                
                    <MainMenu userState={this.state.userState}/>
                    <div className="content">                                                                
                        <Route path="/user/signin" component={PageSignIn}/>
                        <Route path="/user/signup" component={PageSignUp}/>
                        <Route exact path="/" render={() => <PageIndex user={this.state.userState} onSetUserState={this.setUserState.bind(this)}/>}/>                        
                    </div>
                </div>
            </Router>              
        );
    }   

}

export default PageLayout;