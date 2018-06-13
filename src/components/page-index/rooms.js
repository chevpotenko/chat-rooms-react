import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addRoom, deleteRoom  } from '../../actions/rooms-actions';

class Rooms extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {           
            newRoomName: ''
        }                
    }  
   
    setNewRoomName(e) {
        this.setState({
            newRoomName: e.target.value
        });     
    }

    selectRoom(id) {
        let currentRoom = this.props.rooms.find((room, index) => {             
            return room.id === id 
        });
        this.props.onSelectRoom(currentRoom);
    } 
    
    _addRoom(room) {
        axios.post('/api/rooms', room)
        .then(res => {
            console.log('POST',res)    
            this.setState({
                rooms: [...this.state.rooms, room]
            });
        });
    }   

    _deleteRoom(id) {
        axios.delete('/api/rooms/' + id)
        .then(res => {
            let rooms = this.state.rooms.filter(room => room.id !== id);
            this.setState({rooms: rooms});
        });
    }

    
    addRoom(room) {
        let newRoom = {
            id: this.props.rooms.length,
            name: this.state.newRoomName,
            todo: []
        }
        if(this.state.newRoomName){
            this.props.onAddRoom(newRoom);           
        }
    }
    
    deleteRoom(e, id) {
        e.stopPropagation();
        this.props.onDeleteRoom(id);
    }

    render() {                              

        let roomsItems = '';
        let roomsControl= '';

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

        if(this.props.user.isLogin) {
            roomsControl = (
                <div className="room-control">
                    <input type="text"
                            className="room-newitem"
                            value={ this.state.newRoomName }
                            onChange={ (e) => this.setNewRoomName(e) }
                            placeholder="Name"/>
                    <button className="room-add"
                            onClick={ () => this.addRoom(this.newRoom) }>add</button>
                </div>
            )
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
        rooms: state.roomsState.rooms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {       
        addRoom: (item) => {
            dispatch(addRoom(item))
        },      
        deleteRoom: (item) => {
            dispatch(deleteRoom(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);