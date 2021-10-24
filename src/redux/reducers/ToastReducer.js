import { ADD_TOAST, REMOVE_TOAST } from "../types/ToastType"

const stateDefault = {
    toastList: []
}

const ToastReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case ADD_TOAST: {
            return { ...state, toastList: [...state.toastList, action.toast] };
        }

        case REMOVE_TOAST: {
            let toastListUpdate = [...state.toastList];
            let index = toastListUpdate.findIndex(item => item.id === action.toastId);
            if(index === toastListUpdate.length - 1) {
                return { ...state, toastListUpdate: []};
            }
            return {...state};
        }

        default: {
            return { ...state };
        }
    }
}

export default ToastReducer;