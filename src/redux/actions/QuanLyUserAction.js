import { quanLyUserService } from "../../services/QuanLyUserService";
import { STATUS_CODE, TOKEN } from "../../util/Setting/config";
import { LOG_IN, SET_INFO_USER, SET_LIST_USER, SET_LIST_USER_TYPE } from "../types/QuanLyUserType";
import {history} from '../../App';
import { CLEAR_CART } from "../types/QuanLyKhoaHocType";
import { hideLoading, showLoading } from "./LoadingAction";
import { showToastSuccess } from "./ToastAction";

export const loginAction = (model) => {
    return async (dispatch) => {
        try {
            const {data, status} = await quanLyUserService.loginService(model);
            if(status === STATUS_CODE.SUCCESS) {
                localStorage.setItem(TOKEN, data.accessToken);
                dispatch(getInfoUser());
                history.push("/");
            }
        }
        catch(error) {
            console.log("error: ", error);
        }
    }
}

export const getInfoUser = () => {
    return async(dispatch) => {
        try {
            const {data, status} = await quanLyUserService.getInfoUser();
            if(status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_INFO_USER,
                    data
                })
            }
        }
        catch(error) {
            console.log("error: ", error);
        }
    }
}

export const signupAction = (model) => {
    return async(dispatch) => {
        try {
            const {data,status} = await quanLyUserService.signupService(model);
            if(status === STATUS_CODE.SUCCESS) {
                history.push("/login");
            }
        }
        catch(error) {
            console.log("error ", error);
        }
    }
}

export const enrollCourseAction = (arrMaKhoaHoc) => {
    return async (dispatch, getState) => {
        try {
            dispatch(showLoading());
            const { QuanLyUserReducer } = getState(state => state.QuanLyUserReducer);
            const {infoUser} = QuanLyUserReducer;   
            let arrPromiseEnroll = arrMaKhoaHoc.map(id => {
                return quanLyUserService.enrollCourseService({
                    "maKhoaHoc": id,
                    "taiKhoan": infoUser.taiKhoan
                })
            });
            Promise.all(arrPromiseEnroll).then(async values => {
                let checkOK = true;
                values.forEach(element => {
                    checkOK &= element.status === STATUS_CODE.SUCCESS ? true : false;
                });
                if(checkOK) {
                    let toastId = Date.now();
                    await dispatch(getInfoUser());
                    setTimeout(() => {
                        dispatch({
                            type: CLEAR_CART
                        })
                        dispatch(hideLoading());
                        dispatch(showToastSuccess(toastId, "Thành công", "Bạn đã ghi danh khoá học thành công"));
                        history.push("/user/courses");
                    }, 400);
                }
            })
        }
        catch (error) {
            console.log("error: ", {error});
        }
    }
}

export const getListUserAction = () => {
    return async (dispatch) => {
        try {
            dispatch(showLoading());
            const {data, status} = await quanLyUserService.getListUserService();
            if(status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_USER,
                    data
                })
                setTimeout(() => {
                    dispatch(hideLoading());
                }, 500);
            }
        }
        catch(error) {
            console.log("error: ", error);
        }
    }
}

export const getListUserTypeAction = () => {
    return async (dispatch) => {
        try {
            dispatch(showLoading());
            const {data, status} = await quanLyUserService.getListUserTypeService();
            if(status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_LIST_USER_TYPE,
                    data
                })
                setTimeout(() => {
                    dispatch(hideLoading());
                }, 500);
            }
        }
        catch(error) {
            console.log("error: ", error);
        }
    }
}

