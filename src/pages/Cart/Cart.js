import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCourseInCartAction } from '../../redux/actions/QuanLyKhoaHocAction';
import "./Cart.scss";
import {history} from '../../App';
import { enrollCourseAction } from '../../redux/actions/QuanLyUserAction';

export default function Cart(props) {

    const { cart } = useSelector(state => state.QuanLyKhoaHocReducer);
    const dispatch = useDispatch();

    const renderCartItem = () => {
        return cart.map((item, index) => {
            return <li key={index}>
                <img src={item?.hinhAnh} alt={item?.hinhAnh} />
                <div className="info">
                    <h3>{item?.tenKhoaHoc}</h3>
                    <p>By {item?.nguoiTao?.hoTen}</p>
                </div>
                <div className="action">
                    <button onClick={() => {
                        dispatch(removeCourseInCartAction(item?.maKhoaHoc));
                    }} className="remove"><i className="fa fa-trash"></i></button>
                    <button className="wishlist"><i className="far fa-heart"></i></button>
                </div>
            </li>
        })
    }

    return (
        <div className="cart-page">
            <div className="title">
                <h1 className="container">Shopping Cart</h1>
            </div>
            {
                cart.length > 0
                    ? <div className="container cart-content">
                        <div className="cart-right">
                            <ul className="cart-list">
                                {renderCartItem()}
                            </ul>
                        </div>
                        <div className="cart-left">
                            <p>Total: <span>{cart.length} Course{cart.length > 1 ? "s" : ""} in Cart</span></p>
                            <button onClick={() => {
                                dispatch(enrollCourseAction(cart.map(item => item.maKhoaHoc)))
                            }} className="btn btn-purple">Enroll now</button>
                            <div className="discount">
                                <h3>Promotions</h3>
                                <div className="discount-input">
                                    <input placeholder="Add discount here..." />
                                    <button className="btn btn-purple">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="no-item">
                        <img src={require("../../assets/img/emty.png").default} alt="emty" />
                        <button onClick={() => {
                            history.push("/");
                        }} className="btn btn-purple">Keep Shopping</button>
                    </div>
            }
        </div>
    )
}
