import React, { useEffect } from 'react'
import "../Admin.scss";
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getListCourseAction } from '../../../redux/actions/QuanLyKhoaHocAction';
import { openDrawerAction } from '../../../redux/actions/DrawerAction';

export default function AdminCourse(props) {

    const { listCourses } = useSelector(state => state.QuanLyKhoaHocReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListCourseAction());
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'tenKhoaHoc',
            width: '30%',
            render: (text, record, index) => {
                return <p>{text.length > 40 ? text.substring(0, 40) + "..." : text}</p>
            }
        },
        {
            title: "Image",
            dataIndex: 'hinhAnh',
            width: '10%',
            render: (text, record, index) => {
                return <img style={{ width: 60 }} src={text} alt={text} />
            }
        },
        {
            title: 'Create at', 
            dataIndex: 'ngayTao',
            width: '12%'
        },
        {
            title: 'Author',
            dataIndex: 'nguoiTao',
            width: '15%',
            render: (text, record, index) => {
                return <div key={index} className="author">
                    <img src={`https://ui-avatars.com/api/?name=${text.taiKhoan}&background=random&bold=true&font-size=0.4`} alt="ava" />
                    <div className="info">
                        <img src={`https://ui-avatars.com/api/?name=${text.taiKhoan}&background=random&bold=true&font-size=0.4`} alt="ava" />
                        <div className="content">
                            <p>Ho ten: {text.hoTen}</p>
                            <p>Account: {text.taiKhoan}</p>
                            <p>Chuc vu: <span className={`${text.maLoaiNguoiDung.toLowerCase()}`}>{text.tenLoaiNguoiDung}</span></p>
                        </div>
                    </div>
                </div>
            }
        },
        {
            title: 'Category',
            dataIndex: 'danhMucKhoaHoc',
            width: '15%',
            render: (text, record, index) => {
                return <p>{text.tenDanhMucKhoaHoc}</p>
            }
        },
        {
            title: 'Actions',
            width: '18%',
            render: (text, record, index) => {
                return <div key={index} className="actions">
                    <button title="view" className="action-btn view"><i className="fa fa-eye"></i></button>
                    <button onClick={openEditDrawer} title="edit" className="action-btn edit"><i className="fa fa-edit"></i></button>
                    <button title="delete" className="action-btn delete"><i className="fa fa-trash"></i></button>
                </div>
            }
        }
    ];

    const openAddDrawer = () => {
        dispatch(openDrawerAction("Add Course", <p>Add</p>))
    }

    const openEditDrawer = () => {
        dispatch(openDrawerAction("Edit Course", <p>Edit</p>))
    }

    return (
        <div className="admin">
            <div className="admin-header">
                <h2 className="title">Courses</h2>
                <button onClick={openAddDrawer} className="add-btn"><i className="fa fa-plus"></i> Add New Course</button>
            </div>
            <Table rowKey={record => record.maKhoaHoc} className="admin-table" columns={columns} dataSource={listCourses} />
        </div>
    )
}
