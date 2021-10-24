import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Course from '../../../component/Course/Course';
import { quanLyKhoaHocService } from '../../../services/QuanLyKhoaHocService';
import "./UserCourse.scss";

export default function UserCourse() {
    const { infoUser } = useSelector(state => state.QuanLyUserReducer);
    const [listCourse, setListCouse] = useState([]);
    useEffect(() => {
        const getMyCourses = () => {
            try {
                if (infoUser.chiTietKhoaHocGhiDanh) {
                    console.log(infoUser.chiTietKhoaHocGhiDanh);
                    let arrCoursePromise = infoUser.chiTietKhoaHocGhiDanh.map((course) => {
                        return quanLyKhoaHocService.getInfoCourseService(course.maKhoaHoc);
                    })
                    Promise.all(arrCoursePromise).then(values => {
                        setListCouse(values.map(item => item.data));
                    });
                }
            }
            catch (error) {
                console.log("error: ", error);
            }
        }
        getMyCourses();
    }, [infoUser])

    const renderListCourse = () => {
        return listCourse.map((course, index) => {
            return <li key={index}>
                <Course course={course} />
            </li>
        })
    }

    return (
        <div className="user-course">
            <div className="user-course-title">
                <h1 className="container">My Courses</h1>
            </div>
            <div className="container">
                <ul className="course-list">
                    {renderListCourse()}
                </ul>
            </div>
        </div>
    )
}
