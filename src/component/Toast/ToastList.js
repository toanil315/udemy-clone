import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Toast from './Toast';
import "./Toast.scss";

export default function ToastList() {
    const {toastList} = useSelector(state => state.ToastReducer);

    const renderToast = () => { 
        return toastList.map((toast, index) => {
            return <div key={index}>
                <Toast toast={toast} />
            </div>
        })
    }

    return (
        <div className="toast">
            {renderToast()}
        </div>
    )
}
