import { ADD_TOAST, REMOVE_TOAST } from "../types/ToastType"

export const showToastSuccess = (id, title, desc) => {
    return {
        type: ADD_TOAST,
        toast: {
            id,
            type: "success",
            title,
            desc,
            icon : <i className="fa fa-check"></i>
        }
    }
}

export const showToastError = (id, title, desc) => {
    return {
        type: ADD_TOAST,
        toast: {
            id,
            type: "error",
            title,
            desc,
            icon : <i className="fa fa-times"></i>
        }
    }
}

export const removeToast = (toastId) => {
    return {
        type: REMOVE_TOAST,
        toastId
    }
}