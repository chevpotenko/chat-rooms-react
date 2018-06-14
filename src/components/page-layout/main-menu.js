import React from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';

class MainMenu extends React.Component {

    constructor(props){
        super(props);        
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
        );

        return (
            <nav className="nav">{ menu }</nav>        
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

export default connect(mapStateToProps)(MainMenu);