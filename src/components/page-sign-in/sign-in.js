import React from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router';


class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            err: '' 
        }
    }

    signIn(e) {
        e.preventDefault();      
        axios.post('/api/users/signin', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            <Redirect to="/"/>           
            window.location.href = '/';           
        })
        .catch( err => {
            let errMessage = '';
            if(err.response.data.message) {
                if(Array.isArray(err.response.data.message)){
                    errMessage = err.response.data.message.join(', ');
                }else{
                    errMessage = err.response.data.message;
                }
                this.setState({err: errMessage});
            } 
        });
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    changeEmail(e) {        
        this.setState({
            email: e.target.value
        });
    }

    render() {
        return (
            <div className="useraccount center">
                <h2 className="section-title">Sign In</h2>
                <div className="useraccount-messages">{ this.state.err }</div>
                <form className="useraccount-form">
                        <div className="useraccount-row">
                            <label htmlFor="email">E-mail:</label>
                            <input type="text"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    onChange={(e) => this.changeEmail(e)}/>  
                        </div>
                        <div className="useraccount-row">
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e) => this.changePassword(e)}/>        
                        </div>
                        <div className="useraccount-row">
                            <button className="btn-submit"
                                    onClick={e => this.signIn(e)}>Sign</button>
                        </div>
                </form>
            </div>     
        );
    }
}

export default SignIn;