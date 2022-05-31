import { TOKEN } from "../../util/Setting/config";
import { CLEAR_USER_INFO, LOG_IN, SET_INFO_USER, SET_LIST_USER, SET_LIST_USER_TYPE } from "../types/QuanLyUserType"

const stateDefault = {
    isAuthen: localStorage.getItem(TOKEN) ? true : false,
    infoUser: {},
    listUser: [],
    listUserType: [],
}

const QuanLyUserReducer = (state = stateDefault, action) => {
    switch(action.type) {
        case SET_INFO_USER: {
            return {...state, isAuthen: true, infoUser: {...action.data}};
        }

        case CLEAR_USER_INFO: {
            return {...state, isAuthen: false, infoUser: {}}
        }

        case SET_LIST_USER: {
            return {...state, listUser: [...action.data]};
        }

        case SET_LIST_USER_TYPE: {
            return {...state, listUserType: [...action.data]};
        }

        default: {
            return {...state};
        }
    }
}

export default QuanLyUserReducer;