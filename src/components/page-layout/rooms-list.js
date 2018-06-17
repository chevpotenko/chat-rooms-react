import React from 'react';
import { connect } from 'react-redux';
import { currentRoom } from '../../actions/room-actions';
import { deleteRoom } from '../../actions/rooms-actions';

class RoomsList extends React.Component {

    selectRoom(id) {
        let currentRoom = this.props.rooms.find((room, index) => {             
            return room.id === id 
        });
        this.props.currentRoom(currentRoom.id);
    }

    deleteRoom(e, id) {
        e.stopPropagation();
        let updatedRooms = this.props.rooms.filter(room => room.id !== id);
        this.props.deleteRoom(updatedRooms);
        //axios.delete('/api/rooms/' + id).then(res => {});
    } 

    render() {
        let roomsItems = '';

        if (this.props.rooms) {            
            roomsItems = this.props.rooms.map((room, index) =>
                <li key={ index } onClick={ () => this.selectRoom(room.id) }>
                    { room.name }
                    {
                        this.props.user.isLogin ? 
                            (<span className="btn-delete"
                                    onClick={ (e) => this.deleteRoom(e, room.id) }>x</span> 
                        ): ('')
                    }
                </li>)
        }

        return this.props.rooms ? <ul className="rooms-list">{ roomsItems }</ul> : '';
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        rooms: state.roomsState.rooms,
        room: state.roomState.room,
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        deleteRoom: (rooms) => {
            dispatch(deleteRoom(rooms))
        },
        currentRoom: (id) => {
            dispatch(currentRoom(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);