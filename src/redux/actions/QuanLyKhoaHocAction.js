import { history } from "../../App";
import { quanLyKhoaHocService } from "../../services/QuanLyKhoaHocService";
import { STATUS_CODE } from "../../util/Setting/config";
import { ADD_TO_CART, CLEAR_CART, REMOVE_COURSE_IN_CART, SET_CATEGORY, SET_LIST_COURSE } from "../types/QuanLyKhoaHocType";
import { hideLoading, showLoading } from "./LoadingAction";

export const getListCourseAction = () => {
    return async (dispatch) => {
        try {
            dispatch(showLoading());
            const { data, status } = await quanLyKhoaHocService.getListCourse();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_COURSE,
                    data
                })
                setTimeout(() => {
                    dispatch(hideLoading());
                }, 500);
            }
        }
        catch (error) {
            console.log("error: ", error);
        }
    }
}

export const getListCategoryAction = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyKhoaHocService.getListCategory();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_CATEGORY,
                    data
                })
            }
        }
        catch (error) {
            console.log("error: ", error);
        }
    }
}

export const addToCartAction = (course) => {
    return {
        type: ADD_TO_CART,
        course
    }
}

export const removeCourseInCartAction = (id) => {
    return {
        type: REMOVE_COURSE_IN_CART,
        id
    }
}