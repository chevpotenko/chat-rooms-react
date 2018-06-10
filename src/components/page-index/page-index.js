import React from 'react';
import axios from 'axios';

import Users from './users';
import TodoList from './todo-list';
import Rooms from './rooms';

import { users as usersList } from '../../dummy-data/dummy-data';
import { rooms as roomsList } from '../../dummy-data/dummy-data';

class PageIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            rooms: roomsList,
            users: usersList,
            currentRoomId: 0
        }
    }

    componentWillMount() {
        this.getData();
        this.props.onSetUserState();
    }

    componentDidMount() {       
       
    }

    getData() {
        axios.get('/api/rooms')
        .then(res => {
            console.log(res)    
            this.setState({rooms: res.data});
        });
        axios.get('/api/users')
        .then(res => {
            console.log(res)    
            this.setState({users: res.data});
        });
    }


    selectRoom(roomId) {                
        this.setState({currentRoomId: roomId});
    }

    addRoom(room) {
        axios.post('/api/rooms', room)
        .then(res => {
            console.log('POST',res)    
            this.setState({
                rooms: [...this.state.rooms, room]
            });
        });
    }   

    deleteRoom(id) {
        axios.delete('/api/rooms/' + id)
        .then(res => {
            let rooms = this.state.rooms.filter(room => room.id !== id);
            this.setState({rooms: rooms});
        });
    }

    addTask(id, task) {
        let indexChangedRoom = null;
        let newRooms =  [...this.state.rooms];
        let changedRoom = newRooms.find((item, index) => {
            if(item.id === id) {
                indexChangedRoom = index;
                return true;
            }
            return false
        });
        newRooms[indexChangedRoom].todo.push(task);
        axios.put('/api/rooms/' + id, changedRoom)
        .then(res => {
            this.setState({rooms: newRooms});
        }); 
    }

    deleteTask(task, id) {        
        let indexChangedRoom = null;
        let newRooms =  [...this.state.rooms];
        let changedRoom = newRooms.find((item, index) => {
            if(item.id === id) {
                indexChangedRoom = index;
                return true;
            }
        });
        let updatedTasks = newRooms[indexChangedRoom].todo.filter((item) => {
            return item !== task
        });
        newRooms[indexChangedRoom].todo = updatedTasks;
        axios.put('/api/rooms/' + id, newRooms[indexChangedRoom])
        .then(res => {
            this.setState({rooms: newRooms});
        });        
    }

    render() {
        return ( 
            <div className="content-row">
                <Rooms roomsList={ this.state.rooms } 
                        user={ this.state.user }
                        onSelectRoom={ this.selectRoom.bind(this) }
                        onAddRoom={ this.addRoom.bind(this) }
                        onDeleteRoom={ this.deleteRoom.bind(this) }/>
                <TodoList roomsList={ this.state.rooms }
                            user={ this.state.user }
                            currentRoom={ this.state.currentRoomId }
                            onAddTask={ this.addTask.bind(this) }
                            onDeleteTask={ this.deleteTask.bind(this) }/>
                <Users usersList={ this.state.users }/>
            </div>
        );
    }   

}

export default PageIndex;