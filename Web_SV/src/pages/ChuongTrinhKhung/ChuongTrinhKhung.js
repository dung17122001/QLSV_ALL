import React, { useEffect, useState } from 'react';
import MenuItem from '../../components/ItemMenu';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import classNames from 'classnames';
import style from './ChuongTrinhKhung.module.scss';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Menu from '../../components/Menu/menu';
import { getChuongTrinhKhungByMaSV } from '~/service/hocPhanService';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import { getBangDiemCuaSV } from '~/service/lopHocPhanService';
const cx = classNames.bind(style);

var sttMon = 1;

function ChuongTrinhKhung() {
    let sttHP = 1;
    var currSV = useSelector((state) => state.persistedReducer.signIn.userLogin);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData?.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [listHocPhan, setListHocPhan] = useState();
    const [listHocKy, setListHocKy] = useState();
    const [display, setDisplay] = useState('');
    const [listBangDiemSV, setListBangDiemSV] = useState();

    var tongSoTCBB = 0,
        tongSoTCTC = 0;

    const tinhTongSoTC = () => {
        if (!!listHocPhan && listHocPhan.length > 0) {
            for (let i = 0; i < listHocPhan.length; i++) {
                if (listHocPhan[i].trangThai === 'Tự chọn')
                    tongSoTCTC += listHocPhan[i].hocPhan.monHoc.soTCLT + listHocPhan[i].hocPhan.monHoc.soTCTH;
                else tongSoTCBB += listHocPhan[i].hocPhan.monHoc.soTCLT + listHocPhan[i].hocPhan.monHoc.soTCTH;
            }
        }
    };
    tinhTongSoTC();

    const handleDisplay = (maHK) => {
        // console.log('1 ' + maHK);
        display === `${maHK}` ? setDisplay('') : setDisplay(`${maHK}`);
    };

    function layHocKy(str) {
        // Sử dụng biểu thức chính quy để tìm chuỗi con nằm giữa dấu ngoặc đơn
        const regex = /(\w+)\(\d+-\d+\)/;
        const match = str.match(regex);
        if (match && match.length > 1) {
            // Trả về giá trị nằm trong nhóm con đầu tiên của kết quả match
            return match[1];
        } else {
            // Trả về null nếu không tìm thấy
            return null;
        }
    }

    const renderDanhSachDieuKien = (item) => {
        let arrFilterHocTruoc = item.danhSachMonHocHocTruoc?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (a)</span>
                </>
            );
        });
        let arrFilterTienQuyet = item.danhSachMonHocTienQuyet?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (b)</span>
                </>
            );
        });
        let arrFilterSongHanh = item.danhSachMonHocSongHanh?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (c)</span>
                </>
            );
        });
        let newArrDieuKien = [...arrFilterHocTruoc, ...arrFilterTienQuyet, ...arrFilterSongHanh];

        let nodeDieuKien = [];
        for (let i = 0; i < newArrDieuKien.length - 1; i++) {
            let data = newArrDieuKien[i];
            let CompDieuKien = <>{data}, </>;
            nodeDieuKien = [...nodeDieuKien, CompDieuKien];
        }
        nodeDieuKien = [...nodeDieuKien, newArrDieuKien[newArrDieuKien.length - 1]];

        return nodeDieuKien;
    };

    useEffect(() => {
        const getChuongTrinhKhung = async () => {
            let result = await getChuongTrinhKhungByMaSV(currSV?.maSinhVien, accessToken, axiosJWT);
            // console.log(result);
            setListHocPhan(result);
        };
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!currSV.khoaHoc) {
                    const startYear = currSV?.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = currSV?.khoaHoc?.tenKhoaHoc.substring(5);
                    var list = await getHocKyTheoKhoaHoc(
                        `${startYear}-08-01`,
                        `${endYear}-06-01`,
                        accessToken,
                        axiosJWT,
                    );
                    setListHocKy(list);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const getBangDiem = async () => {
            let result = await getBangDiemCuaSV(currSV?.maSinhVien, accessToken, axiosJWT);
            //console.log(result);
            setListBangDiemSV(result);
        };
        getHocKyByKhoaHoc();
        getChuongTrinhKhung();
        getBangDiem();
    }, []);
    return (
        <div className="w-full h-max bg-gray-100 flex flex-row pb-6">
            <div className="w-1/12"></div>
            <div className="w-10/12 mt-2 flex flex-row">
                <div className="w-1/6 h-min bg-white">
                    <Menu />
                </div>
                <div className="w-5/6 bg-white ml-4">
                    <div className="text-xl text-sv-blue-5 m-4">
                        <b>Chương trình khung</b>
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
                                        <th className={cx('')}>Điều kiện</th>
                                        <th className={cx('')}>Số TC</th>
                                        <th className={cx('')}>Số tiết LT</th>
                                        <th className={cx('')}>Số tiết TH</th>

                                        <th>Đạt</th>
                                    </tr>
                                </thead>

                                {listHocKy?.map((item, index) => {
                                    return (
                                        <tbody key={item.maHocKy + index}>
                                            <tr
                                                className=" bg-blue-100 hover:cursor-pointer font-bold text-sv-blue-5 transition delay-700"
                                                onClick={() => handleDisplay(item.maHocKy)}
                                            >
                                                <td colSpan={4}>{item.tenHocKy}</td>
                                                <td></td>
                                                <td colSpan={5}></td>
                                            </tr>

                                            <tr className={display === `${item.maHocKy}` ? ' hidden ' : ''}>
                                                <td colSpan={10}></td>
                                            </tr>
                                            <tr className={display === `${item.maHocKy}` ? ' ' : ' hidden '}>
                                                <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                    Học phần bắt buộc
                                                </td>
                                                <td className="font-bold text-sv-blue-5 "></td>
                                                <td colSpan={3} className="font-bold text-sv-blue-5 "></td>
                                            </tr>
                                            {listHocPhan?.map((itemSub, indexSub1) => {
                                                let diem = listBangDiemSV.find(
                                                    (e) => e.hocPhan.maHocPhan === itemSub.hocPhan.maHocPhan,
                                                );
                                                let pass = listBangDiemSV.find(
                                                    (e) =>
                                                        e.hocPhan.maHocPhan === itemSub.hocPhan.maHocPhan &&
                                                        e.trangThai === 'Đạt',
                                                );
                                                //console.log(pass);
                                                return itemSub.trangThai === 'Bắt buộc' &&
                                                    itemSub.hocKy.maHocKy === item.maHocKy ? (
                                                    <tr
                                                        className={
                                                            display === `${item.maHocKy}`
                                                                ? ` ${!!diem ? 'bg-orange-100' : ''} `
                                                                : `hidden `
                                                        }
                                                        key={item + indexSub1 + 'sub'}
                                                    >
                                                        <td>{sttHP++}</td>
                                                        <td align="left">{itemSub.hocPhan.tenHocPhan}</td>
                                                        <td>{itemSub.hocPhan.maHocPhan}</td>
                                                        <td>{renderDanhSachDieuKien(itemSub.hocPhan.monHoc)}</td>
                                                        <td>
                                                            {itemSub.hocPhan.monHoc.soTCLT +
                                                                itemSub.hocPhan.monHoc.soTCTH}
                                                        </td>

                                                        <td>{itemSub.hocPhan.monHoc.soTCLT * 15}</td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCTH * 30}</td>

                                                        <td align="center">
                                                            <div
                                                                className={
                                                                    display === `${item.maHocKy}`
                                                                        ? ` ${!!diem ? '' : 'hidden'} `
                                                                        : `hidden `
                                                                }
                                                            >
                                                                {!!pass ? (
                                                                    <BsFillCheckCircleFill color="green"></BsFillCheckCircleFill>
                                                                ) : (
                                                                    <AiFillCloseCircle
                                                                        color="red"
                                                                        size={22}
                                                                    ></AiFillCloseCircle>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                            <tr className={display === `${item.maHocKy}` ? ' ' : ' hidden '}>
                                                <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                    Học phần tự chọn
                                                </td>
                                                <td className="font-bold text-sv-blue-5 ">{item.soTC}</td>
                                                <td colSpan={3} className="font-bold text-sv-blue-5 "></td>
                                            </tr>
                                            {listHocPhan?.map((itemSub, indexSub2) => {
                                                let diem = listBangDiemSV.find(
                                                    (e) => e.hocPhan.maHocPhan === itemSub.hocPhan.maHocPhan,
                                                );
                                                let pass = listBangDiemSV.find(
                                                    (e) =>
                                                        e.hocPhan.maHocPhan === itemSub.hocPhan.maHocPhan &&
                                                        e.trangThai === 'Đạt',
                                                );
                                                return itemSub.trangThai === 'Tự chọn' &&
                                                    itemSub.hocKy.maHocKy === item.maHocKy ? (
                                                    <tr
                                                        className={
                                                            display === `${item.maHocKy}`
                                                                ? ` ${!!diem ? 'bg-orange-100' : ''} `
                                                                : `hidden `
                                                        }
                                                        key={item + indexSub2 + 'sub'}
                                                    >
                                                        <td>{sttHP++}</td>
                                                        <td align="left">{itemSub.hocPhan.tenHocPhan}</td>
                                                        <td>{itemSub.hocPhan.maHocPhan}</td>
                                                        <td>{renderDanhSachDieuKien(itemSub.hocPhan.monHoc)}</td>
                                                        <td>
                                                            {itemSub.hocPhan.monHoc.soTCLT +
                                                                itemSub.hocPhan.monHoc.soTCTH}
                                                        </td>

                                                        <td>{itemSub.hocPhan.monHoc.soTCLT * 15}</td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCTH * 30}</td>

                                                        <td align="center">
                                                            <div
                                                                className={
                                                                    display === `${item.maHocKy}`
                                                                        ? ` ${!!diem ? '' : 'hidden'} `
                                                                        : `hidden `
                                                                }
                                                            >
                                                                {!!pass ? (
                                                                    <BsFillCheckCircleFill color="green"></BsFillCheckCircleFill>
                                                                ) : (
                                                                    <AiFillCloseCircle
                                                                        color="red"
                                                                        size={22}
                                                                    ></AiFillCloseCircle>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <></>
                                                );
                                            })}
                                        </tbody>
                                    );
                                })}
                                <tr className="bg-blue-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC yêu cầu
                                    </td>
                                    <td className="font-bold text-red-500 ">
                                        {!!listHocPhan && listHocPhan[0]?.chuongTrinhKhung.tongSoTinChi}
                                    </td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr className="bg-blue-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC bắt buộc
                                    </td>
                                    <td className="font-bold text-red-500 ">{tongSoTCBB}</td>
                                    <td colSpan={5}></td>
                                </tr>
                                <tr className="bg-blue-100">
                                    <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                        Tổng số TC tự chọn
                                    </td>
                                    <td className="font-bold text-red-500 ">
                                        {!!listHocPhan &&
                                            listHocPhan[0]?.chuongTrinhKhung.tongSoTinChi * 1 - tongSoTCBB * 1}
                                    </td>
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
                    <div className="flex flex-row ml-2 mt-4 items-center text-gray-400 text-xs pb-2">
                        <div className="h-4 w-10 bg-orange-100"></div>
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
