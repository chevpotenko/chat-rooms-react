import React from 'react';

export default function SignUp(props) {
    return (
        <div className="useraccount center">
            <h2 className="section-title">Sign Up</h2>
            <div className="useraccount-messages"></div>
            <form className="useraccount-form">
                    <div className="useraccount-row">
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" id="email" name="email" autoComplete="off"/>  
                    </div>
                    <div className="useraccount-row">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password"/>        
                    </div>
                    <div className="useraccount-row">
                        <button className="btn-submit">Sign</button>
                    </div>
            </form>
        </div>
    );
}