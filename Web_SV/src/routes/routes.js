import { LoginLayout } from '../layout';

import Home from '../pages/Home';
import LichTheoTuan from '../pages/LichTheoTuan';
import KetQuaHocTap from '../pages/KetQuaHocTap';

import DangKyHocPhan from '../pages/DangKyHocPhan';
import SignIn from '../pages/Login';
import ChuongTrinhKhung from '../pages/ChuongTrinhKhung';
import routeConfig from '../configRoutes';
import ThongTinSinhVien from '../pages/ThongTinSinhVien';
import LichTheoTienDo from '../pages/LichTheoTienDo';
//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.ketQuaHocTap,
        component: KetQuaHocTap,
    },
    {
        path: routeConfig.routeConfig.lichTheoTuan,
        component: LichTheoTuan,
    },
    {
        path: routeConfig.routeConfig.thongTinSinhVien,
        component: ThongTinSinhVien,
    },
    {
        path: routeConfig.routeConfig.dangKyHP,
        component: DangKyHocPhan,
    },
    {
        path: routeConfig.routeConfig.ChuongTrinhKhung,
        component: ChuongTrinhKhung,
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
