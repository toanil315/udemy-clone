import React from 'react'
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/types/DrawerType';

export default function DrawerHOC(props) {
    const {visible, title, component} = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch({
            type: CLOSE_DRAWER
        })
    }

    return (
        <Drawer title={title} placement="right" onClose={onClose} visible={visible}>
            {component}
        </Drawer>
    )
}
