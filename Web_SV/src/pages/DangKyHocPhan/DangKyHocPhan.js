import React, { useState, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import classNames from 'classnames';
import style from './DangKyHocPhan.scss';
import Button from '@mui/material/Button';
import Menu from '../../components/Menu/menu';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify } from 'react-icons/fa';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { findHocPhanByMaSinhVienAndMaNganh } from '~/service/hocPhanService';
import { countSinhVienByNTH } from '../../service/sinhVienService';
import {
    getLopHocPhanMaHP,
    getBangDiemTheoSVAndMH,
    getLopHocPhanByMaLHP,
    updateLopHocPhan,
    getBangDiemKhongDat,
    updateTrangThaiBangDiem,
    getBangDiemDat,
    getLopHocPhanTheoMaHP,
} from '../../service/lopHocPhanService';
import {
    getLichTheoLHP,
    themLich,
    getChiTietLichByMaSinhVienAndLopHP,
    getLichDaDKTheoHK,
    getLichTheoLHPAndNhomTH,
} from '~/service/lichService';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import Box from '@mui/material/Box';
import { FaRegWindowClose } from 'react-icons/fa';

import {
    getTatCaChiTietPhieu,
    getChiTietPhieuDKByMaSinhVien,
    deleteChiTietPDKByMaPhieuDKAndMaNhomTH,
} from '../../service/phieuDKHP';
import {
    getPhieuDKByHocKyMaSinhVien,
    themPhieuDangKy,
    themChiTietPhieuDangKy,
    getChiTietPhieuDKByHocKyAndSinhVien,
} from '../../service/phieuDKHP';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const cx = classNames.bind(style);

