export var addRoom = (item) => {
    return {
        type: 'ADD_ROOM',
        payload: item
    };
}

export var deleteRoom = (items) => {
    return {
        type: 'DELETE_ROOM',
        payload: items
    }
}

export var updateRoom = (items) => {
    return {
        type: 'UPDATE_ROOM',
        payload: items
    }
}

export var initRooms = (items) => {
    return {
        type: 'INIT_ROOMS',
        payload: items
    }
}