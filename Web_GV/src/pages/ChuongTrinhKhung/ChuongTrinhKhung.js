import React, { useState } from 'react';
import MenuItem from '../../components/ItemMenu';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import classNames from 'classnames';
import style from './ChuongTrinhKhung.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const cx = classNames.bind(style);

var sttMon = 1;

function ChuongTrinhKhung() {
    const [display, setDisplay] = useState('');

    const handleDisplay = (maHK) => {
        // console.log('1 ' + maHK);
        display === `${maHK}` ? setDisplay('') : setDisplay(`${maHK}`);
    };
    const listHocKy = [
        {
            maHocKy: 'hk1',
            tenHocKy: 'Học kỳ 1',
            soTC: 11,
            listMonBB: [
                {
                    tenMon: 'Nhập môn Lập trình',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
                {
                    tenMon: 'Nhập môn Lập trình',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
            ],
        },
        {
            maHocKy: 'hk2',
            tenHocKy: 'Học kỳ 2',
            soTC: 17,
        },
        {
            maHocKy: 'hk3',
            tenHocKy: 'Học kỳ 3',
            soTC: 22,
            listMonBB: [
                {
                    tenMon: 'Lập trình hướng sự kiện với công nghệ Java',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
                {
                    tenMon: 'Nhập môn Lập trình',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
            ],
            listMonTC: [
                {
                    tenMon: 'C#',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
                {
                    tenMon: 'Python',
                    maHocPhan: '7464447834',
                    hocPhan: [],
                    soTC: 3,
                    soTietLT: 2,
                    soTietTH: 1,
                    nhom: 3,
                    soTCBatBuoc: '',
                    dat: true,
                },
            ],
        },
        {
            maHocKy: 'hk4',
            tenHocKy: 'Học kỳ 4',
            soTC: 11,
        },
        {
            maHocKy: 'hk5',
            tenHocKy: 'Học kỳ 5',
            soTC: 15,
        },
        {
            maHocKy: 'hk6',
            tenHocKy: 'Học kỳ 6',
            soTC: 11,
        },
        {
            maHocKy: 'hk7',
            tenHocKy: 'Học kỳ 7',
            soTC: 20,
        },
        {
            maHocKy: 'hk8',
            tenHocKy: 'Học kỳ 8',
            soTC: 10,
        },
    ];
    return (
        <div className="w-full h-max bg-gray-100 flex flex-row">
            <div className="w-1/12"></div>
            <div className="w-10/12 mt-2 flex flex-row">
                <div className="w-1/6 h-min bg-white">
                    <div className={cx('menu')}>
                        <div className={cx('flex flex-row items-center p-2')}>
                            <div className="text-xl">
                                <FaHome color="gray" />
                            </div>
                            <div className="ml-2 text-gray-500 hover:cursor-pointer">Trang chủ</div>
                        </div>
                    </div>
                    <MenuItem
                        menuItems={[
                            {
                                name: 'Thông tin chung',
                                subItems: [
                                    { name: 'Thông tin sinh viên', to: '' },
                                    { name: 'Thông tin học tập', to: 'login' },
                                ],
                            },
                        ]}
                        icon={<SlScreenDesktop />}
                    ></MenuItem>
                    <MenuItem
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
                    ></MenuItem>
                    <MenuItem
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
                    ></MenuItem>
                </div>
                <div className="w-5/6 bg-white ml-4">
                    <div className="text-xl text-sv-blue-5 m-4">
                        <b>Đăng ký học phần</b>
                    </div>
                    <div className="border-t border-gray-200 m-2"></div>
                    <div className="m-2">
                        <div className="">
                            <table className={cx('table-dkhp')}>
                                <thead className="text-sv-blue-5">
                                    <tr className={cx(' bg-blue-100')}>
                                        <th className={cx('')}>STT</th>
                                        <th className={cx('w-72')}>Tên môn học/học phần</th>
                                        <th className={cx('')}>Mã học phần</th>
                                        <th className={cx('')}>Học phần</th>
                                        <th className={cx('')}>Số TC</th>
                                        <th className={cx('')}>Số tiết LT</th>
                                        <th className={cx('')}>Số tiết TH</th>
                                        <th>Nhóm tự chọn</th>
                                        <th>Số TC bắt buộc của nhóm</th>
                                        <th>Đạt</th>
                                    </tr>
                                </thead>

                                {listHocKy.map((item, index) => (
                                    <tbody key={item.maHocKy + index}>
                                        <tr
                                            className=" bg-orange-100 hover:cursor-pointer font-bold text-sv-blue-5 transition delay-700"
                                            onClick={() => handleDisplay(item.maHocKy)}
                                        >
                                            <td colSpan={4}>{item.tenHocKy}</td>
                                            <td>{item.soTC}</td>
                                            <td colSpan={5}></td>
                                        </tr>

                                        <tr className={display === `${item.maHocKy}` ? ' hidden ' : ''}>
                                            <td colSpan={10}></td>
                                        </tr>
                                        <tr className={display === `${item.maHocKy}` ? ' ' : ' hidden '}>
                                            <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                Học phần bắt buộc
                                            </td>
                                            <td className="font-bold text-sv-blue-5 ">{item.soTC}</td>
                                            <td colSpan={5} className="font-bold text-sv-blue-5 "></td>
                                        </tr>
                                        {item.listMonBB?.map((itemSub, index) => (
                                            <tr
                                                className={display === `${item.maHocKy}` ? ' ' : ' hidden '}
                                                key={item + index + 'sub'}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{itemSub.tenMon}</td>
                                                <td>{itemSub.maHocPhan}</td>
                                                <td></td>
                                                <td>{itemSub.soTC}</td>
                                                <td>{itemSub.soTietLT}</td>
                                                <td>{itemSub.soTietTH}</td>
                                                <td>{itemSub.nhom}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                        <tr
                                            className={
                                                item.listMonTC && display === `${item.maHocKy}` ? ' ' : ' hidden '
                                            }
                                        >
                                            <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                Học phần tự chọn
                                            </td>
                                            <td className="font-bold text-sv-blue-5 ">{item.soTC}</td>
                                            <td className="font-bold text-sv-blue-5 " colSpan={5}></td>
                                        </tr>
                                        {item.listMonTC?.map((itemSub, index) => (
                                            <tr
                                                className={display === `${item.maHocKy}` ? ' ' : ' hidden '}
                                                key={item + index + 'subTC'}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{itemSub.tenMon}</td>
                                                <td>{itemSub.maHocPhan}</td>
                                                <td></td>
                                                <td>{itemSub.soTC}</td>
                                                <td>{itemSub.soTietLT}</td>
                                                <td>{itemSub.soTietTH}</td>
                                                <td>{itemSub.nhom}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ))}
                                <tr className="bg-orange-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC yêu cầu
                                    </td>
                                    <td className="font-bold text-red-500 ">128</td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr className="bg-orange-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC bắt buộc
                                    </td>
                                    <td className="font-bold text-red-500 ">96</td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr className="bg-orange-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC tự chọn
                                    </td>
                                    <td className="font-bold text-red-500 ">32</td>
                                    <td colSpan={5}></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="ml-2 text-gray-400 text-xs">
                        <i>
                            Ghi chú: Những môn học/Học phần có dấu <span className="text-red-500">*</span> không được
                            tính vào Trung bình tích lũy
                        </i>
                    </div>
                    <div className="flex flex-row ml-2 mt-4 items-center text-gray-400 text-xs">
                        <div className="h-4 w-10 bg-blue-200"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <i>Môn học, học phần đã (hoặc đang) học</i>
                        </div>
                        <div className="h-4 w-10 bg-white ml-4 border border-gray-500"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <i>Môn học sinh viên chưa đăng ký học tập</i>
                        </div>
                        <div className="ml-4">
                            <BsFillCheckCircleFill color="green" size={18}></BsFillCheckCircleFill>
                        </div>
                        <div className="ml-2 h-4 flex items-center">
                            <i>Đạt</i>
                        </div>
                        <div className="ml-4">
                            <AiFillCloseCircle color="red" size={20}></AiFillCloseCircle>
                        </div>
                        <div className="ml-2 h-4 flex items-center">
                            <i>Không đạt</i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/12"></div>
        </div>
    );
}

export default ChuongTrinhKhung;
