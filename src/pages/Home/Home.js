import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Banner from '../../component/Banner/Banner'
import SlickList from '../../component/SlickList/SlickList'
import { getListCourseAction } from '../../redux/actions/QuanLyKhoaHocAction';
import "./Home.scss";

export default function Home(props) {
    const {listCourses} = useSelector(state => state.QuanLyKhoaHocReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListCourseAction());
    }, [])

    return (
        <div className="home">
            <Banner />
            <div className="list-course container">
                <h2 className="title-list">Students are viewing</h2>
                <SlickList listCourses={listCourses} />
            </div>
            <div className="instructor">
                <div className="instructor-item ">
                    <img src={require("../../assets/img/instructor-1.jpg").default} alt="instructor" />
                    <div className="content">
                        <h3>Become an instructor</h3>
                        <p>Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</p>
                        <button className="btn btn-black">Start teaching today</button>
                    </div>
                </div>
                <div className="instructor-item order">
                    <img src={require("../../assets/img/instructor-2.jpg").default} alt="instructor" />
                    <div className="content">
                        <img src={require("../../assets/img/logo-ub.svg").default} alt="logoub" />
                        <p>Get unlimited access to 6,000+ of Udemy’s top courses for your team. Learn and improve skills across business, tech, design, and more.</p>
                        <button className="btn btn-black">Get Udemy Business</button>
                    </div>
                </div>
                <div className="instructor-item ">
                    <img src={require("../../assets/img/instructor-3.jpg").default} alt="instructor" />
                    <div className="content">
                        <h3>Transform your life through education</h3>
                        <p>Learners around the world are launching new careers, advancing in their fields, and enriching their lives.</p>
                        <button className="btn btn-black">Find out how</button>
                    </div>
                </div>
            </div>
            <div className="trusted">
                <div className="trusted-container">
                    <h4>Trusted by companies of all sizes</h4>
                    <div className="trusted-list">
                        <div className="trusted-item"><img src={require("../../assets/img/apple.svg").default} alt="logo" /></div>
                        <div className="trusted-item"><img src={require("../../assets/img/box.svg").default} alt="logo" /></div>
                        <div className="trusted-item"><img src={require("../../assets/img/w.svg").default} alt="logo" /></div>
                        <div className="trusted-item"><img src={require("../../assets/img/netflix.svg").default} alt="logo" /></div>
                        <div className="trusted-item"><img src={require("../../assets/img/eventbrite.svg").default} alt="logo" /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
