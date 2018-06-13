export var addUser = (item) => {
    return {
        type: 'ADD_USER',
        payload: item
    }
}

export var initUsers = (items) => {
    return {
        type: 'INIT_USERS',
        payload: items
    }
}
