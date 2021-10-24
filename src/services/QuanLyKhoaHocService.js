import { MA_NHOM } from "../util/Setting/config";
import { BaseService } from "./BaseService";

class QuanLyKhoaHocService extends BaseService {
    getListCourse = () => {
        return this.get(`api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${MA_NHOM}`);
    }
    getListCourseByCategory = (idCate) => {
        return this.get(`api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${idCate}&MaNhom=${MA_NHOM}`)
    }
    getListCategory = () => {
        return this.get(`api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
    }
    searchCourseService = (keyWord) => {
        return this.get(`api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyWord}&MaNhom=${MA_NHOM}`);
    }
    getInfoCourseService = (id) => {
        return this.get(`api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`);
    }
}

export const quanLyKhoaHocService = new QuanLyKhoaHocService();