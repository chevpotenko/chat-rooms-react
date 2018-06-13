const usersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case 'INIT_USERS':            
            state = {
                users: action.payload
            }
            break;
        case 'ADD_USER':
            var updatedUsers = state.users.map((val) => {
                return val;
            });
            updatedUsers.push(action.payload);            
            state = {                
                users: updatedUsers
            }
            break;       
        default:
            break;
    }
    return state;
}
export default usersReducer;