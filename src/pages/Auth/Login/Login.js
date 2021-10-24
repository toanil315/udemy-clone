import React from 'react'
import "../Auth.scss";
import {useFormik} from 'formik'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../../redux/actions/QuanLyUserAction';
import { NavLink } from 'react-router-dom';

export default function Login(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
        },
        onSubmit: (values) => {
            dispatch(loginAction(values));
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="auth-form login">
            <p className="title">Log In to Your Udemy Account!</p>
            <div className="form-item">
                <i className="fa fa-envelope"></i>
                <input onChange={formik.handleChange} name="taiKhoan" placeholder="abc@gmail.com" />
            </div>
            <div className="form-item">
                <i className="fa fa-lock"></i>
                <input onChange={formik.handleChange}    name="matKhau" placeholder="Password" type="password" />
            </div>
            <button type="submit" className="btn btn-purple">Log In</button>
            <p>Don't have an account? <NavLink to="/signup" exact>Sign up</NavLink></p>
        </form>
    )
}
