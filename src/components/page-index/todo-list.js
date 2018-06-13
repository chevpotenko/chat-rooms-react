import React from 'react';
import axios from 'axios';

class Users extends React.Component {

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

    addTask(id) {       
        this.props.onAddTask(id, this.state.newTask);
    }

    deleteTask(task, id) {       
        this.props.onDeleteTask(task, id);
    }

    _addTask(id, task) {
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

    _deleteTask(task, id) {        
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

export default Users;