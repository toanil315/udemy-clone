import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { Layout, Menu } from 'antd';
import { NavLink } from "react-router-dom";
import { showToastError } from "../../redux/actions/ToastAction";
import { TOKEN } from '../../util/Setting/config';
import { getInfoUser } from '../../redux/actions/QuanLyUserAction';
import { history } from '../../App';
import "./AdminTemplate.scss";
import DrawerHOC from '../../HOC/Drawer/DrawerHOC';
const { Header, Content, Sider } = Layout;

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;
    const {infoUser} = useSelector(state => state.QuanLyUserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            dispatch(getInfoUser());
        }
        else {
            dispatch(showToastError(Date.now(), "Truy cap that bai", "Ban chua dang nhap"));
            history.push("/login");
        }
    }, [])

    useEffect(() => {
        if(infoUser.maLoaiNguoiDung && infoUser.maLoaiNguoiDung !== "GV") {
            dispatch(showToastError(Date.now(), "Truy cap that bai", "Ban khong du quyen truy cap vao trang nay"));
            history.push("/login");
        }
    }, [infoUser])

    return <Route {...restProps} render={(propsRoute) => {
        return <>
            <DrawerHOC />
            <Layout className="admin-template" style={{ minHeight: '100vh' }}>
                <Sider style={{backgroundColor: "#1a53e4"}}>
                    <div className="logo">
                        <NavLink to="/admin" exact>
                            <img style={{width: 80}} src={require("../../assets/img/logo-white.svg").default} alt="logo" />
                        </NavLink>
                    </div>
                    <div className="menu">
                        <NavLink to="/admin" exact className="menu-item" activeClassName="active">
                            <span className="rounded-top"></span>
                            <i className="fas fa-th-large"></i> Dash Board
                            <span className="rounded-bottom"></span>
                        </NavLink>
                        <NavLink to="/admin/courses" exact className="menu-item" activeClassName="active">
                            <span className="rounded-top"></span>
                            <i className="fas fa-book-open"></i> Courses
                            <span className="rounded-bottom"></span>
                        </NavLink>
                        <NavLink to="/admin/users" exact className="menu-item" activeClassName="active">
                            <span className="rounded-top"></span>
                            <i className="fas fa-users"></i> Users
                            <span className="rounded-bottom"></span>
                        </NavLink>
                    </div>
                </Sider>
                <Layout className="site-layout" style={{backgroundColor: "white"}}>
                    <Header className="site-layout-background admin-header" style={{ padding: "1.5rem 2.4rem 0", backgroundColor: 'unset', lineHeight: 0}}>
                        <div className="admin-search">
                            <i className="fa fa-search"></i>
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="user-ctrl">
                            <div className="notify"><i className="fa fa-bell"></i></div>
                            <div className="info">
                                <img src={`https://ui-avatars.com/api/?name=${infoUser.hoTen}&background=black&color=ffffff&bold=true&font-size=0.4`} alt="ava" />
                                <span>{infoUser.taiKhoan}</span>
                                <i className="fa fa-caret-down"></i>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    }} />
}