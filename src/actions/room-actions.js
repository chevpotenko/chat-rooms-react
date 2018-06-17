export var currentRoom = (id) => {
    return {
        type: 'CURRENT_ROOM',
        payload: id
    }
}
