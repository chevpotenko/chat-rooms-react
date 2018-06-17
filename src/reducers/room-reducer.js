const roomReducer = (state = {currentRoomId: 0}, action) => {
    switch (action.type) {
        case 'CURRENT_ROOM':            
            state = {
                currentRoomId: action.payload
            }
            break;
        default:
            break;
    }
    return state;
}
export default roomReducer;