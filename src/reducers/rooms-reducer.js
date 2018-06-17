const roomsReducer = (state = {rooms: []}, action) => {
    switch (action.type) {
        case 'INIT_ROOMS':            
            state = {
                rooms: action.payload
            }
            break;
        case 'ADD_ROOM':
            var updatedRooms = [...state.rooms];
            updatedRooms.push(action.payload);            
            state = {                
                rooms: updatedRooms
            }
            break;
        case 'DELETE_ROOM':
            state = {                
                rooms: action.payload
            }
            break;
        case 'UPDATE_ROOM':
            state = {                
                rooms: action.payload
            }
            break;
        default:
            break;
    }
    return state;
}
export default roomsReducer;