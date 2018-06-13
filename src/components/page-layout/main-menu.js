import React from 'react';
import { Redirect, Link } from "react-router-dom";

class MainMenu extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userState: this.props.userState
        }
    }

    render() {

        let menu = this.state.userState[0].value ? (
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
            <nav className="nav">{ menu }</nav>        
        );
    }
}

export default MainMenu;