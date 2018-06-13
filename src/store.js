import {createStore, combineReducers, applyMiddleware} from 'redux';
import roomsReducer from './reducers/rooms-reducer';
import usersReducer from './reducers/users-reducer';
import userReducer from './reducers/user-reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    roomsState: roomsReducer,
    usersState: usersReducer,
    userState: userReducer
}); 

export default createStore(reducers);