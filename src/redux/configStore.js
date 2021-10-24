import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import QuanLyKhoaHocReducer from './reducers/QuanLyKhoaHocReducer';
import QuanLyUserReducer from './reducers/QuanLyUserReducer';
import ToastReducer from './reducers/ToastReducer';
import LoadingReducer from './reducers/LoadingReducer';
import DrawerReducer from './reducers/DrawerReducer';

const rootReducer = combineReducers({
    //Reducers
    QuanLyKhoaHocReducer,
    QuanLyUserReducer,
    ToastReducer,
    LoadingReducer,
    DrawerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))