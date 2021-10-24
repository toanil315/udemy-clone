import React from 'react'
import { useSelector } from 'react-redux';
import "./Loading.scss";

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer);
    return (
        isLoading
            ? <div className="loading">
                <img src={require("../../assets/img/loading-screen.gif").default} alt="loading" />
            </div>
            : ""
    )
}
