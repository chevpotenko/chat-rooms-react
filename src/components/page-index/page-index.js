import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Users from './users';
import Todo from './todo';
import Rooms from './rooms';

import { rooms as roomsList } from '../../dummy-data/dummy-data';
import { initRooms  } from '../../actions/rooms-actions';

class PageIndex extends React.Component {

    componentDidMount() {
        this.props.initRooms(roomsList);       
        // this.getData();
    }

    getData() {
        axios.get('/api/rooms')
        .then(res => {
            console.log(res)    
            this.setState({rooms: res.data});
        });
    }

    render() {
        return ( 
            <div className="content-row">
                <Rooms/>
                <Todo currentRoom={ this.props.currentRoomId }/>
                <Users/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentRoomId: state.roomState.currentRoomId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        initRooms: (items) => {
            dispatch(initRooms(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageIndex);