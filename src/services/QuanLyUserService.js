import { MA_NHOM } from "../util/Setting/config";
import { BaseService } from "./BaseService";

class QuanLyUserService extends BaseService {
    loginService = (data) => {
        return this.post("api/QuanLyNguoiDung/DangNhap", data);
    }
    signupService = (data) => {
        return this.post("api/QuanLyNguoiDung/DangKy", data);
    }
    getInfoUser = () => {
        return this.post("api/QuanLyNguoiDung/ThongTinNguoiDung");
    }
    enrollCourseService = (model) => {
        return this.post("api/QuanLyKhoaHoc/DangKyKhoaHoc", model);
    }
    getListUserService = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`);
    }
    getListUserTypeService = () => {
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
}

export const quanLyUserService = new QuanLyUserService();