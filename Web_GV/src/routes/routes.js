import { LoginLayout } from '../layout';

import Home from '../pages/Home';
import LichTheoTuan from '../pages/LichTheoTuan';
import KetQuaHocTap from '../pages/KetQuaHocTap';

import DangKyHocPhan from '../pages/DangKyHocPhan';
import SignIn from '../pages/Login';
import ChuongTrinhKhung from '../pages/ChuongTrinhKhung';
import routeConfig from '../configRoutes';
import ThongTinGiangVien from '../pages/ThongTinGiangVien';
import LichTheoTienDo from '../pages/LichTheoTienDo';
import DanhSachLopHP from '../pages/DanhSachLopHP/danhSachLopHP';
//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },

    {
        path: routeConfig.routeConfig.danhSachLopHP,
        component: DanhSachLopHP,
    },
    {
        path: routeConfig.routeConfig.lichTheoTuan,
        component: LichTheoTuan,
    },
    {
        path: routeConfig.routeConfig.thongTinGiangVien,
        component: ThongTinGiangVien,
    },

    {
        path: routeConfig.routeConfig.lichTheoTienDo,
        component: LichTheoTienDo,
    },
    {
        path: routeConfig.routeConfig.signIn,
        component: SignIn,
        layout: LoginLayout,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
