import React, { memo, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.scss";
import { getListCategoryAction } from '../../redux/actions/QuanLyKhoaHocAction';
import { quanLyKhoaHocService } from '../../services/QuanLyKhoaHocService';
import { STATUS_CODE, TOKEN } from '../../util/Setting/config';
import { getInfoUser } from '../../redux/actions/QuanLyUserAction';
import { history } from '../../App';
import { CLEAR_USER_INFO } from '../../redux/types/QuanLyUserType';

function Header(props) {
    const { listCategory, cart } = useSelector(state => state.QuanLyKhoaHocReducer);
    const { isAuthen, infoUser } = useSelector(state => state.QuanLyUserReducer);
    const [searchInp, setSearchInput] = useState("");
    const [searchResult, setResult] = useState([]);
    const [classOutput, setClassOutput] = useState("");
    const searchRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {        
        dispatch(getListCategoryAction());
        if (localStorage.getItem(TOKEN)) {
            dispatch(getInfoUser());
        }
    }, [])

    const renderCategory = () => {
        return listCategory.map((category, index) => {
            return <li key={index}><NavLink to={`/courses/${category?.maDanhMuc}`} exact>{category?.tenDanhMuc} <i className="fa fa-chevron-right"></i></NavLink></li>
        })
    }

    const searchCourse = async (keyWord) => {
        try {
            const { data, status } = await quanLyKhoaHocService.searchCourseService(keyWord);
            if (status === STATUS_CODE.SUCCESS) {
                setResult(data);
            }
        }
        catch (error) {
            console.log("error: ", error);
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        if (searchRef.current !== null) {
            clearTimeout(searchRef.current);
        }
        searchRef.current = setTimeout(() => {
            if (e.target.value !== "") {
                searchCourse(e.target.value);
                setClassOutput("show");
            }
            else {
                setResult([]);
                setClassOutput("");
            }
        }, 300);
    }

    const handleBlur = (e) => {
        const currentTarget = e.currentTarget;
        //When use e.relatedTarget => u should add tabIndex="0" into elemnt which expected to appear in event.relatedTarget!!!
        setTimeout(() => {
            if (!currentTarget.contains(e.relatedTarget)) {
                setClassOutput("");
            }
        }, 0);
    }

    const renderSearchResult = () => {
        return searchResult.map((result, index) => {
            return <li onClick={() => {
                setClassOutput("");
            }} key={index}>
                <NavLink to={`/detail/${result.maKhoaHoc}`} exact>
                    <i className="fa fa-search"></i>
                    {result.tenKhoaHoc}
                </NavLink>
            </li>
        })
    }

    const renderCart = () => {
        if (cart.length > 0) {
            return cart.map((item, index) => {
                return <li key={index}>
                    <NavLink className="cart-item" to={`/detail/${item?.maKhoaHoc}`} exact>
                        <img src={item?.hinhAnh} alt={item?.hinhAnh} />
                        <div className="info">
                            <h4>{item?.tenKhoaHoc}</h4>
                            <p>{item?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
                        </div>
                    </NavLink>
                </li>
            })
        }
        else return <img src={require("../../assets/img/emty.png").default} alt="emty" />
    }

    return (
        <header className="header">
            <div className="container header-content">
                <NavLink to="/" exact>
                    <img className="logo" src={require("../../assets/img/logo-udemy.svg").default} alt="logo" />
                </NavLink>
                <div className="categories">
                    <p>Categories</p>
                    <ul className="category-list">
                        {renderCategory()}
                    </ul>
                </div>
                <div onBlur={handleBlur} className="search-input">
                    <i className="fa fa-search"></i>
                    <input onFocus={() => {
                        if (searchResult.length > 0) {
                            setClassOutput("show");
                        }
                    }} onChange={handleChange} placeholder="Search for anything" />
                    <ul tabIndex="0" className={`result ${classOutput}`}>
                        {renderSearchResult()}
                    </ul>
                </div>
                <div className="option">
                    <div className="option-item">
                        <p>Udemy Business</p>
                    </div>
                    <div className="option-item">
                        <p>Teach on Udemy</p>
                    </div>
                </div>
                <div className="cart">
                    <i className="fa fa-shopping-cart"></i>
                    <div className="quality">{cart.length}</div>
                    <div className="cart-list">
                        <ul>
                            {renderCart()}
                        </ul>
                        <button onClick={() => {
                            history.push("/cart")
                        }} className="btn btn-black">Go to cart</button>
                    </div>
                </div>
                <div className="user-ctrl">
                    {isAuthen
                        ? <div className="avatar">
                            <img src={`https://ui-avatars.com/api/?name=${infoUser.hoTen}&background=black&color=ffffff&bold=true&font-size=0.4`} alt="ava" />
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <img src={`https://ui-avatars.com/api/?name=${infoUser.hoTen}&background=black&color=ffffff&bold=true&font-size=0.4`} alt="ava" />
                                    <div className="info">
                                        <h3>{infoUser.hoTen}</h3>
                                        <p>{infoUser.email}</p>
                                    </div>
                                </div>
                                <div className="line"></div>
                                <ul className="user-featured">
                                    <li><NavLink to="" exact className="featured-item">Infomation</NavLink></li>
                                    <li><NavLink to="/user/courses" exact className="featured-item">My courses</NavLink></li>
                                </ul>
                                <div className="line"></div>
                                <ul className="user-featured">
                                    <li onClick={() => {
                                        localStorage.removeItem(TOKEN)
                                        dispatch({type: CLEAR_USER_INFO})
                                    }}><p>Log out</p></li>
                                </ul>
                            </div>
                        </div>
                        : <>
                            <NavLink to="/login" exact className="btn">Log in</NavLink>
                            <NavLink to="/signup" exact className="btn btn-black">Sign up</NavLink>
                        </>
                    }
                    <button className="btn language"><i className="fa fa-globe"></i></button>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);
