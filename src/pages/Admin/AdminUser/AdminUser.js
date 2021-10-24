import React, {useEffect} from 'react'
import "../Admin.scss";
import { Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getListUserAction, getListUserTypeAction } from '../../../redux/actions/QuanLyUserAction';
import { hideLoading, showLoading } from '../../../redux/actions/LoadingAction';

export default function AdminUser(props) {
    const { listUser, listUserType } = useSelector(state => state.QuanLyUserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListUserAction());
        dispatch(getListUserTypeAction());
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'hoTen',
            width: '16%',
            
        },
        {
            title: "Account",
            dataIndex: 'taiKhoan',
            width: '16%',
            
        },
        {
            title: 'Email', 
            dataIndex: 'email',
            width: '16%'
        },
        {
            title: 'Phone number',
            dataIndex: 'soDt',
            width: '16%',
        },
        {
            title: 'Position',
            dataIndex: 'maLoaiNguoiDung',
            width: '16%',
            render: (text, record, index) => {
                let type = listUserType?.find(type => type?.maLoaiNguoiDung === text);
                return <p><span className={`${type?.maLoaiNguoiDung.toLowerCase()}`}>{type?.tenLoaiNguoiDung}</span></p>
            }
        },
        {
            title: 'Actions',
            render: (text, record, index) => {
                return <div key={index} className="actions">
                    <button title="view" className="action-btn view"><i className="fa fa-eye"></i></button>
                    <button title="edit" className="action-btn edit"><i className="fa fa-edit"></i></button>
                    <button title="delete" className="action-btn delete"><i className="fa fa-trash"></i></button>
                </div>
            }
        }
    ];

    return (
        <div className="admin">
            <div className="admin-header">
                <h2 className="title">Users</h2>
                <button className="add-btn"><i className="fa fa-plus"></i> Add New User</button>
            </div>
            <Table rowKey={record => record.taiKhoan} className="admin-table" columns={columns} dataSource={listUser} />
        </div>
    )
}
