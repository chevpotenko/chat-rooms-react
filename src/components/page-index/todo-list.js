import React from 'react';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            newTask: ''
        }
    }

    setNewTask(e) {
        this.setState({
            newTask: e.target.value
        })
    }

    addTask(id) {       
        this.props.onAddTask(id, this.state.newTask)
    }

    deleteTask(task, id) {       
        this.props.onDeleteTask(task, id)
    }

    render() {
        let currentRoomId = this.props.currentRoom;
        let currentRoom = null;
        let todoItems = '';

        if(this.props.roomsList) { 
            currentRoom = this.props.roomsList.find((item) => {
                return item.id == currentRoomId;
            });                       
        }
        
        if (currentRoom){
            todoItems = currentRoom.todo.map((todo, index) =>
                <li key={ index }>
                    { todo }                   
                    {
                        this.state.user[0].value ? 
                            (<span className="btn-delete"
                                    onClick={ () => {this.deleteTask(todo, currentRoomId)} }>x</span> 
                        ): ('')
                    }                
                </li>
            )
        }

        return (
            <div className="column">
                <div className="todo">
                    <h3>Todo list</h3>
                        {
                            this.state.user[0].value ? (    
                                <div className="room-control">
                                    <input type="text"
                                            value={ this.state.newTask }
                                            onChange={ (e) => this.setNewTask(e) }
                                            className="room-newitem"
                                            placeholder="Name"/>
                                    <button className="room-add"
                                            onClick={ () => this.addTask(currentRoomId) }>add</button>
                                </div>
                            ) : ('')
                        }  
                    <ul className="todo-list">{ todoItems }</ul>
                </div>
            </div>
        );
    }
}

export default Users;