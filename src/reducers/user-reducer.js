const userReducer = (state = {user: { isLogin: false }}, action) => {
    switch (action.type) {
        case 'SET_USER':
            state = {
                user: { isLogin: action.payload }
            }
            break;        
        default:
            break;
    }
    return state;
}
export default userReducer;