import React from 'react';

import Users from './users';
import TodoList from './todo-list';
import Rooms from './rooms';

import { users as usersList } from '../../dummy-data/dummy-data';
import { rooms as roomsList } from '../../dummy-data/dummy-data';

class PageIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: roomsList,
            users: usersList,
            currentRoomId: 0
        }
    }

    selectRoom(roomId) {        
        this.setState({currentRoomId: roomId});
    }

    addRoom(room) {
        this.setState(prevState => ({
            rooms: [...prevState.rooms, room]
        }));
    }

    deleteRoom(id) {       
        let rooms = this.state.rooms.filter(room => room.id !== id);
        this.setState({rooms: rooms});
    }    

    render() {
        return ( 
            <div className="content-row">
                <Rooms roomsList={ this.state.rooms } 
                        user={ this.props.user }
                        onSelectRoom={ this.selectRoom.bind(this) }
                        onAddRoom={ this.addRoom.bind(this) }
                        onDeleteRoom={ this.deleteRoom.bind(this) }/>
                <TodoList roomsList={ this.state.rooms }
                            user={ this.props.user }
                            currentRoom={ this.state.currentRoomId | 0 }/>
                <Users usersList={ this.state.users }/>
            </div>
        );
    }   

}

export default PageIndex;