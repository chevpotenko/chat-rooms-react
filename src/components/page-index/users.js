import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { users as usersList } from '../../dummy-data/dummy-data';
import { initUsers  } from '../../actions/users-actions';

class Users extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.initUsers(usersList);
    }

    getData() {      
        axios.get('/api/users')
        .then(res => {
            this.props.initUsers(res.data);
        });
    }

    render() {
        const usersItems = this.props.users.map((user, index) =>
            <li key={index}>{user.email}</li>
        );
        return (
            <div className="column users">
                <h3>Users</h3>
                <ul>{ usersItems }</ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersState.users,
        user: state.usersState.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        initUsers: (items) => {
            dispatch(initUsers(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);