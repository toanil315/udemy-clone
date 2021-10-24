import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { removeToast } from '../../redux/actions/ToastAction';

export default function Toast(props) {
    const { toast } = props;
    let toastRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let node = toastRef.current;
        setTimeout(() => {
            node.classList.add("close");
            setTimeout(() => {
                node.style.display = "none";
                dispatch(removeToast(toast?.id));
            }, 600)
        }, 5000); //time exist: 5000ms + time for close animation finish: 600ms
    }, [])

    return <div ref={toastRef} className={`item item-${toast?.id} ${toast?.type}`}>
        <div className="icon">{toast?.icon}</div>
        <div className="content">
            <h3>{toast?.title}</h3>
            <p>{toast?.desc}</p>
        </div>
        <button onClick={(e) => {
            const node = e.currentTarget.parentNode;
            node.classList.add("close");
            setTimeout(() => {
                node.style.display = "none";
            }, 600)
        }}><i className="fa fa-times"></i></button>
    </div>
}
