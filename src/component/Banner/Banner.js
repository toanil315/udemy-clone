import React from 'react';
import "./Banner.scss";
import {NavLink} from 'react-router-dom'

export default function Banner() {
    return (
        <div className="banner wrapper">
            <div className="banner-content">
                <img src={require("../../assets/img/banner.jpg").default} alt="banner" />
                <div className="container">
                    <div className="banner-content-top">
                        <h2>Find Your Preferred Courses & Improve Your Skills</h2>
                        <p>We're here to help you building your career</p>
                        <NavLink to="" exact className="btn btn-purple">Lets start a course <i className="fa fa-long-arrow-alt-right"></i></NavLink>
                    </div>
                    <div className="banner-content-bottom">
                        <div className="item">
                            <div className="icon"><i className="fa fa-play"></i></div>
                            <p>Over 155,000 video courses on career and personal skills</p>
                        </div>
                        <div className="item">
                            <div className="icon"><i className="fa fa-star"></i></div>
                            <p>Choose from top industry instructors across the world</p>
                        </div>
                        <div className="item">
                            <div className="icon"><i className="fa fa-infinity"></i></div>
                            <p>Learn at your own pace, with lifetime access on mobile and desktop</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
