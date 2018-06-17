import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addRoom, deleteRoom  } from '../../actions/rooms-actions';
import AddForm from '../page-layout/add-form';

class Rooms extends React.Component {
    
    constructor(props){
        super(props);                       
    }

    selectRoom(id) {
        let currentRoom = this.props.rooms.find((room, index) => {             
            return room.id === id 
        });
        this.props.onSelectRoom(currentRoom);
    } 
    
    addRoom(value) {
        let newRoom = {
            id: this.props.rooms.length,
            name: value,
            todo: []
        }
        if(value){
            this.props.addRoom(newRoom);           
        }
        //axios.post('/api/rooms', room).then(res => {});
    }   

    deleteRoom(e, id) {
        e.stopPropagation();
        let updatedRooms = this.props.rooms.filter(room => room.id !== id);
        this.props.deleteRoom(updatedRooms);
        //axios.delete('/api/rooms/' + id).then(res => {});
    } 

    render() {                              

        let roomsItems = '';

        let roomsControl = this.props.user.isLogin ?
            <AddForm onAddItem={ (value) => {this.addRoom(value)} }/>
            : '';

        if (this.props.rooms) {            
            roomsItems = this.props.rooms.map((room, index) =>
                <li key={index} onClick={ () => this.selectRoom(room.id) }>
                    {room.name}
                    {
                        this.props.user.isLogin ? 
                            (<span className="btn-delete"
                                    onClick={ (e) => this.deleteRoom(e, room.id) }>x</span> 
                        ): ('')
                    }
                </li>)
        }

        return(
            <div className="column rooms">
                <h3>Rooms</h3>
                { roomsControl }                            
                <ul className="rooms-list">{ roomsItems }</ul>
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
        addRoom: (item) => {
            dispatch(addRoom(item))
        },      
        deleteRoom: (rooms) => {
            dispatch(deleteRoom(rooms))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);