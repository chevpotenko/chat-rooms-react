import React from 'react';

export default function Users(props) {
    
    const usersItems = props.usersList.map((user, index) =>
        <li key={index}>{user.email}</li>
    );

    return (
        <div className="column users">
            <h3>Users</h3>
            <ul>{ usersItems }</ul>
        </div>
    );
}