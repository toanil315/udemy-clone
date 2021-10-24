import { SHOPPING_CART } from "../../util/Setting/config";
import { ADD_TO_CART, CLEAR_CART, REMOVE_COURSE_IN_CART, SET_CATEGORY, SET_LIST_COURSE } from "../types/QuanLyKhoaHocType";

const stateDefault = {
    listCourses: [],
    listCategory: [],
    cart: localStorage.getItem(SHOPPING_CART) ? JSON.parse(localStorage.getItem(SHOPPING_CART)) : [],
};

const QuanLyKhoaHocReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_LIST_COURSE: {
            return {...state, listCourses: [...action.data]};
        }

        case SET_CATEGORY: {
            return {...state, listCategory: [...action.data]};
        }

        case ADD_TO_CART: {
            const {course} = action;
            let cartUpdate = [...state.cart];
            let index = cartUpdate.findIndex(item => {
                return item.maKhoaHoc === course.maKhoaHoc;
            });
            if(index === -1) {
                cartUpdate = [...cartUpdate, course];
            }
            localStorage.setItem(SHOPPING_CART, JSON.stringify(cartUpdate));
            return {...state, cart: cartUpdate};
        }

        case REMOVE_COURSE_IN_CART: {
            let cartUpdate = [...state.cart];
            let index = cartUpdate.findIndex(item => item.maKhoaHoc === action.id);
            if(index !== -1) {
                cartUpdate.splice(index, 1);
            }
            localStorage.setItem(SHOPPING_CART, JSON.stringify(cartUpdate));
            return {...state, cart: cartUpdate};
        }

        case CLEAR_CART: {
            localStorage.removeItem(SHOPPING_CART);
            return {...state, cart: []};
        }
    
        default: {
            return {...state};
        }
    }
}

export default QuanLyKhoaHocReducer;