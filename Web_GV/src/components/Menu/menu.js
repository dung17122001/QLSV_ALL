import React from 'react';
import MenuItem from '../ItemMenu/MenuItem';
import classNames from 'classnames';
import style from './menu.scss';
import { FaHome, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
function Menu() {
    const cx = classNames.bind(style);
    const navigate = useNavigate();
    return (
        <>
            <div className={cx('menu')}>
                <div className={cx('flex flex-row items-center p-2')}>
                    <div className="text-xl">
                        <FaHome color="gray" />
                    </div>
                    <div
                        className="ml-2 text-gray-500 hover:cursor-pointer"
                        onClick={() => navigate(config.routeConfig.home)}
                    >
                        Trang chủ
                    </div>
                </div>
            </div>
            <div className={cx('menu')}>
                <div className={cx('flex flex-row items-center p-2')}>
                    <div className="text-xl">
                        <SlScreenDesktop color="gray" />
                    </div>
                    <div
                        className="ml-2 text-gray-500 hover:cursor-pointer"
                        onClick={() => navigate(config.routeConfig.thongTinGiangVien)}
                    >
                        Thông tin giảng viên
                    </div>
                </div>
            </div>
            <div className={cx('menu')}>
                <div className={cx('flex flex-row items-center p-2')}>
                    <div className="text-xl">
                        <FaCalendarAlt color="gray" />
                    </div>
                    <div
                        className="ml-2 text-gray-500 hover:cursor-pointer"
                        onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                    >
                        Lịch theo tuần
                    </div>
                </div>
            </div>

            {/* <MenuItem
                menuItems={[
                    {
                        name: 'Thông tin chung   ',
                        subItems: [
                            { name: 'Thông tin giảng viên', to: 'thong-tin-giang-vien' },
                            { name: 'Thông tin học tập', to: 'login' },
                        ],
                    },
                ]}
                icon={<SlScreenDesktop />}
            ></MenuItem> */}
            {/* <MenuItem
                menuItems={[
                    {
                        name: 'Học tập',
                        subItems: [
                            { name: 'Kết quả học tập', to: '' },
                            { name: 'Lịch theo tuần', to: 'login' },
                        ],
                    },
                ]}
                icon={<FaGraduationCap />}
            ></MenuItem> */}
            {/* <MenuItem
                menuItems={[
                    {
                        name: 'Đăng ký học phần',
                        subItems: [
                            { name: 'Chương trình khung', to: '' },
                            { name: 'Đăng ký học phần', to: 'login' },
                        ],
                    },
                ]}
                icon={<BsFillCalendar2CheckFill />}
            ></MenuItem> */}
        </>
    );
}

export default Menu;
