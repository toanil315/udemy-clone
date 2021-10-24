import { OPEN_DRAWER } from "../types/DrawerType"

export const openDrawerAction = (title, component) => {
    return {
        type: OPEN_DRAWER,
        title,
        component
    }
}