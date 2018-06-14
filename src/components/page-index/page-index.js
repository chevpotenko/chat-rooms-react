import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Users from './users';
import TodoList from './todo-list';
import Rooms from './rooms';

import { rooms as roomsList } from '../../dummy-data/dummy-data';
import { initRooms  } from '../../actions/rooms-actions';

class PageIndex extends React.Component {

    constructor(props) {
        super(props);       
        this.state = {
            currentRoomId: 0
        };
    }

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

    selectRoom(room) {                
        this.setState({currentRoomId: room.id});
    } 

    render() {
        return ( 
            <div className="content-row">
                <Rooms onSelectRoom={ this.selectRoom.bind(this) }/>
                <TodoList currentRoom={ this.state.currentRoomId }/>
                <Users/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {       
        initRooms: (items) => {
            dispatch(initRooms(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageIndex);