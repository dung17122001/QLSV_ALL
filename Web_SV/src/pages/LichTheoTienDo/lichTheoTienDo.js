import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import classNames from 'classnames';
import style from './lichTheoTienDo.scss';
import Menu from '../../components/Menu/menu';
import { FaAlignJustify } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import { getLichTheoLHP, themLich, getChiTietLichByMaSinhVienAndLopHP, getLichDaDKTheoHK } from '~/service/lichService';
function LichTheoTienDo() {
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    let userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [selectedValue, setSelectedValue] = useState('all');

    const handleRadioButtonChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //Tháng trong javascript bắt đầu từ 0
    var yyyy = today.getFullYear();

    today = yyyy + '-' + dd + '-' + mm;

    const [date, setDate] = useState(today);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };
    const [showMenu, setShowMenu] = useState(false);
    function Menu1() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
    }

    const [listLich, setListLich] = useState([]);
    const [listHK, setListHK] = useState([]);

    const [selectedHK, setSelectedHK] = useState(null);
    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!userLogin.khoaHoc) {
                    const startYear = userLogin.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = userLogin.khoaHoc?.tenKhoaHoc.substring(5);
                    const list = await getHocKyTheoKhoaHoc(
                        `${startYear}-08-01`,
                        `${endYear}-06-01`,
                        accessToken,
                        axiosJWT,
                    );
                    setListHK(list);
                    if (list.length > 0) {
                        setSelectedHK(list[0].maHocKy);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        getHocKyByKhoaHoc();
    }, [userLogin]);

    const handleChangeHK = async (event) => {
        setSelectedHK(event.target.value);
    };

    useEffect(() => {
        const TatCaLich = async () => {
            const listALLLichByHK = await getLichDaDKTheoHK(userLogin.maSinhVien, selectedHK, accessToken, axiosJWT);
            if (!!listALLLichByHK) {
                let filteredListLich;
                if (selectedValue === 'lichThi') {
                    filteredListLich = listALLLichByHK.filter((lich) => lich.trangThai === 'Lịch thi');
                } else if (selectedValue === 'lichHoc') {
                    filteredListLich = listALLLichByHK.filter((lich) => lich.trangThai === 'Bình thường');
                } else {
                    filteredListLich = listALLLichByHK;
                }
                let map = new Map();
                filteredListLich.forEach((item) => {
                    if (
                        !map.has(
                            item.nhomThucHanh?.maNhom && item.caHoc.tenCaHoc && days[new Date(item.ngayHoc).getDay()],
                        )
                    ) {
                        map.set(item.nhomThucHanh?.maNhom, item);
                    }
                });
                let filteredList = Array.from(map.values());
                setListLich(filteredList);
                console.log(listALLLichByHK);
            }
        };

        TatCaLich();
    }, [selectedValue, selectedHK]);

    return (
        <>
            <div className="flex flex-row w-full h-full bg-gray-200 pt-3 ">
                <span className="w-1/12 mt-10">
                    <FaAlignJustify size={25} onClick={Menu1} />
                    <div className={showMenu ? '' : 'hidden'}>
                        <span className="w-52 absolute  border border-sv-blue-4 bg-white">
                            <Menu />
                        </span>
                    </div>
                </span>
                <div className="w-10/12 h-full flex flex-row">
                    <div className="w-full bg-white h-auto border rounded ">
                        <div className="w-full h-12 border-b-2">
                            <div className="flex justify-between p-2">
                                <div className="text-xl font-bold text-sv-text-2 ">Lịch học, lịch thi theo tiến độ</div>

                                <div className="flex flex-row text-sm">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="all"
                                            checked={selectedValue === 'all'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Tất cả</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="lichHoc"
                                            checked={selectedValue === 'lichHoc'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Lịch học</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="lichThi"
                                            checked={selectedValue === 'lichThi'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Lịch thi</span>
                                    </label>
                                    <div className="relative border border-gray-400 ml-2">
                                        <select
                                            className="text-sv-text-2 border h-full border-sv-blue-4 "
                                            value={selectedHK}
                                            onChange={handleChangeHK}
                                        >
                                            {listHK?.map((option) => (
                                                <option key={option.maHocKy} value={option.maHocKy}>
                                                    {option.tenHocKy}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="ml-4 flex items-center"></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <table className={cx('table-lttd')}>
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>STT</th>
                                        <th rowSpan={2}>Mã học phần</th>
                                        <th rowSpan={2}>Tên môn học/học phần</th>
                                        <th rowSpan={2}>Số tín chỉ</th>
                                        <th rowSpan={1} colSpan={6}>
                                            Thông tin lịch
                                        </th>
                                        <th rowSpan={1} colSpan={2}>
                                            Thời gian
                                        </th>
                                        <th rowSpan={2}>Mã giảng viên</th>
                                        <th rowSpan={2}>Giảng viên</th>
                                    </tr>
                                    <tr>
                                        <th>Thứ</th>
                                        <th>Tiết</th>
                                        <th>Loại lịch</th>
                                        <th>Phòng</th>
                                        <th>Nhóm</th>
                                        <th>Giờ</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listLich.map((item, index) => (
                                        <tr
                                            className={`${
                                                item.trangThai === 'Lịch thi' ? 'bg-orange-200' : ''
                                            } hover:cursor-pointer`}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan}</td>
                                            <td>{item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}</td>
                                            <td>
                                                {item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT +
                                                    item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH}
                                            </td>
                                            <td>{days[new Date(item.ngayHoc).getDay()]}</td>
                                            <td>{item.caHoc.tenCaHoc}</td>
                                            <td>{item.loaiLich}</td>
                                            <td>{item.phong.tenPhong}</td>
                                            <td>
                                                {item.nhomThucHanh.tenNhom !== 'Nhóm 0'
                                                    ? item.nhomThucHanh.tenNhom
                                                    : ''}
                                            </td>
                                            <td>
                                                {item.caHoc.gioBD.substring(0, 5) +
                                                    '-' +
                                                    item.caHoc.gioKT.substring(0, 5)}
                                            </td>
                                            <td>{convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayBatDau)}</td>
                                            <td>{convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayKetThuc)}</td>
                                            <td>{item.nhanVien.maNhanVien}</td>
                                            <td>{item.nhanVien.tenNhanVien}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="ghichu flex flex-row p-2 item-center">
                            <div className="ml-2 h-4 flex items-center">
                                <b>Ghi chú</b>
                            </div>
                            <div className="h-4 w-10 bg-white ml-4 border"></div>
                            <div className="ml-2 h-4 flex items-center">
                                <p>Lịch học</p>
                            </div>
                            <div className="h-4 w-10 bg-orange-300 ml-4"></div>
                            <div className="ml-2 h-4 flex items-center">
                                <p>Lịch thi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LichTheoTienDo;
