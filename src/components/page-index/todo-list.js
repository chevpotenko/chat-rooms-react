import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateRoom } from '../../actions/rooms-actions';

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        }
    }

    setNewTask(e) {
        this.setState({
            newTask: e.target.value
        });
    }

   addTask(roomId) {
        let indexUpdatedRoom = null;
        let updatedRoom = this.props.rooms.find((item, index) => {            
            if (item.id === roomId) {
                indexUpdatedRoom = index;
                return true;
            }
        });
        let updatedRooms = [...this.props.rooms];
        updatedRooms[indexUpdatedRoom].todo.push(this.state.newTask);
        this.props.updateRoom(updatedRooms);
        // axios.put('/api/rooms/' + id, updatedRooms[indexUpdatedRoom]).then(res => {}); 
    }

    deleteTask(task, roomId) {        
        let indexUpdatedRoom = null;
        let updatedRoom = this.props.rooms.find((item, index) => {
            if(item.id === roomId) {
                indexUpdatedRoom = index;
                return true;
            }
        });
        let updatedTasks = this.props.rooms[indexUpdatedRoom].todo.filter((item) => {
            return item !== task
        });
        let updatedRooms = [...this.props.rooms];
        updatedRooms[indexUpdatedRoom].todo = updatedTasks; 
        this.props.updateRoom(updatedRooms);      
        // axios.put('/api/rooms/' + id, updatedRooms[indexUpdatedRoom]).then(res => {});        
    }

    render() {
        let currentRoomId = this.props.currentRoom;
        let currentRoom = null;
        let todoItems = '';
        let todoControls = '';

        if(this.props.rooms) { 
            currentRoom = this.props.rooms.find((item) => {
                return item.id == currentRoomId;
            });                       
        }
        
        if (currentRoom){
            todoItems = currentRoom.todo.map((todo, index) =>
                <li key={ index }>
                    { todo }                   
                    {
                        this.props.user.isLogin ? 
                            (<span className="btn-delete"
                                    onClick={ () => {this.deleteTask(todo, currentRoomId)} }>x</span> 
                        ): ('')
                    }                
                </li>
            )
        }

        if(this.props.user.isLogin) {
            todoControls = (    
                <div className="room-control">
                    <input type="text"
                            value={ this.state.newTask }
                            onChange={ (e) => this.setNewTask(e) }
                            className="room-newitem"
                            placeholder="Name"/>
                    <button className="room-add"
                            onClick={ () => this.addTask(currentRoomId) }>add</button>
                </div>
            )
        }

        return (
            <div className="column">
                <div className="todo">
                    <h3>Todo list</h3>
                    { todoControls }  
                    <ul className="todo-list">{ todoItems }</ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        rooms: state.roomsState.rooms,
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        updateRoom: (rooms) => {
            dispatch(updateRoom(rooms))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);