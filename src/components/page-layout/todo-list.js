import React from 'react';
import { connect } from 'react-redux';
import { updateRoom } from '../../actions/rooms-actions';

class TodoList extends React.Component {

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

        return <ul className="todo-list">{ todoItems }</ul>;
    }
}

const mapStateToProps = (state) => {
    return {
        rooms: state.roomsState.rooms,
        currentRoomId: state.roomState.room,
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