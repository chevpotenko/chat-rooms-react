import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateRoom } from '../../actions/rooms-actions';

import AddForm from '../page-layout/add-form';

class TodoList extends React.Component {

   addTask(task, roomId) {
        let indexUpdatedRoom = null;
        let updatedRoom = this.props.rooms.find((item, index) => {            
            if (item.id === roomId) {
                indexUpdatedRoom = index;
                return true;
            }
        });
        let updatedRooms = [...this.props.rooms];
        updatedRooms[indexUpdatedRoom].todo.push(task);
        this.props.updateRoom(updatedRooms);
        // axios.put('/api/rooms/' + id, updatedRooms[indexUpdatedRoom]).then(res => {}); 
    }    

    render() {                       
        let todoControls = this.props.user.isLogin ?
            <AddForm onAddItem={ (value) => {this.addTask(value, this.props.currentRoomId)} }/>
            : '';
 
        return (
            <div className="column">
                <div className="todo">
                    <h3>Todo list</h3>
                    { todoControls }  
                    <TodoList/>
                </div>
            </div>
        );
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