import routeConfig from './configRoutes';

import DangNhap from '~/page/Login';
import LoginLayout from '~/layout/LoginLayout';
import Home from '~/page/Home';
import SinhVien from '~/page/SinhVien';
import GiangVien from '~/page/NhanVien';
import Khoa from '../page/Khoa';
import DaoTao from '~/page/Daotao';
import MonHoc from '../page/Daotao/MonHoc';
import LopHocPhan from '../page/Daotao/LopHocPhan';
import Nganh from '../page/Daotao/Nganh';
import CoSoVatChat from '../page/CoSoVatChat';
import PhongHoc from '../page/CoSoVatChat/PhongHoc';
import DayNha from '../page/CoSoVatChat/DayNha';
import HocKy from '../page/Daotao/HocKy';
import LopHoc from '../page/Daotao/LopHocPhan';
import ChuongTrinhKhung from '../page/Daotao/ChuongTrinhKhung';

import DanhSachLopHoc from '../page/Daotao/DanhSachLopHoc';

import KetQuaHocTap from '~/page/Daotao/KetQuaHocTap';

//public

const route = routeConfig.routeConfig;

const publicRoutes = [
    {
        path: route.home,
        component: Home,
    },
    {
        path: route.dangnhap,
        component: DangNhap,
        layout: LoginLayout,
    },
    {
        path: route.sinhvien,
        component: SinhVien,
    },
    {
        path: route.khoa,
        component: Khoa,
    },
    {
        path: route.giangvien,
        component: GiangVien,
    },
    {
        path: route.daotao,
        component: DaoTao,
    },
    {
        path: route.cosovatchat,
        component: CoSoVatChat,
    },

    {
        path: route.lophocphan,
        component: LopHocPhan,
    },
    {
        path: route.monhoc,
        component: MonHoc,
    },
    {
        path: route.hocky,
        component: HocKy,
    },
    {
        path: route.nganh,
        component: Nganh,
    },
    {
        path: route.daynha,
        component: DayNha,
    },
    {
        path: route.phonghoc,
        component: PhongHoc,
    },
    {
        path: route.dslophp,
        component: DanhSachLopHoc,
    },
    {
        path: route.chuongtrinhkhung,
        component: ChuongTrinhKhung,
    },
    {
        path: route.kqht,
        component: KetQuaHocTap,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
