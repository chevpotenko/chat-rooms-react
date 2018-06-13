const roomsReducer = (state = {rooms: []}, action) => {
    switch (action.type) {
        case 'INIT_ROOMS':            
            state = {
                rooms: action.payload
            }
            break;
        case 'ADD_ROOM':
            var updatedRooms = state.rooms.map((val) => {
                return val;
            });
            updatedRooms.push(action.payload);            
            state = {                
                rooms: updatedRooms
            }
            break;
        case 'DELETE_ROOM':
            var updatedRooms = state.rooms.filter(function(val) {
                return action.payload !== val;
            });
            state = {                
                rooms: updatedRooms
            }
            break;
        default:
            break;
    }
    return state;
}
export default roomsReducer;