function DangKyHocPhan() {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    let userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [listHocPhan, setListHocPhan] = useState([]);

    const [listLHP, setListLHP] = useState([]);
    const [listHK, setListHK] = useState([]);

    const [selectedHK, setSelectedHK] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [huyLHP, setHuyLHP] = useState();

    const handleConfirmation = (item, index) => {
        setShowConfirmation(true);
        setHuyLHP(item);
    };

    const handleConfirm = async () => {
        // Xử lý logic khi người dùng đồng ý
        await handleDeleteClick(huyLHP);
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        // Xử lý logic khi người dùng từ chối
        setShowConfirmation(false);
    };

    useEffect(() => {
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!userLogin.khoaHoc) {
                    const startYear = userLogin?.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = userLogin?.khoaHoc?.tenKhoaHoc.substring(5);
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

    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const [listDK, setListDK] = useState([]);
    const [listLHPDK, setListLHPDK] = useState([]);
    const [listLich, setListLich] = useState([]);
    const [listDaDK, setListDaDK] = useState([]);
    const [open, setOpen] = useState(false);
    const [listLichTheoHK, setListLichTheoHK] = useState();
    const [checkTrung, setCheckTrung] = useState(false);
    const [selectedLoai, setSelectedLoai] = useState('LDK001');
    var countDK = 0;
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;

        const getALLHocPhan = async () => {
            setListHocPhan([]);
            setListLHP([]);
            setListLich([]);
            if (selectedLoai === 'LDK002') {
                const BangDiemKhongDat = async () => {
                    const bangDiemKhongDat = await getBangDiemKhongDat(userLogin.maSinhVien, accessToken, axiosJWT);
                    setListHocPhan(bangDiemKhongDat);
                    var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );
                    const filteredList = [];
                    let filteredArr = [...bangDiemKhongDat];
                    for (let i = 0; i < listChiTietPhieu.length; i++) {
                        filteredArr = filteredArr.filter(
                            (item) =>
                                item.hocPhan.maHocPhan !==
                                listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                        );
                    }

                    if (!isMounted) {
                        return; // component unmounted, aborting
                    }

                    setListHocPhan(filteredArr);
                    let dk = null;
                    if (listChiTietPhieu.length === 1) {
                        setListDaDK(listChiTietPhieu);
                    } else if (listChiTietPhieu.length > 1) {
                        for (let i = 0; i < listChiTietPhieu.length; i++) {
                            let dk = listChiTietPhieu[i]; // Gán giá trị ban đầu của dk là phần tử i
                            let isDuplicate = false; // Đánh dấu xem có bị trùng hay không

                            // Duyệt qua các phần tử còn lại trong danh sách
                            for (let j = i + 1; j < listChiTietPhieu.length; j++) {
                                // Kiểm tra điều kiện lọc
                                if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[j].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[j]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                } else if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[i].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[i]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                }
                            }

                            if (!isDuplicate) {
                                dk = listChiTietPhieu[i]; // Nếu không bị trùng, gán lại giá trị của dk
                            }

                            filteredList.push(dk); // Sau khi duyệt qua tất cả các phần tử j, đẩy giá trị dk vào danh sách lọc
                        }
                        // console.log(filteredList);
                        const uniqueListDK = filteredList.filter((item, index, self) => {
                            // Lọc các mục có giá trị thuộc tính 'maPhieuDangKy' duy nhất
                            return (
                                self.findIndex(
                                    (i) =>
                                        i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                                ) === index
                            );
                        });

                        setListDaDK(uniqueListDK);
                    }
                };
                BangDiemKhongDat();
            } else if (selectedLoai === 'LDK003') {
                const BangDiemDat = async () => {
                    const bangDiemDat = await getBangDiemDat(userLogin.maSinhVien, accessToken, axiosJWT);
                    setListHocPhan(bangDiemDat);
                    var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );
                    const filteredList = [];
                    let filteredArr = [...bangDiemDat];
                    for (let i = 0; i < listChiTietPhieu.length; i++) {
                        filteredArr = filteredArr.filter(
                            (item) =>
                                item.hocPhan.maHocPhan !==
                                listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                        );
                    }

                    if (!isMounted) {
                        return; // component unmounted, aborting
                    }

                    setListHocPhan(filteredArr);
                    let dk = null;
                    if (listChiTietPhieu.length === 1) {
                        setListDaDK(listChiTietPhieu);
                    } else if (listChiTietPhieu.length > 1) {
                        for (let i = 0; i < listChiTietPhieu.length; i++) {
                            let dk = listChiTietPhieu[i]; // Gán giá trị ban đầu của dk là phần tử i
                            let isDuplicate = false; // Đánh dấu xem có bị trùng hay không

                            // Duyệt qua các phần tử còn lại trong danh sách
                            for (let j = i + 1; j < listChiTietPhieu.length; j++) {
                                // Kiểm tra điều kiện lọc
                                if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[j].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[j]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                } else if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[i].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[i]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                }
                            }

                            if (!isDuplicate) {
                                dk = listChiTietPhieu[i]; // Nếu không bị trùng, gán lại giá trị của dk
                            }

                            filteredList.push(dk); // Sau khi duyệt qua tất cả các phần tử j, đẩy giá trị dk vào danh sách lọc
                        }
                        // console.log(filteredList);
                        const uniqueListDK = filteredList.filter((item, index, self) => {
                            // Lọc các mục có giá trị thuộc tính 'maPhieuDangKy' duy nhất
                            return (
                                self.findIndex(
                                    (i) =>
                                        i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                                ) === index
                            );
                        });

                        setListDaDK(uniqueListDK);
                    }
                };
                BangDiemDat();
            } else {
                try {
                    let getHocPhan = await findHocPhanByMaSinhVienAndMaNganh(
                        userLogin?.maSinhVien,
                        userLogin?.lopHoc.nganhHoc.maNganh,
                        accessToken,
                        axiosJWT,
                    );

                    if (!isMounted) {
                        return; // component unmounted, aborting
                    }

                    let getTatCaCTPhieuDKBySinhvien = await getChiTietPhieuDKByMaSinhVien(
                        userLogin?.maSinhVien,
                        accessToken,
                        axiosJWT,
                    );
                    const listALLChiTietPhieu = getTatCaCTPhieuDKBySinhvien.filter(
                        (item) => item.nhomThucHanh?.tenNhom === 'Nhóm 0',
                    );

                    let filteredArr = [...getHocPhan];

                    for (let i = 0; i < listALLChiTietPhieu.length; i++) {
                        filteredArr = filteredArr.filter(
                            (item) =>
                                item.hocPhan.maHocPhan !==
                                listALLChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                        );
                    }

                    if (!isMounted) {
                        return; // component unmounted, aborting
                    }

                    setListHocPhan(filteredArr);
                    var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );
                    const filteredList = [];
                    let dk = null;
                    if (listChiTietPhieu.length === 1) {
                        setListDaDK(listChiTietPhieu);
                    } else if (listChiTietPhieu.length > 1) {
                        for (let i = 0; i < listChiTietPhieu.length; i++) {
                            let dk = listChiTietPhieu[i]; // Gán giá trị ban đầu của dk là phần tử i
                            let isDuplicate = false; // Đánh dấu xem có bị trùng hay không

                            // Duyệt qua các phần tử còn lại trong danh sách
                            for (let j = i + 1; j < listChiTietPhieu.length; j++) {
                                // Kiểm tra điều kiện lọc
                                if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[j].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[j]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                } else if (
                                    listChiTietPhieu[i].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        listChiTietPhieu[j].nhomThucHanh.lopHocPhan.hocPhan.maHocPhan &&
                                    listChiTietPhieu[i].nhomThucHanh.tenNhom !== 'Nhóm 0'
                                ) {
                                    dk = listChiTietPhieu[i]; // Nếu thỏa điều kiện, gán lại giá trị của dk
                                    isDuplicate = true; // Đánh dấu là bị trùng
                                }
                            }

                            if (!isDuplicate) {
                                dk = listChiTietPhieu[i]; // Nếu không bị trùng, gán lại giá trị của dk
                            }

                            filteredList.push(dk); // Sau khi duyệt qua tất cả các phần tử j, đẩy giá trị dk vào danh sách lọc
                        }
                        // console.log(filteredList);
                        const uniqueListDK = filteredList.filter((item, index, self) => {
                            // Lọc các mục có giá trị thuộc tính 'maPhieuDangKy' duy nhất
                            return (
                                self.findIndex(
                                    (i) =>
                                        i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                                        item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                                ) === index
                            );
                        });

                        setListDaDK(uniqueListDK);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };

        if (!!userLogin) getALLHocPhan();

        return () => {
            isMounted = false; // set isMounted to false when component unmounts
        };
    }, [listDK, selectedLoai, userLogin]);

    // useEffect(() => {

    // }, [listDK]);

    useEffect(() => {
        const getChiTietPhieuDKTheoHocKy = async () => {
            try {
                var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                    userLogin?.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                setListDaDK(listChiTietPhieu);

                setListDK(listChiTietPhieu);
            } catch (error) {
                console.log(error);
            }
        };
        getChiTietPhieuDKTheoHocKy();
    }, [selectedHK]);

    // console.log(listDK);

    const handleSelectHocPhan = async (item) => {
        // Khởi tạo giá trị ban đầu cho biến listDiem là một mảng rỗng

        // Các bước xử lý khác
        // setCheckTrung(false);
        setListLHP([]);
        setListLich([]);
        setSelectedHP(item);

        if (item?.hocPhan?.monHoc.danhSachMonHocHocTruoc.length > 0) {
            // Khởi tạo một mảng để lưu trữ kết quả trả về từ các lần gọi hàm getBangDiemTheoSVAndMH()
            let bangDiems = [];

            // Lặp qua danh sách các môn học trước
            for (let i = 0; i < item.hocPhan.monHoc.danhSachMonHocHocTruoc.length; i++) {
                // Gọi hàm getBangDiemTheoSVAndMH() và sử dụng async/await để đợi kết quả trả về
                const bangDiem = await getBangDiemTheoSVAndMH(
                    userLogin.maSinhVien,
                    item.hocPhan.monHoc.danhSachMonHocHocTruoc[i].maMonHoc,
                    accessToken,
                    axiosJWT,
                );
                // Lưu trữ kết quả trả về vào mảng bangDiems
                bangDiems.push(bangDiem);
            }

            // Log giá trị của mảng bangDiems sau khi vòng for đã kết thúc

            // Đếm số lượng môn học chưa có điểm giữa kỳ
            let count = 0;
            for (let i = 0; i < bangDiems.length; i++) {
                if (!bangDiems[i][0]?.giuaKy) {
                    count++;
                }
            }

            // Nếu có ít nhất 1 môn học chưa có điểm giữa kỳ, thông báo không cho phép
            if (count > 0) {
                countDK++;
            }
        }
        if (item?.hocPhan?.monHoc.danhSachMonHocTienQuyet.length > 0) {
            // Khởi tạo một mảng để lưu trữ kết quả trả về từ các lần gọi hàm getBangDiemTheoSVAndMH()
            let bangDiems = [];

            // Lặp qua danh sách các môn học trước
            for (let i = 0; i < item.hocPhan.monHoc.danhSachMonHocTienQuyet.length; i++) {
                // Gọi hàm getBangDiemTheoSVAndMH() và sử dụng async/await để đợi kết quả trả về
                const bangDiem = await getBangDiemTheoSVAndMH(
                    userLogin.maSinhVien,
                    item.hocPhan.monHoc.danhSachMonHocTienQuyet[i].maMonHoc,
                    accessToken,
                    axiosJWT,
                );
                // Lưu trữ kết quả trả về vào mảng bangDiems
                bangDiems.push(bangDiem);
            }

            // Log giá trị của mảng bangDiems sau khi vòng for đã kết thúc

            // Đếm số lượng môn học chưa có điểm giữa kỳ
            let count = 0;
            for (let i = 0; i < bangDiems.length; i++) {
                if (bangDiems[i][0]?.trangThai !== 'Đạt') {
                    count++;
                }
            }

            // Nếu có ít nhất 1 môn học chưa có điểm giữa kỳ, thông báo không cho phép
            if (count > 0) {
                countDK++;
            }
        }

        if (countDK > 0) {
            alert('Bạn chưa đủ điều kiện để đăng ký môn học này');
            return;
        } else {
            let result = await getLopHocPhanTheoMaHP(item?.hocPhan?.maHocPhan, selectedHK, accessToken, axiosJWT);

            setListLHP(result);
        }
    };

    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const [selectedMon, setSelectedMon] = useState('');
    const [selectedLop, setSelectedLop] = useState('');
    const [selectedLHP, setSelectedLHP] = useState('');
    const [selectedLichHoc, setSelectedLichHoc] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [selectedHP, setSelectedHP] = useState('');
    const [listLichHoc, setListLichHoc] = useState([]);
    const [listChiTietLichDK, setListChiTietLichDK] = useState([]);

    const [selectedLich, setSelectedLich] = useState([]);

    const handleSelectLoaiDK = (event) => {
        setSelectedLoai(event.target.value);
    };

    const handleXemClick = (item, index) => {
        // Xử lý sự kiện khi nút "Xem" được bấm
        setOpen(true);
        const getLichDaDK = async () => {
            let listLichDaDK = await getChiTietLichByMaSinhVienAndLopHP(
                userLogin.maSinhVien,
                item.nhomThucHanh.lopHocPhan.maLopHocPhan,
                accessToken,
                axiosJWT,
            );

            if (listLichDaDK.length > 0) {
                let map = new Map();

                listLichDaDK.forEach((item) => {
                    if (!map.has(item.nhomThucHanh?.maNhom)) {
                        map.set(item.nhomThucHanh?.maNhom, item);
                    }
                });

                let filteredList = Array.from(map.values());
                setListChiTietLichDK(filteredList);
                // setListChiTietLichDK(listLichDaDK);
            }
        };
        getLichDaDK();
    };
    const handleDeleteClick = async (item) => {
        if (
            item.nhomThucHanh.lopHocPhan.trangThai !== 'Đã khóa' ||
            item.nhomThucHanh.lopHocPhan.trangThai !== 'Chấp nhận mở lớp'
        ) {
            if (item.loaiDangKyHP.tenLoaiDKHP === 'Học lại') {
                const trangThai = 'Không đạt';
                await updateTrangThaiBangDiem(
                    `${trangThai}`,
                    userLogin.maSinhVien,
                    item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                    accessToken,
                    axiosJWT,
                );
            } else if (item.loaiDangKyHP.tenLoaiDKHP === 'Học cải thiện') {
                const trangThai = 'Đạt';
                await updateTrangThaiBangDiem(
                    `${trangThai}`,
                    userLogin.maSinhVien,
                    item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                    accessToken,
                    axiosJWT,
                );
            }
            var HuyLHPDK;
            let getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(
                userLogin.maSinhVien,
                selectedHK,
                accessToken,
                axiosJWT,
            );

            let listLichDaDK = await getChiTietLichByMaSinhVienAndLopHP(
                userLogin.maSinhVien,
                item.nhomThucHanh.lopHocPhan.maLopHocPhan,
                accessToken,
                axiosJWT,
            );

            if (listLichDaDK?.length > 0) {
                let map = new Map();

                listLichDaDK.forEach((item) => {
                    if (!map.has(item.nhomThucHanh?.maNhom)) {
                        map.set(item.nhomThucHanh?.maNhom, item);
                    }
                });

                let filteredList = Array.from(map.values());

                if (filteredList.length > 1) {
                    for (let i = 0; i < filteredList.length; i++) {
                        HuyLHPDK = await deleteChiTietPDKByMaPhieuDKAndMaNhomTH(
                            item.phieuDangKyHocPhan.maPhieuDangKy,
                            filteredList[i].nhomThucHanh.maNhom,
                            accessToken,
                            axiosJWT,
                        );
                    }
                } else {
                    HuyLHPDK = await deleteChiTietPDKByMaPhieuDKAndMaNhomTH(
                        item.phieuDangKyHocPhan.maPhieuDangKy,
                        filteredList[0].nhomThucHanh.maNhom,
                        accessToken,
                        axiosJWT,
                    );
                }

                if (HuyLHPDK.length === 0) {
                    const getLopHocPhan = await getLopHocPhanByMaLHP(
                        item.nhomThucHanh.lopHocPhan.maLopHocPhan,
                        accessToken,
                        axiosJWT,
                    );

                    const lhp = {
                        maLopHocPhan: getLopHocPhan.maLopHocPhan,
                        tenLopHocPhan: getLopHocPhan.tenLopHocPhan,
                        siSo: getLopHocPhan.siSo,
                        siSoThuc: getLopHocPhan.siSoThuc - 1,
                        ngayBatDau: getLopHocPhan.ngayBatDau,
                        ngayKetThuc: getLopHocPhan.ngayKetThuc,
                        trangThai: getLopHocPhan.trangThai,
                        hocPhan: item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                        hocKy: selectedHK,
                    };

                    const updateLHP = await updateLopHocPhan(lhp, accessToken, axiosJWT);

                    if (!!updateLHP) alert('Hủy thành công');
                    var listChiTietPhieuLT = await getChiTietPhieuDKByHocKyAndSinhVien(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );

                    setListDK(listChiTietPhieuLT);
                    var listChiTietPhieu = await getChiTietPhieuDKByHocKyAndSinhVien(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );

                    setListDaDK(listChiTietPhieu);
                }
            }
        } else alert('Lớp học phần này không thể hủy');
    };
    function Menu1() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
    }
    const handleSelectLich = async (item) => {
        setSelectedLich(item);
        const soLuongSVTheoNTH = await countSinhVienByNTH(item.nhomThucHanh.maNhom, accessToken, axiosJWT);
        if (soLuongSVTheoNTH === item.nhomThucHanh.lopHocPhan.soLuongSV) {
            alert('Nhóm này đã đủ số lượng sinh viên đăng kí');
            setSelectedLich('');
        }
    };
    const handleChangeHK = (event) => {
        setSelectedHK(event.target.value);
    };

    const handleSelectLHP = async (item) => {
        setListLich([]);
        setSelectedLHP(item);

        const getLopHocPhan = await getLopHocPhanByMaLHP(item, accessToken, axiosJWT);
        if (getLopHocPhan.siSoThuc < getLopHocPhan.siSo) {
            let result = await getLichTheoLHP(item, accessToken, axiosJWT);

            if (result.length > 0) {
                let map = new Map();
                result.forEach((item) => {
                    if (!map.has(item.nhomThucHanh?.maNhom)) {
                        map.set(item.nhomThucHanh?.maNhom, item);
                    }
                });
                let filteredList = Array.from(map.values());
                setListLich(filteredList);
                await Promise.resolve(); // Sử dụng Promise.resolve() để đảm bảo việc cập nhật listLich được hoàn tất trước khi hàm handleSelectLHP hoàn tất
            }
        } else if (getLopHocPhan.siSoThuc >= getLopHocPhan.siSo) {
            alert('Lớp học phần này đã đủ số lượng đăng ký');
        }
    };
    let lopHP = listLHP?.find((e) => e.maLopHocPhan === selectedLHP);

    const clickDangKyHP = async () => {
        if (lopHP.trangThai === 'Chờ sinh viên đăng ký') {
            let listTrung = [];
            var daLoc;
            let result;
            if (listLich.length > 1) {
                result = await getLichTheoLHPAndNhomTH(
                    selectedLHP,
                    selectedLich.nhomThucHanh.maNhom,
                    accessToken,
                    axiosJWT,
                );
            } else {
                result = await getLichTheoLHP(selectedLHP, accessToken, axiosJWT);
            }

            if (result.length > 0) {
                var listALLLichByHK = await getLichDaDKTheoHK(userLogin.maSinhVien, selectedHK, accessToken, axiosJWT);

                if (listALLLichByHK.length > 0) {
                    let locTrung = new Map();

                    if (result.length >= listALLLichByHK.length) {
                        for (let i = 0; i < result.length; i++) {
                            for (let j = 0; j < listALLLichByHK.length; j++) {
                                if (
                                    result[i]?.ngayHoc === listALLLichByHK[j]?.ngayHoc &&
                                    result[i]?.caHoc.maCaHoc === listALLLichByHK[j]?.caHoc.maCaHoc
                                ) {
                                    // Nếu trùng lịch học, đặt biến isTrungLopHocPhan thành true và thoát khỏi vòng lặp.
                                    if (listTrung.indexOf(result[i].nhomThucHanh.lopHocPhan) === -1) {
                                        listTrung.push(result[i].nhomThucHanh.lopHocPhan);
                                    }

                                    break;
                                }
                            }
                            // Nếu lớp học phần không trùng lịch học và chưa có trong listKhongTrung, thêm vào listKhongTrung.
                        }
                    } else {
                        for (let i = 0; i < listALLLichByHK.length; i++) {
                            for (let j = 0; j < result.length; j++) {
                                if (
                                    listALLLichByHK[i]?.ngayHoc === result[j]?.ngayHoc &&
                                    listALLLichByHK[i]?.caHoc.maCaHoc === result[j]?.caHoc.maCaHoc
                                ) {
                                    // Nếu trùng lịch học, đặt biến isTrungLopHocPhan thành true và thoát khỏi vòng lặp.
                                    if (listTrung.indexOf(result[i]?.nhomThucHanh.lopHocPhan) === -1) {
                                        listTrung.push(result[i]?.nhomThucHanh.lopHocPhan);
                                    }
                                }
                            }
                            // Nếu lớp học phần không trùng lịch học và chưa có trong listKhongTrung, thêm vào listKhongTrung.
                        }
                    }

                    //lọc Trùng
                    listTrung.forEach((item) => {
                        if (!locTrung.has(item.maLopHocPhan)) {
                            locTrung.set(item.maLopHocPhan, item);
                        }
                    });

                    daLoc = Array.from(locTrung.values());
                } else {
                    daLoc = [];
                }
            }

            if (daLoc?.length === 0) {
                if (selectedLoai === 'LDK002') {
                    const trangThai = 'Học lại';
                    await updateTrangThaiBangDiem(
                        `${trangThai}`,
                        userLogin.maSinhVien,
                        selectedHP.hocPhan.maHocPhan,
                        accessToken,
                        axiosJWT,
                    );
                }
                if (selectedLoai === 'LDK003') {
                    const trangThai = 'Học cải thiện';
                    await updateTrangThaiBangDiem(
                        `${trangThai}`,
                        userLogin.maSinhVien,
                        selectedHP.hocPhan.maHocPhan,
                        accessToken,
                        axiosJWT,
                    );
                }
                let getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                if (getPhieuDangKy.length === 0) {
                    let phieuDangKy = {
                        trangThai: '1',
                        sinhVien: userLogin.maSinhVien,
                        hocKy: selectedHK,
                    };
                    const addPhieuDangKy = await themPhieuDangKy(phieuDangKy, accessToken, axiosJWT);
                }
                getPhieuDangKy = await getPhieuDKByHocKyMaSinhVien(
                    userLogin.maSinhVien,
                    selectedHK,
                    accessToken,
                    axiosJWT,
                );
                if (
                    listLich.length > 1 &&
                    (selectedLich.length === 0 || selectedLich.nhomThucHanh.tenNhom === 'Nhóm 0')
                ) {
                    alert('Vui lòng chọn nhóm thực hành');
                } else if (listLich.length === 1) {
                    let chiTietPhieuDangKyLT = {
                        phieuDangKyHocPhan: getPhieuDangKy[0]?.maPhieuDangKy,
                        ngayDangKy: new Date().toISOString().substr(0, 10),
                        loaiDangKyHP: selectedLoai,
                        nhomThucHanh: listLich[0].nhomThucHanh.maNhom,
                    };
                    var addChiTietPhieuDangKyLT;
                    addChiTietPhieuDangKyLT = await themChiTietPhieuDangKy(chiTietPhieuDangKyLT, accessToken, axiosJWT);
                    if (!!addChiTietPhieuDangKyLT) {
                        var listChiTietPhieuLT2 = await getChiTietPhieuDKByHocKyAndSinhVien(
                            userLogin.maSinhVien,
                            selectedHK,
                            accessToken,
                            axiosJWT,
                        );
                        setListDK(listChiTietPhieuLT2);
                        setListLHP([]);
                        setListLich([]);
                        const getLopHocPhan = await getLopHocPhanByMaLHP(selectedLHP, accessToken, axiosJWT);
                        const lhp = {
                            maLopHocPhan: getLopHocPhan.maLopHocPhan,
                            tenLopHocPhan: getLopHocPhan.tenLopHocPhan,
                            siSo: getLopHocPhan.siSo,
                            siSoThuc: getLopHocPhan.siSoThuc + 1,
                            ngayBatDau: getLopHocPhan.ngayBatDau,
                            ngayKetThuc: getLopHocPhan.ngayKetThuc,
                            trangThai: getLopHocPhan.trangThai,
                            hocPhan: selectedHP.hocPhan.maHocPhan,
                            hocKy: selectedHK,
                        };
                        const updateLHP = await updateLopHocPhan(lhp, accessToken, axiosJWT);
                        if (!!updateLHP) {
                            alert('Đăng ký học phần thành công!!');
                        }
                    }
                } else {
                    for (let i = 0; i < listLich.length; i++) {
                        if (listLich[i].nhomThucHanh.tenNhom === 'Nhóm 0') {
                            let chiTietPhieuDangKyLT = {
                                phieuDangKyHocPhan: getPhieuDangKy[0].maPhieuDangKy,
                                ngayDangKy: new Date().toISOString().substr(0, 10),
                                loaiDangKyHP: selectedLoai,
                                nhomThucHanh: listLich[i].nhomThucHanh.maNhom,
                            };
                            var addChiTietPhieuDangKyLT1 = await themChiTietPhieuDangKy(
                                chiTietPhieuDangKyLT,
                                accessToken,
                                axiosJWT,
                            );
                        }
                    }
                    let chiTietPhieuDangKyTH = {
                        phieuDangKyHocPhan: getPhieuDangKy[0].maPhieuDangKy,
                        ngayDangKy: new Date().toISOString().substr(0, 10),
                        loaiDangKyHP: selectedLoai,
                        nhomThucHanh: selectedLich.nhomThucHanh?.maNhom,
                    };
                    var addChiTietPhieuDangKyTH = await themChiTietPhieuDangKy(
                        chiTietPhieuDangKyTH,
                        accessToken,
                        axiosJWT,
                    );
                    if (!!addChiTietPhieuDangKyTH && !!addChiTietPhieuDangKyLT1) {
                        var listChiTietPhieu1 = await getChiTietPhieuDKByHocKyAndSinhVien(
                            userLogin?.maSinhVien,
                            selectedHK,
                            accessToken,
                            axiosJWT,
                        );
                        setListDK(listChiTietPhieu1);
                        setListLHP([]);
                        setListLich([]);
                        const getLopHocPhan = await getLopHocPhanByMaLHP(selectedLHP, accessToken, axiosJWT);
                        const lhp = {
                            maLopHocPhan: getLopHocPhan.maLopHocPhan,
                            tenLopHocPhan: getLopHocPhan.tenLopHocPhan,
                            siSo: getLopHocPhan.siSo,
                            siSoThuc: getLopHocPhan.siSoThuc + 1,
                            ngayBatDau: getLopHocPhan.ngayBatDau,
                            ngayKetThuc: getLopHocPhan.ngayKetThuc,
                            trangThai: getLopHocPhan.trangThai,
                            hocPhan: selectedHP.hocPhan.maHocPhan,
                            hocKy: selectedHK,
                        };
                        const updateLHP = await updateLopHocPhan(lhp, accessToken, axiosJWT);
                        if (!!updateLHP) {
                            alert('Đăng ký học phần thành công!!');
                        }
                    }
                }
            } else {
                alert('Lớp học phần này trùng lịch học');
            }
        } else {
            alert('Lớp học phần đang ở trạng thái " ' + lopHP.trangThai + '" không được đăng ký');
        }
    };

    const handleCheckboxChange = async (e) => {
        setCheckTrung(e.target.checked);
    };

    useEffect(() => {
        // Kiểm tra giá trị mới của state check sau khi đã được cập nhật
        setListLHP([]);
        const maLHP = [];

        let listKhongTrung = [];
        if (checkTrung === true) {
            for (let i = 0; i < listLHP?.length; i++) {
                maLHP.push(listLHP[i].maLopHocPhan);
            }

            const LocLich = async (maLHP) => {
                let result = await getLichTheoLHP(maLHP, accessToken, axiosJWT);
                if (result.length > 0) {
                    var listALLLichByHK = await getLichDaDKTheoHK(
                        userLogin.maSinhVien,
                        selectedHK,
                        accessToken,
                        axiosJWT,
                    );
                    if (listALLLichByHK.length > 0) {
                        let loc = new Map();

                        for (let i = 0; i < result.length; i++) {
                            let isTrungLopHocPhan = false;
                            for (let j = 0; j < listALLLichByHK.length; j++) {
                                if (
                                    result[i]?.ngayHoc === listALLLichByHK[j]?.ngayHoc &&
                                    result[i]?.caHoc.maCaHoc === listALLLichByHK[j]?.caHoc.maCaHoc
                                ) {
                                    // Nếu trùng lịch học, đặt biến isTrungLopHocPhan thành true và thoát khỏi vòng lặp.
                                    isTrungLopHocPhan = true;
                                    break;
                                }
                            }
                            // Nếu lớp học phần không trùng lịch học và chưa có trong listKhongTrung, thêm vào listKhongTrung.
                            if (
                                !isTrungLopHocPhan &&
                                listKhongTrung.indexOf(result[i].nhomThucHanh.lopHocPhan) === -1
                            ) {
                                listKhongTrung.push(result[i].nhomThucHanh.lopHocPhan);
                            }
                        }

                        listKhongTrung.forEach((item) => {
                            if (!loc.has(item.maLopHocPhan)) {
                                loc.set(item.maLopHocPhan, item);
                            }
                        });

                        let daLoc = Array.from(loc.values());

                        setListLHP(daLoc);
                        // const uniqueArr = [...new Set(listKhongTrung)];

                        // // Finally, it sets the listLHP state with the uniqueArr array.
                        // setListLHP(uniqueArr);
                    } else {
                        handleSelectHocPhan(selectedHP);
                    }
                }
            };

            // Loop through maLHP array and call LocLich function for each maLHP
            maLHP.forEach(async (maLHP) => {
                await LocLich(maLHP);
            });
        } else {
            handleSelectHocPhan(selectedHP);
        }
    }, [checkTrung]);

    const renderDanhSachDieuKien = (item) => {
        let arrFilterHocTruoc = item.danhSachMonHocHocTruoc.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (a)</span>
                </>
            );
        });
        let arrFilterTienQuyet = item.danhSachMonHocTienQuyet.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (b)</span>
                </>
            );
        });
        let arrFilterSongHanh = item.danhSachMonHocSongHanh.map((monHoc) => {
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

    return (
        <div className="h-max w-full bg-gray-100 flex flex-row relative">
            <span className="w-1/12 mt-10">
                <FaAlignJustify size={25} onClick={Menu1} />
                <div className={showMenu ? '' : 'hidden'}>
                    <span className="w-52 absolute  border border-sv-blue-4 bg-white">
                        <Menu />
                    </span>
                </div>
            </span>
            <div className="w-10/12 bg-white mt-2">
                <div className="text-xl text-sv-blue-5 m-4">
                    <b>Đăng ký học phần</b>
                </div>
                <div className="border-t border-gray-200 m-2"></div>
                <div className="flex flex-row items-center justify-center">
                    <div className="flex w-72 border  border-sv-blue-4 rounded-lg p-1">
                        <select
                            className="text-sv-text-2 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
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
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK001"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK001'}
                        />
                        <span className="ml-1">Học mới</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK002"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK002'}
                        />
                        <span className="ml-1">Học lại</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="LDK003"
                            onChange={handleSelectLoaiDK}
                            checked={selectedLoai === 'LDK003'}
                        />
                        <span className="ml-1">Học cải thiện</span>
                    </label>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Môn học, học phần chờ đăng ký</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên môn học/học phần</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Bắt buộc</th>
                                    <th className={cx('')}>học phần: học trước (a), tiên quyết (b), song hành (c)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listHocPhan?.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedHP?.hocPhan?.maHocPhan === `${item.hocPhan.maHocPhan}`
                                                ? 'bg-orange-200'
                                                : ''
                                        } hover:cursor-pointer`}
                                        key={item.hocPhan.maHocPhan + index + 'a'}
                                        onClick={() => handleSelectHocPhan(item)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-mon"
                                                value={item}
                                                checked={selectedHP?.hocPhan?.maHocPhan === `${item.hocPhan.maHocPhan}`}
                                                onChange={() => handleSelectHocPhan(item)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.hocPhan.maHocPhan}</td>
                                        <td>{item.hocPhan.tenHocPhan}</td>
                                        <td>{item.hocPhan.monHoc.soTCLT + item.hocPhan.monHoc.soTCTH}</td>

                                        <td align="center">
                                            {item.trangThai === 'Bắt buộc' ? (
                                                <BsFillCheckCircleFill color="green" size={18} />
                                            ) : (
                                                <AiFillCloseCircle color="red" size={21} />
                                            )}
                                        </td>
                                        <td className="">
                                            <div className="flex flex-row items-center justify-center">
                                                {renderDanhSachDieuKien(item.hocPhan.monHoc)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center text-base w-full relative">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 ml-2">Lớp học phần chờ đăng ký</b>
                    <label className="absolute right-0 flex flex-row items-center">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 text-indigo-600 transition duration-150 ease-in-out p-2"
                            name="checkbox-trung"
                            checked={checkTrung}
                            onChange={handleCheckboxChange}
                        />
                        <span>
                            <b className="text-base text-sv-blue-5 mr-6 ml-2">Hiển thị lớp học phần không trùng lịch</b>
                        </span>
                    </label>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên lớp học phần</th>
                                    <th className={cx('')}>Lớp dự kiến</th>
                                    <th className={cx('')}>Sỉ số tối đa</th>
                                    <th className={cx('')}>Đã đăng ký</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLHP?.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedLHP === `${item.maLopHocPhan}` ? 'bg-orange-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maLopHocPhan}
                                        onClick={() => handleSelectLHP(item.maLopHocPhan)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-lop"
                                                value={item.maLopHocPhan}
                                                checked={
                                                    selectedLHP === `${item.maLopHocPhan}` ||
                                                    (item.nhomThucHanh?.tenNhom === 'Nhóm 1' && selectedLHP === '') ||
                                                    item.nhomThucHanh?.tenNhom === 'Nhóm 0'
                                                }
                                                onChange={() => handleSelectLHP(item.maLopHocPhan)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.maLopHocPhan}</td>
                                        <td>{item.hocPhan?.tenHocPhan}</td>
                                        <td>{item.tenLopHocPhan}</td>
                                        <td align="center">{item.siSo}</td>
                                        <td className="">{item.siSoThuc}</td>
                                        <td>{item.trangThai}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Chi tiết lớp học phần</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Lịch học</th>
                                    <th className={cx('')}>Nhóm TH</th>
                                    <th className={cx('')}>Phòng</th>
                                    <th className={cx('')}>Dãy nhà</th>
                                    <th className={cx('')}>Giảng viên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLich?.map((item, index) => (
                                    <tr
                                        className={`${selectedLich === item ? 'bg-orange-200' : ''} ${
                                            item.nhomThucHanh.tenNhom === 'Nhóm 0' ? 'bg-red-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maLich}
                                        onClick={() => handleSelectLich(item)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className={
                                                    item.nhomThucHanh?.tenNhom === 'Nhóm 0'
                                                        ? 'hidden'
                                                        : 'form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out'
                                                }
                                                name="radio-group-lich"
                                                value={item.maLich}
                                                checked={
                                                    selectedLich.nhomThucHanh?.maNhom === item.nhomThucHanh?.maNhom
                                                }
                                                onChange={() => handleSelectLich(item)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{days[new Date(item.ngayHoc).getDay()] + '-' + item.caHoc.tenCaHoc}</td>
                                        <td>{item.nhomThucHanh.tenNhom}</td>
                                        <td>{item.phong.tenPhong}</td>
                                        <td align="center">{item.phong.dayNha.tenDayNha}</td>
                                        <td className="">{item.nhanVien.tenNhanVien}</td>
                                        <td>
                                            {convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayBatDau) +
                                                '-' +
                                                convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayKetThuc)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex items-center justify-center p-2">
                        <Button variant="contained" size="small" onClick={clickDangKyHP}>
                            Đăng ký môn học
                        </Button>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Lớp học phần đã đăng ký trong học kỳ này</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã LHP</th>
                                    <th className={cx('')}>Tên môn học</th>
                                    <th className={cx('')}>Lớp học dự kiến</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Nhóm TH</th>

                                    <th>Trạng thái ĐK</th>
                                    <th>Ngày ĐK</th>
                                    <th>Trạng thái LHP</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listDaDK?.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.maLopHocPhan}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.tenMonHoc}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.tenLopHocPhan}</td>
                                        <td>
                                            {item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT +
                                                item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH}
                                        </td>
                                        <td>
                                            <td>
                                                {item.nhomThucHanh.tenNhom === 'Nhóm 0'
                                                    ? ''
                                                    : item.nhomThucHanh.tenNhom}
                                            </td>
                                        </td>
                                        <td>{item.loaiDangKyHP.tenLoaiDKHP}</td>
                                        <td>{convertDateFormat(item.ngayDangKy)}</td>
                                        <td>{item.nhomThucHanh.lopHocPhan.trangThai}</td>
                                        <td className="p-2">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleXemClick(item, index)}
                                            >
                                                Xem
                                            </Button>
                                        </td>
                                        <td className="p-2">
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                //onClick={() => handleDeleteClick(item, index)}
                                                onClick={() => handleConfirmation(item, index)}
                                            >
                                                Hủy
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-1/12"></div>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '100%', height: '50%' } }}
                fullWidth={'100%'}
                maxWidth
                open={open}
                onClose={handleClose}
            >
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin dãy nhà</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>
                <DialogContent>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    ></Box>
                    <div className="w-full flex flex-row justify-between">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Lịch học</th>
                                    <th className={cx('')}>Nhóm</th>
                                    <th className={cx('')}>Phòng</th>
                                    <th className={cx('')}>Dãy nhà</th>
                                    <th>Giảng viên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listChiTietLichDK?.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{days[new Date(item.ngayHoc).getDay()] + '-' + item.caHoc.tenCaHoc}</td>
                                        <td>
                                            {item.nhomThucHanh.tenNhom === 'Nhóm 0' ? '' : item.nhomThucHanh.tenNhom}
                                        </td>
                                        <td>{item.phong.tenPhong}</td>
                                        <td>{item.phong.dayNha.tenDayNha}</td>
                                        <td>{item.nhanVien.tenNhanVien}</td>
                                        <td>
                                            {convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayBatDau) +
                                                '-' +
                                                convertDateFormat(item.nhomThucHanh.lopHocPhan.ngayKetThuc)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={showConfirmation}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Bạn có chắc hủy đăng ký học phần này?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Hủy bỏ</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DangKyHocPhan;
