import { CLOSE_DRAWER, OPEN_DRAWER } from "../types/DrawerType";

const stateDefault = {
    visible: false,
    title: "test",
    component: <p>Hello</p>
}

const DrawerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case OPEN_DRAWER: {
            return {...state, visible: true, title: action.title, component: action.component};
        }

        case CLOSE_DRAWER: {
            return {...state, visible: false};
        }
        
        default:
            return {...state};
    }
}

export default DrawerReducer;