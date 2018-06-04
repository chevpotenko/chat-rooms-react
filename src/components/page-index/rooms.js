import React from 'react';

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
        let currentRoom = this.props.roomsList.find((room, index) => {             
            return room.id === id 
        });
        this.props.onSelectRoom(currentRoom.id);
    }
    
    addRoom(room) {
        let newRoom = {
            id: this.props.roomsList.length,
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

        let roomsItems = this.props.roomsList.map((room, index) =>
            <li key={index} onClick={ () => this.selectRoom(room.id) }>
                {room.name}
                {this.props.user[0].value ? 
                    <span className="btn-delete"
                            onClick={ (e) => this.deleteRoom(e, room.id) }>x</span> 
                    : ''
                }
            </li>
        );

        return(
            <div className="column rooms">
                <h3>Rooms</h3>
                {this.props.user[0].value ? (
                    <div className="room-control">
                        <input type="text"
                                className="room-newitem"
                                value={ this.state.newRoomName }
                                onChange={ (e) => this.setNewRoomName(e) }
                                placeholder="Name"/>
                        <button className="room-add"
                                onClick={ () => this.addRoom(this.newRoom) }>add</button>
                    </div>
                    ) : ('')
                }            
                <ul className="rooms-list">{ roomsItems }</ul>
            </div>
        );
    }
}

export default Rooms;