import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Course from '../../component/Course/Course';
import { hideLoading, showLoading } from '../../redux/actions/LoadingAction';
import { quanLyKhoaHocService } from '../../services/QuanLyKhoaHocService';
import { STATUS_CODE } from '../../util/Setting/config';
import "./Search.scss";

export default function Search(props) {
    let {idCate} = props.match.params;
    const [listCourse, setListCourse] = useState([]);
    const {listCategory} = useSelector(state => state.QuanLyKhoaHocReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const getListCourseByCate = async (idCate) => {
            try {
                dispatch(showLoading());
                const {data, status} = await quanLyKhoaHocService.getListCourseByCategory(idCate);
                if(status === STATUS_CODE.SUCCESS) {
                    setListCourse([...data]);
                    setTimeout(() => {
                        dispatch(hideLoading());
                    }, 1000);
                }
            }
            catch(error) {
                console.log("error: ", error);
            }
        }

        if(idCate) {
            getListCourseByCate(idCate);
        }
    }, [idCate])

    const renderListCourse = () => {
        if(listCourse.length > 0) {
            return listCourse.map((course, index) => {
                return <div className="item" key={index}>
                    <Course course={course} />
                </div>
            })
        }
    }

    return (
        <div className="search-page">
            <div className="search-content container">
                {/* FILTER */}
                {/* <div className="filter">
                    <div className="filter-item">
                        <h4>Topic</h4>
                        <ul className="option">
                            <li>Javascript</li>
                            <li>Python</li>
                            <li>GraphQL</li>
                        </ul>
                    </div>
                    <div className="filter-item">
                        <h4>Rating</h4>
                        <ul className="option">
                            <li>Javascript</li>
                            <li>Python</li>
                            <li>GraphQL</li>
                        </ul>
                    </div>
                    <div className="filter-item">
                        <h4>Topic</h4>
                        <ul className="option">
                            <li>Javascript</li>
                            <li>Python</li>
                            <li>GraphQL</li>
                        </ul>
                    </div>
                    <div className="filter-item">
                        <h4>Topic</h4>
                        <ul className="option">
                            <li>Javascript</li>
                            <li>Python</li>
                            <li>GraphQL</li>
                        </ul>
                    </div>
                </div> */}
                <h2>{idCate && listCategory.find(cate => cate.maDanhMuc === idCate)?.tenDanhMuc} <span>({listCourse.length} results)</span></h2>
                <div className="result">
                    {renderListCourse()}
                </div>
            </div>
        </div>
    )
}
