import {createStore, combineReducers, applyMiddleware} from 'redux';
import roomsReducer from './reducers/rooms-reducer';
import roomReducer from './reducers/room-reducer';
import usersReducer from './reducers/users-reducer';
import userReducer from './reducers/user-reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    roomsState: roomsReducer,
    roomState: roomReducer,
    usersState: usersReducer,
    userState: userReducer
}); 

export default createStore(reducers);