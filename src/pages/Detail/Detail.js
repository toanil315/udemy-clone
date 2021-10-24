import React, { useEffect, useState } from 'react'
import { quanLyKhoaHocService } from '../../services/QuanLyKhoaHocService';
import { STATUS_CODE } from '../../util/Setting/config';
import "./Detail.scss";
import {NavLink} from 'react-router-dom'

export default function Detail(props) {
    const [infoCourse, setInfoCourse] = useState({});
    const [listCourseRelated, setListRelated] = useState([]);
    const { id } = props.match.params;
    useEffect(() => {
        window.scrollTo(0,0);
    })

    useEffect(() => {
        
        const getListCourseRelated = async (idCate) => {
            try {
                const { data, status } = await quanLyKhoaHocService.getListCourseByCategory(idCate);
                if (status === STATUS_CODE.SUCCESS) {
                    setListRelated(data);
                }
            }
            catch (error) {
                console.log("error: ", error);
            }
        }
        const getInfoCourse = async () => {
            try {
                const { data, status } = await quanLyKhoaHocService.getInfoCourseService(id);
                if (status === STATUS_CODE.SUCCESS) {
                    await getListCourseRelated(data.danhMucKhoaHoc.maDanhMucKhoahoc);
                    setInfoCourse(data);
                }
            }
            catch (error) {
                console.log("error: ", error);
            }
        }
        getInfoCourse();
    }, [id])

    const renederListRelated = () => {
        return listCourseRelated.slice(0, 5).map((course, index) => {
            return <li key={index}>
                <NavLink className="item" to={`/detail/${course?.maKhoaHoc}`} exact>
                    <img src={course?.hinhAnh} alt={course?.hinhAnh} />
                    <div className="info">
                        <h3>{course?.tenKhoaHoc}</h3>
                        <div>
                            <span className="best-sell">Bestseller</span>
                            <span className="date">Updated <span>{course?.ngayTao}</span></span>
                        </div>
                    </div>
                    <span className="rated">4.6 <i className="fa fa-star"></i></span>
                    <span className="students"><i className="fa fa-user-friends"></i> {course?.soLuongHocVien}</span>
                    <button className="wishlist"><i className="far fa-heart"></i></button>
                </NavLink>
            </li>
        })
    }

    return (
        <div className="detail">
            <div className="detail-top">
                <div className="container">
                    <div className="detail-top-left">
                        <h1>{infoCourse.tenKhoaHoc}</h1>
                        <p className="description">{infoCourse.moTa}</p>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "1.2rem" }}>
                            <span className="best-sell">Bestseller</span>
                            <div className="rated">
                                <span>4.6</span>
                                <div className="stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <span className="rating-count">(137,075 ratings)</span>
                            </div>
                            <span className="students">{infoCourse.soLuongHocVien} students</span>
                        </div>
                        <p className="author">Created by <span>{infoCourse.nguoiTao?.taiKhoan}</span></p>
                        <p>
                            <span className="date"><i className="fas fa-exclamation-circle"></i> Last updated {infoCourse.ngayTao}</span>
                            <span className="language"><i className="fa fa-globe"></i> English</span>
                            <span className="sub"><i className="fas fa-closed-captioning"></i> English, German</span>
                        </p>
                        <div className="user-ctrl">
                            <button className="btn btn-black">Wishlist <i className="far fa-heart"></i></button>
                            <button className="btn btn-black">Share <i className="far fa-heart"></i></button>
                            <button className="btn btn-black">Gift this course</button>
                        </div>
                    </div>
                    <div className="detail-top-right">
                        <div className="img">
                            <img src={infoCourse.hinhAnh} alt={infoCourse.hinhAnh} />
                            <div className="overlay">
                                <i className="fa fa-play"></i>
                                <p>Preview this course</p>
                            </div>
                        </div>
                        <div className="content">
                            <p className="price">$13.99</p>
                            <p className="notify"><i className="fa fa-clock"></i>2 hours left at this price!</p>
                            <button className="btn btn-purple">Add to cart</button>
                            <p className="guarantee">30-Day Money-Back Guarantee</p>
                            <ul className="include">
                                <h4>This course includes:</h4>
                                <li><i className="fab fa-youtube"></i> 54.5 hours on-demand video</li>
                                <li><i className="fa fa-file"></i> 80 articles</li>
                                <li><i className="fa fa-download"></i> 21 downloadable resources</li>
                                <li><i className="fa fa-code"></i> 8 coding exercises</li>
                                <li><i className="fa fa-infinity"></i> Full lifetime access</li>
                                <li><i className="fas fa-mobile-alt"></i> Access on mobile and TV</li>
                                <li><i className="fa fa-certificate"></i> Certificate of completion</li>
                            </ul>
                            <div className="train">
                                <h3>Training 5 or more people?</h3>
                                <p>Get your team access to 6,000+ top Udemy courses anytime, anywhere.</p>
                                <button className="btn">Try Udemy Business</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail-main">
                <div className="container">
                    <div className="detail-main-content">
                        <div className="content-box">
                            <h2>What you'll learn</h2>
                            <ul className="list">
                                <li>
                                    <i className="fa fa-check"></i>
                                    Grow a Business Online From Scratch
                                </li>
                                <li>
                                    <i className="fa fa-check"></i>
                                    Craft a portfolio of websites to apply for junior developer jobs.
                                </li>
                                <li>
                                    <i className="fa fa-check"></i>
                                    Build fully-fledged websites and web apps for your startup or business.
                                </li>
                                <li>
                                    <i className="fa fa-check"></i>
                                    Work as a freelance web developer.
                                </li>
                                <li>
                                    <i className="fa fa-check"></i>
                                    Learn professional developer best practices.
                                </li>
                            </ul>
                        </div>
                        <div className="require">
                            <h2>Requirements</h2>
                            <ul className="require-list">
                                <li><i className="fa fa-circle"></i>No programming experience needed - I'll teach you everything you need to know</li>
                                <li><i className="fa fa-circle"></i>A Mac or PC computer with access to the internet</li>
                                <li><i className="fa fa-circle"></i>No paid software required - all websites will be created with Atom (which is free)</li>
                                <li><i className="fa fa-circle"></i>I'll walk you through, step-by-step how to get all the software installed and set up</li>
                            </ul>
                        </div>
                        <div className="content-box">
                            <h2>Top companies trust Udemy</h2>
                            <p>Get your team access to Udemy's top 6,000+ courses</p>
                            <div className="list">
                                <img src={require("../../assets/img/apple.svg").default} alt="logo" />
                                <img src={require("../../assets/img/box.svg").default} alt="logo" />
                                <img src={require("../../assets/img/w.svg").default} alt="logo" />
                                <img src={require("../../assets/img/netflix.svg").default} alt="logo" />
                                <img src={require("../../assets/img/eventbrite.svg").default} alt="logo" />
                            </div>
                            <button className="btn">Try Udemy Business</button>
                        </div>
                        <div className="related">
                            <h2>List course "{infoCourse.danhMucKhoaHoc?.tenDanhMucKhoaHoc}"</h2>
                            <ul className="related-list">
                                {renederListRelated()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
