import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from "yup";
import { signupAction } from '../../../redux/actions/QuanLyUserAction';

const regexPhone = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpSchema = Yup.object().shape({
    "taiKhoan": Yup.string().required('*user name is required'),
    "matKhau": Yup.string().required('*password is required'),
    "hoTen": Yup.string().required('*full name is required'),
    "soDT": Yup.string()
    .matches(regexPhone, '*phone number is invalid')
    .min(10, "*phone number must be more than 10 character")
    .max(11, "*phone number must be less than 11 character")
    .required("*phone number is required"),
    "maNhom": Yup.string().required('*group id is required'),
    "email": Yup.string().email('Email is invalid').required('*email is required'),
})

export default function Signup(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            "taiKhoan": "",
            "matKhau": "",
            "hoTen": "",
            "soDT": "",
            "maNhom": "",
            "email": ""
        },
        initialErrors: {
            "taiKhoan": "",
            "matKhau": "",
            "hoTen": "",
            "soDT": "",
            "maNhom": "",
            "email": ""
        },
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            dispatch(signupAction(values));
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="auth-form login">
            <p className="title">Sign Up and Start Learning!</p>
            <div className="form-item">
                <i className="fa fa-user"></i>
                <input onChange={formik.handleChange} name="taiKhoan" placeholder="User name" />
            </div>
            <p className="error">{formik.errors.taiKhoan}</p>
            <div className="form-item">
                <i className="fa fa-lock"></i>
                <input onChange={formik.handleChange} name="matKhau" placeholder="Password" type="password" />
            </div>
            <p className="error">{formik.errors.matKhau}</p>
            <div className="form-item">
                <i className="fa fa-user"></i>
                <input onChange={formik.handleChange} name="hoTen" placeholder="Full name" />
            </div>
            <p className="error">{formik.errors.hoTen}</p>
            <div className="form-item">
                <i className="fa fa-phone"></i>
                <input onChange={formik.handleChange} name="soDT" placeholder="Phone number" />
            </div>
            <p className="error">{formik.errors.soDT}</p>
            <div className="form-item">
                <i className="fa fa-users"></i>
                <input onChange={formik.handleChange} name="maNhom" placeholder="Id group: GP08, GP09..." />
            </div>
            <p className="error">{formik.errors.maNhom}</p>
            <div className="form-item">
                <i className="fa fa-envelope"></i>
                <input onChange={formik.handleChange} name="email" placeholder="Email: abc@gmail.com" />
            </div>
            <p className="error">{formik.errors.email}</p>
            <button type="submit" className="btn btn-purple">Sign Up</button>
            <p>Already have an account? <NavLink to="/login" exact>Log In</NavLink></p>
        </form>
    )
}
