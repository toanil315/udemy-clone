import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addToCartAction } from '../../redux/actions/QuanLyKhoaHocAction';
import { removeToast, showToastSuccess } from '../../redux/actions/ToastAction';
import "./Course.scss";

export default function Course(props) {
    const { course } = props;
    const [position, setPosition] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);
    const courseRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let node = courseRef.current;
        const detectPosition = () => {
            let { x } = node.getBoundingClientRect();
            let position = x >= window.innerWidth / 2 ? "left" : "right";
            setPosition(position);
        }
        courseRef.current.addEventListener("mouseover", detectPosition);

        return () => {
            node.removeEventListener("mouseover", detectPosition);
        }
    }, [])

    const addToCart = () => {
        let toastID = Date.now();
        setBtnLoading(true);
        dispatch(addToCartAction(course));
        setTimeout(() => {
            setBtnLoading(false);
            dispatch(showToastSuccess(toastID, "Thành công", "Bạn đã thêm sản phẩm vào giỏ thành công"));
        }, 1000)// show toast
    }

    return (
        <div ref={courseRef} className="course">
            <NavLink to={`/detail/${course?.maKhoaHoc}`} exact>
                <div className="img">
                    <img alt={course?.hinhAnh} src={course?.hinhAnh} />
                </div>
                <div style={{ height: 70 }}>
                    <h3 className="title">{course?.tenKhoaHoc.length > 45 ? course?.tenKhoaHoc.substring(0, 45) + "..." : course?.tenKhoaHoc}</h3>
                    <p className="author">{course?.nguoiTao?.hoTen}</p>
                </div>
                <div className="rated">
                    <p>4.6</p>
                    <div className="stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <span>({course?.soLuongHocVien})</span>
                </div>
            </NavLink>
            <div className={`more-info ${position}`}>
                <h3>{course?.tenKhoaHoc}</h3>
                <span className="best-sell">Bestseller</span>
                <span className="date">Updated <span>{course?.ngayTao}</span></span>
                <p className="description">{course?.moTa}</p>
                <p className="category"><i className="fa fa-check"></i> {course?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
                <div className="user-ctrl">
                    <button onClick={() => {
                        addToCart()
                    }} disabled={btnLoading} className={`btn btn-purple ${btnLoading ? "btn-loading" : ""}`}>
                        {btnLoading
                            ? <img src={require("../../assets/img/loading-btn.jpg").default} alt="loading" />
                            : ""
                        }
                        Add To Cart
                    </button>
                    <button className="add-wish-list"><i className="far fa-heart"></i></button>
                </div>
            </div>
        </div>
    )
}
