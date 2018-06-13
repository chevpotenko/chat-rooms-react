export var addRoom = (item) => {
    return {
        type: 'ADD_ROOM',
        payload: item
    };
}

export var deleteRoom = (item) => {
    return {
        type: 'DELETE_ROOM',
        payload: item
    }
}

export var updateRoom = (item) => {
    return {
        type: 'UPDATE_ROOM',
        payload: item
    }
}

export var initRooms = (items) => {
    return {
        type: 'INIT_ROOMS',
        payload: items
    }
}