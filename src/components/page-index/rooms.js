import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addRoom } from '../../actions/rooms-actions';
import AddForm from '../page-layout/add-form';
import RoomsList from '../page-layout/rooms-list';

class Rooms extends React.Component {
      
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

    render() {
        return(
            <div className="column rooms">
                <h3>Rooms</h3>
                {this.props.user.isLogin ? <AddForm onAddItem={ (value) => {this.addRoom(value)} }/> : ''}                            
                <RoomsList/>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);