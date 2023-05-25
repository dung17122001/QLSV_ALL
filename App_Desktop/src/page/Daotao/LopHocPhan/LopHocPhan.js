import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TiCancel } from 'react-icons/ti';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import style from './LopHocPhan.module.scss';
import { getTatCaHocKy } from '~/services/hocKyService';
import { exportToExcel } from '~/function/exportToExcel';
import { getHocPhanTheoHocKy } from '~/services/hocPhanService';
import {
    getLopHocPhanTheoMaHP,
    addLopHocPhan,
    addNhomTH,
    getNhomTHTheoMaHP,
    updateLopHocPhan,
    getLopHocPhanByTextSearch,
    xoaLHPTheoMaLHP,
    xoaNhomTHTheoMaLHP,
} from '~/services/lopHocPhanService';
import { getTatCaDayNha, getPhongHocConTrong } from '~/services/phongService';
import { getTatCaCaHoc, getTatCaCaHocKhongTrungLichDayGV } from '~/services/caHocService';
import { getTatCaKhoa } from '~/services/khoaService';
import { getNhanVienTheoKhoa, getTatCaNhanVien } from '~/services/nhanVienService';
import { getLichTheoLHP, themLich, updateLich, getLichTheoMa, xoaLichTheoMaLHP } from '~/services/lichService';
import { xoaChiTietPDKTheoMaLHP } from '~/services/pheuDangKyHP';
import classNames from 'classnames/bind';
import HeaderQL from '../../../components/HeaderQL';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
import Modal from 'react-modal';
const cx = classNames.bind(style);

function LopHoc() {
    const [openModalLHP, setOpenModalLHP] = useState(false);
    const [openModalLichHoc, setOpenModalLichHoc] = useState(false);
    const navigate = useNavigate();
    const [listHocKy, setListHocKy] = useState();
    const [selectedOptionHK, setSelectedOptionHK] = useState('');
    const [listChecked, setListChecked] = useState([]);
    const [selectedHP, setSelectedHP] = useState('');
    const [selectedLHP, setSelectedLHP] = useState('');
    const [listHocPhan, setListHocPhan] = useState();
    const [listLHP, setListLHP] = useState();
    const [maLopHocHocPhan, setMaLopHocPhan] = useState();
    const [tenLopHocHocPhan, setTenLopHocPhan] = useState();
    const [siSo, setSiSo] = useState();
    const [ngayBatDau, setNgayBatDau] = useState();
    const [ngayKetThuc, setNgayKetThuc] = useState();
    const [trangThai, setTrangThai] = useState('Đang lên kế hoạch');
    const [listCaHoc, setListCaHoc] = useState();
    const [listDayNha, setListDayNha] = useState();
    const [loaiLich, setLoaiLich] = useState();
    const [ngayHoc, setNgayHoc] = useState();
    const [caHoc, setCaHoc] = useState();
    const [dayNha, setDayNha] = useState();
    const [trangThaiLich, setTrangThaiLich] = useState('Bình thường');
    const [khoaGV, setKhoaGV] = useState();
    const [giangVien, setGianngVien] = useState();
    const [reloadCaHoc, setReloadCaHoc] = useState(false);
    const [listPhongHoc, setListPhongHoc] = useState();
    const [phongHoc, setPhonngHoc] = useState('');
    const [reloadPhong, setReloadPhong] = useState(false);
    const [listKhoa, setListKhoa] = useState();
    const [listGV, setListGV] = useState();
    const [listLichHoc, setListLichHoc] = useState();
    const [selectedLichHoc, setSelectedLichHoc] = useState('');
    const [maLich, setMaLich] = useState();
    const [soLuong, setSoLuong] = useState(1);
    const [soTietLT, setSoTietLT] = useState(0);
    const [soTietTH, setSoTietTH] = useState(0);
    const [soBuoiHoc, setSoBuoiHoc] = useState(0);
    const [nhomTH, setNhomTH] = useState(1);
    const [soLuongSV, setSoLuongSV] = useState(30);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        // Xử lý logic khi người dùng đồng ý
        await handleXoaLopHP();
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        // Xử lý logic khi người dùng từ chối
        setShowConfirmation(false);
    };

    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const handleSelectHK = async (e) => {
        setSelectedOptionHK(e.target.value);
        if (!!e.target.value) {
            var dsHP = await getHocPhanTheoHocKy(e.target.value, accessToken, axiosJWT);
            setListHocPhan(dsHP);
            //console.log(listHocPhan);
        }
        setListLHP();
        setListLichHoc();
        // console.log(selectedOptionHK);
    };

    const handleExportExcel = () => {
        exportToExcel('data-nganh', 'Danh sách ngành học');
    };

    const handleSearchLHP = async (value) => {
        //setSoTietLT(selectedHP.monHoc?.soTCLT * 15);
        //setSoTietTH(selectedHP.monHoc?.soTCLT * 30);
        let result = await getLopHocPhanByTextSearch(value, accessToken, axiosJWT);
        setListLHP(result);
        setListLichHoc();
    };

    const renderDanhSachDieuKien = (item) => {
        let arrFilterHocTruoc = item?.danhSachMonHocHocTruoc?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (a)</span>
                </>
            );
        });
        let arrFilterTienQuyet = item?.danhSachMonHocTienQuyet?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (b)</span>
                </>
            );
        });
        let arrFilterSongHanh = item?.danhSachMonHocSongHanh?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (c)</span>
                </>
            );
        });
        let newArrDieuKien = [];
        if (!!arrFilterHocTruoc && !!arrFilterSongHanh && !!arrFilterTienQuyet)
            newArrDieuKien = [...arrFilterHocTruoc, ...arrFilterTienQuyet, ...arrFilterSongHanh] || [];

        let nodeDieuKien = [];
        for (let i = 0; i < newArrDieuKien.length - 1; i++) {
            let data = newArrDieuKien[i];
            let CompDieuKien = <>{data}, </>;
            nodeDieuKien = [...nodeDieuKien, CompDieuKien];
        }
        nodeDieuKien = [...nodeDieuKien, newArrDieuKien[newArrDieuKien.length - 1]];

        return nodeDieuKien;
    };
    const getAllChecked = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const temp = [...listHocKy];
        if (temp[index].maMonHoc === item.maMonHoc) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item]);
        else {
            var arrRemove = listChecked.filter((e) => e.maMonHoc !== item.maMonHoc);
            setListChecked(arrRemove);
        }
        setListHocPhan(temp);
    };

    const handleSelectHocPhan = async (item) => {
        setSelectedHP(item);
        // setSoTietLT(item.monHoc?.soTCLT * 15);
        // setSoTietTH(item.monHoc?.soTCLT * 30);
        let result = await getLopHocPhanTheoMaHP(item.maHocPhan, selectedOptionHK, accessToken, axiosJWT);
        setListLHP(result);
        setListLichHoc();
    };

    const handleClickOpenModalLHP = () => {
        handleXoaTrangModalLHP();
        setOpenModalLHP(true);
    };
    const handleClickOpenModalUpdateLHP = () => {
        if (!selectedLHP) {
            // alert('Vui lòng chọn lớp học phần cần sửa');
            // return;
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn lớp phần cần sửa!', 'Thông báo');
            return;
        }
        if (!!selectedLHP) {
            setMaLopHocPhan(selectedLHP.maLopHocPhan);
            setTenLopHocPhan(selectedLHP.tenLopHocPhan);
            setSiSo(selectedLHP.siSo);
            setNgayBatDau(selectedLHP.ngayBatDau);
            setNgayKetThuc(selectedLHP.ngayKetThuc);
            setTrangThai(selectedLHP.trangThai);
        }
        setOpenModalLHP(true);
    };
    const handleXoaTrangModalLHP = () => {
        setMaLopHocPhan();
        setTenLopHocPhan();
        setSiSo();
        setNgayBatDau();
        setNgayKetThuc();
        setTrangThai('Đang lên kế hoạch');
    };
    const handleClickCloseModalLHP = () => {
        setOpenModalLHP(false);
    };
    const handleClickOpenModalLichHoc = () => {
        setReloadPhong(!reloadPhong);
        setOpenModalLichHoc(true);
        xoaRongModalThemLich();
    };
    const handleClickOpenModalUpdateLichHoc = () => {
        if (!selectedLichHoc) {
            // alert('Vui lòng chọn lịch cần sửa');
            // return;
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn lịch cần sửa!', 'Thông báo');
            return;
        }
        setReloadPhong(!reloadPhong);
        //setSelectedLichHoc('');
        if (!!selectedLichHoc) {
            setMaLich(selectedLichHoc.maLich);
            setLoaiLich(selectedLichHoc.phong.loaiPhong.maLoaiPhong);
            setNgayHoc(selectedLichHoc.ngayHoc);
            setCaHoc(selectedLichHoc.caHoc?.maCaHoc);
            setDayNha(selectedLichHoc.phong.dayNha.tenDayNha);
            setPhonngHoc(selectedLichHoc.phong.maPhong);
            setTrangThaiLich(selectedLichHoc.trangThai);
            setGianngVien(selectedLichHoc.nhanVien.maNhanVien);
            setNhomTH(selectedLichHoc.nhomThucHanh.tenNhom.slice(-1));
            setSoLuongSV(selectedLichHoc.nhomThucHanh.soLuongSV);
        }
        setOpenModalLichHoc(true);
    };
    const xoaRongModalThemLich = () => {
        setMaLich();
        setLoaiLich('LP001');
        //setNgayHoc();
        setCaHoc('');
        //setDayNha();
        setPhonngHoc('');
        setTrangThaiLich('Bình thường');
        setGianngVien('');
        //setNhomTH(0);
        setSoLuongSV(30);
        setSelectedLichHoc();
    };
    const handleClickCloseModalLichHoc = () => {
        setOpenModalLichHoc(false);
    };

    const handleAddLopHocPhan = async () => {
        var lhp = {
            maLopHocPhan: maLopHocHocPhan,
            tenLopHocPhan: tenLopHocHocPhan,
            siSo: siSo,
            siSoThuc: 0,
            ngayBatDau: ngayBatDau,
            ngayKetThuc: ngayKetThuc,
            trangThai: trangThai,
            hocPhan: selectedHP.maHocPhan,
            hocKy: selectedOptionHK,
        };
        //let tenLHP = listLHP.find((e) => e.tenLopHocPhan === lhp.tenLopHocPhan);

        var kq;
        if (lhp.maLopHocPhan !== '' && !!lhp.maLopHocPhan) kq = await updateLopHocPhan(lhp, accessToken, axiosJWT);
        else {
            // if (!!tenLHP) {
            //     alert('Tên lớp học phần bị trùng');
            //     return;
            // }
            kq = await addLopHocPhan(lhp, accessToken, axiosJWT);
        }

        if (!!kq) {
            //alert('Lưu lớp học phần thành công');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Lưu lớp học phần thành công!', 'Thông báo');
            handleClickCloseModalLHP();
            let result = await getLopHocPhanTheoMaHP(selectedHP.maHocPhan, selectedOptionHK, accessToken, axiosJWT);
            setListLHP(result);
        } //else alert('Có lỗi xảy ra');
        //console.log(lhp);
    };
    function getNextDayOfWeek(date, dayOfWeek) {
        var daysUntilNextDay = (dayOfWeek - date.getDay() + 7) % 7;
        var nextDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + daysUntilNextDay);
        return nextDay;
    }

    const handleSelectLoaiLich = (e) => {
        setLoaiLich(e.target.value);
        setReloadPhong(!reloadPhong);
    };
    const handleSelectNgayHoc = (e) => {
        // var date = new Date(selectedLHP?.ngayBatDau);
        // var nextWednesday = getNextDayOfWeek(date, e.target.value);
        setNgayHoc(e.target.value);
        setReloadPhong(!reloadPhong);
    };
    const handleSelectCaHoc = (e) => {
        //console.log(e.target.value);
        setCaHoc(e.target.value);
        setReloadPhong(!reloadPhong);
    };
    const handleSelectDayNha = async (e) => {
        setDayNha(e.target.value);
        setReloadPhong(!reloadPhong);
    };
    const handleSelectPhongHoc = (e) => {
        setPhonngHoc(e.target.value);
    };

    const handleSelectKhoaGV = async (e) => {
        setKhoaGV(e.target.value);
        let result = await getNhanVienTheoKhoa(e.target.value, accessToken, axiosJWT);
        if (!!result) setListGV(result);
    };
    const handleSelectGiangVien = async (e) => {
        setGianngVien(e.target.value);
        setReloadCaHoc(!reloadCaHoc);
    };

    const handleSelectLHP = async (item) => {
        setSelectedLHP(item);
        setNgayHoc(item.ngayBatDau);
        //let soTietLT = item.hocPhan?.monhoc?.soTCLT;
        let result = await getLichTheoLHP(item?.maLopHocPhan, accessToken, axiosJWT);
        if (!!result) setListLichHoc(result);
        //console.log(result);
    };

    const handleSearchLich = async (value) => {
        let result = await getLichTheoMa(value, accessToken, axiosJWT);
        //console.log(result);
        if (!!result && result.length !== 0) setListLichHoc(result);
    };

    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function getDayOfWeek(dateString) {
        let daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        let date = new Date(dateString);
        let dayOfWeek = daysOfWeek[date.getDay()];
        return dayOfWeek;
    }

    const checkData = () => {
        if (!!giangVien && !!caHoc && !!phongHoc) {
            return true;
        }
        return false;
    };

    const handleThemLich = async () => {
        if (checkData() === false) {
            // alert('Dữ liệu không hợp lệ');
            // return;
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Dữ liệu không hợp lệ!', 'Thông báo');
            return;
        }
        if (!!selectedLHP || selectedLHP?.maLopHocPhan !== '') {
            if (!selectedLichHoc || selectedLichHoc === '') {
                if (loaiLich === 'LP001') {
                    let resultNTH;
                    var nth = {
                        tenNhom: 'Nhóm 0',
                        soLuongSV: selectedLHP.siSo,
                        lopHocPhan: selectedLHP?.maLopHocPhan,
                        trangThai: 'Bình thường',
                    };
                    //console.log(nth.tenNhom);
                    var dsNhomTHDaCo = await getNhomTHTheoMaHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
                    let nhom = dsNhomTHDaCo.find((e) => e.tenNhom === 'Nhóm 0');
                    if (!!nhom) {
                        resultNTH = nhom;
                        let ngayHocDauTien = new Date(ngayHoc);

                        let lich = {
                            tenLich: '',
                            loaiLich: 'Lý thuyết',
                            ngayHoc: ngayHocDauTien,
                            trangThai: trangThaiLich,
                            phong: phongHoc,
                            nhanVien: giangVien,
                            lopHocPhan: selectedLHP?.maLopHocPhan,
                            caHoc: caHoc,
                            nhomThucHanh: resultNTH.maNhom,
                            //nhomTH: loaiLich === 'LP001' ? 0 : nhomTH,
                        };
                        //console.log(lich);
                        await themLich(lich, accessToken, axiosJWT);
                        //ngayHocDauTien.setDate(ngayHocDauTien.getDate() + 7);
                    } else {
                        resultNTH = await addNhomTH(nth, accessToken, axiosJWT);
                        //console.log(resultNTH);
                        let ngayHocDauTien = new Date(ngayHoc);
                        for (let i = 0; i < (selectedLHP.hocPhan.monHoc.soTCLT * 15) / 3; i++) {
                            let lich = {
                                tenLich: '',
                                loaiLich: 'Lý thuyết',
                                ngayHoc: ngayHocDauTien,
                                trangThai: trangThaiLich,
                                phong: phongHoc,
                                nhanVien: giangVien,
                                lopHocPhan: selectedLHP?.maLopHocPhan,
                                caHoc: caHoc,
                                nhomThucHanh: resultNTH.maNhom,
                                //nhomTH: loaiLich === 'LP001' ? 0 : nhomTH,
                            };
                            //console.log(lich);
                            await themLich(lich, accessToken, axiosJWT);
                            ngayHocDauTien.setDate(ngayHocDauTien.getDate() + 7);
                        }
                    }
                    //lich thuc hanh
                } else {
                    let resultNTH;

                    var nth = {
                        tenNhom: 'Nhóm ' + nhomTH,
                        soLuongSV: soLuongSV,
                        lopHocPhan: selectedLHP?.maLopHocPhan,
                        trangThai: 'Bình thường',
                    };
                    var dsNhomTHDaCo = await getNhomTHTheoMaHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
                    let nhom = dsNhomTHDaCo.find((e) => e.tenNhom === 'Nhóm ' + nhomTH);
                    if (!!nhom) {
                        resultNTH = nhom;
                        let ngayHocDauTien = new Date(ngayHoc);
                        //resultNTH = await addNhomTH(nth, accessToken, axiosJWT);
                        //for (let i = 0; i < (selectedLHP.hocPhan.monHoc.soTCTH * 30) / 3; i++) {
                        let lich = {
                            tenLich: '',
                            loaiLich: 'Thực hành',
                            ngayHoc: ngayHocDauTien,
                            trangThai: trangThaiLich,
                            phong: phongHoc,
                            nhanVien: giangVien,
                            lopHocPhan: selectedLHP?.maLopHocPhan,
                            caHoc: caHoc,
                            nhomThucHanh: resultNTH.maNhom,
                            //nhomTH: loaiLich === 'LP001' ? 0 : nhomTH,
                        };
                        //console.log(lich);
                        await themLich(lich, accessToken, axiosJWT);
                        //ngayHocDauTien.setDate(ngayHocDauTien.getDate() + 7);
                        //}
                    } else {
                        let ngayHocDauTien = new Date(ngayHoc);
                        resultNTH = await addNhomTH(nth, accessToken, axiosJWT);
                        for (let i = 0; i < (selectedLHP.hocPhan.monHoc.soTCTH * 30) / 3; i++) {
                            let lich = {
                                tenLich: '',
                                loaiLich: 'Thực hành',
                                ngayHoc: ngayHocDauTien,
                                trangThai: trangThaiLich,
                                phong: phongHoc,
                                nhanVien: giangVien,
                                lopHocPhan: selectedLHP?.maLopHocPhan,
                                caHoc: caHoc,
                                nhomThucHanh: resultNTH.maNhom,
                                //nhomTH: loaiLich === 'LP001' ? 0 : nhomTH,
                            };
                            //console.log(lich);
                            await themLich(lich, accessToken, axiosJWT);
                            ngayHocDauTien.setDate(ngayHocDauTien.getDate() + 7);
                        }
                    }
                }
            }
            //update lich
            else {
                //console.log(selectedLichHoc);
                let lich = {
                    maLich: selectedLichHoc.maLich,
                    tenLich: '',
                    loaiLich: loaiLich === 'LP001' ? 'Lý thuyết' : 'Thực hành',
                    ngayHoc: ngayHoc,
                    trangThai: trangThaiLich,
                    phong: phongHoc,
                    nhanVien: giangVien,
                    lopHocPhan: selectedLHP?.maLopHocPhan,
                    caHoc: caHoc,
                    nhomThucHanh: selectedLichHoc.nhomThucHanh.maNhom,
                    //nhomTH: loaiLich === 'LP001' ? 0 : nhomTH,
                };
                await updateLich(lich, accessToken, axiosJWT);
            }
            //alert('Đã lưu lịch học');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Đã lưu lịch học!', 'Thông báo');

            handleClickCloseModalLichHoc();
            let result = await getLichTheoLHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
            if (!!result) setListLichHoc(result);
            setReloadPhong(!reloadPhong);
            setReloadCaHoc(!reloadCaHoc);
        } else {
            //alert('Vui lòng chọn lớp học phần')
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Vui lòng chọn lớp học phần!', 'Thông báo');
            return;
        }
    };

    const handleXoaLopHP = async () => {
        if (!!selectedLHP && selectedLHP?.maLopHocPhan !== '') {
            let dsNhomTHDaCo = await getNhomTHTheoMaHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
            await xoaLichTheoMaLHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
            // if (!!dsNhomTHDaCo && dsNhomTHDaCo.length > 0)
            //     for (let i = 0; i < dsNhomTHDaCo.length; i++)
            await xoaChiTietPDKTheoMaLHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
            await xoaNhomTHTheoMaLHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);
            await xoaLHPTheoMaLHP(selectedLHP?.maLopHocPhan, accessToken, axiosJWT);

            let result = await getLopHocPhanTheoMaHP(selectedHP.maHocPhan, selectedOptionHK, accessToken, axiosJWT);
            setListLHP(result);
            setSelectedLHP();
            setListLichHoc();
        } else {
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Vui lòng chọn lớp học phần cần xóa!', 'Thông báo');
            return;
        } //alert('Vui lòng chọn lớp học phần cần xóa');
    };

    useEffect(() => {
        const getALLHocKy = async () => {
            const getTatCaHK = await getTatCaHocKy(accessToken, axiosJWT, dispatch);

            setListHocKy(getTatCaHK);
        };
        const getALLCaHoc = async () => {
            const getTatCaCH = await getTatCaCaHoc(accessToken, axiosJWT, dispatch);

            setListCaHoc(getTatCaCH);
        };

        //console.log(listCaHoc);
        const getALLDayNha = async () => {
            const getTatCaDN = await getTatCaDayNha(accessToken, axiosJWT, dispatch);

            setListDayNha(getTatCaDN);
        };
        const getALLKhoa = async () => {
            const khoa = await getTatCaKhoa(accessToken, axiosJWT, dispatch);

            setListKhoa(khoa);
        };
        const getALLGV = async () => {
            const gv = await getTatCaNhanVien(accessToken, axiosJWT, dispatch);

            setListGV(gv);
        };
        getALLHocKy();
        getALLCaHoc();
        getALLDayNha();
        getALLKhoa();
        getALLGV();
    }, []);

    //console.log(selectedLichHoc);

    useEffect(() => {
        //if (!!selectedLHP) {
        // var date = new Date(selectedLHP?.ngayBatDau);
        // var thuTongTuan = getNextDayOfWeek(date, ngayHoc);
        // let formattedDate = `${thuTongTuan.getFullYear()}-${(thuTongTuan.getMonth() + 1)
        //     .toString()
        //     .padStart(2, '0')}-${thuTongTuan.getDate().toString().padStart(2, '0')}`;
        //console.log(caHoc);
        const getPhong = async () => {
            if (!!loaiLich && !!dayNha && !!ngayHoc && !!caHoc) {
                const getTatCaPhongTrong = await getPhongHocConTrong(
                    loaiLich,
                    dayNha,
                    ngayHoc,
                    caHoc,
                    accessToken,
                    axiosJWT,
                );
                setListPhongHoc(getTatCaPhongTrong);
            }
        };
        getPhong();
        //}
        // } //else alert('Vui lòng chọn lớp học phần cần thêm lịch');
    }, [reloadPhong]);
    useEffect(() => {
        const getCaHocKhongTrung = async () => {
            if (!!giangVien) {
                let result = await getTatCaCaHocKhongTrungLichDayGV(giangVien, ngayHoc, accessToken, axiosJWT);
                setListCaHoc(result);
            }
        };
        getCaHocKhongTrung();
    }, [reloadCaHoc, ngayHoc]);

    return (
        <div>
            <div className="w-full h-full justify-center items-center ">
                <div className="w-full flex justify-center items-center mt-3">
                    <div className="text-lg font-bold text-sv-blue-4">Quản lý lớp học phần</div>
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <div className="flex flex-row items-center ">
                        <div className="w-24 text-left">
                            <label htmlFor="">Học kỳ:</label>
                        </div>
                        <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                            <select
                                className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                value={selectedOptionHK}
                                onChange={(e) => handleSelectHK(e)}
                            >
                                <option value="">Học kỳ</option>
                                {listHocKy?.map((item) => (
                                    <option key={item.maHocKy} value={item.maHocKy}>
                                        {item.tenHocKy}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="border border-gray-300 w-[96%]"></div>
                </div>
                <div className="w-full flex justify-start items-center mt-3 mr-11 ml-10">
                    <div className="text-lg font-bold ">Danh sách học phần cần quản lý trong học kỳ</div>
                </div>
                <div style={{}} className=" mt-2 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="overflow-y-auto max-h-[480px] ">
                                <table className={cx('table')} id="data">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã học phần</th>
                                            <th>Tên học phần</th>
                                            <th>Điều kiện</th>
                                            <th>Số TCLT</th>
                                            <th>Số TCTH</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listHocPhan?.map((item, index) => (
                                            <tr
                                                key={item?.maHocPhan}
                                                onClick={() => handleSelectHocPhan(item)}
                                                className={`${
                                                    selectedHP.maHocPhan === `${item.maHocPhan}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item.maHocPhan}
                                                        checked={selectedHP.maHocPhan === `${item.maHocPhan}`}
                                                        onChange={() => handleSelectHocPhan(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maHocPhan}</td>
                                                <td>{item.tenHocPhan}</td>
                                                <td>{renderDanhSachDieuKien(item.monHoc)}</td>
                                                <td>{item.monHoc?.soTCLT}</td>
                                                <td>{item.monHoc?.soTCTH}</td>
                                                <td>{item.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center mt-5 mr-11 ml-10">
                    <div className="text-lg font-bold ">Danh sách các lớp học phần</div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <HeaderQL
                        placeholder={'Nhập tên, mã LHP'}
                        onPressAdd={handleClickOpenModalLHP}
                        onPressUpdate={handleClickOpenModalUpdateLHP}
                        onPressSearch={(value) => handleSearchLHP(value)}
                    />
                    <div className="ml-6">
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<AiFillDelete />}
                            // onClick={handleXoaLopHP}
                            onClick={handleConfirmation}
                        >
                            Xóa
                        </Button>
                    </div>
                </div>
                <div style={{}} className=" mt-2 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="overflow-y-auto max-h-[480px] ">
                                <table className={cx('table')} id="data">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã lớp học phần</th>
                                            <th>Tên lớp học phần</th>
                                            {/* <th>Điều kiện</th> */}
                                            <th>Sỉ số tối đa</th>
                                            <th>Đã đăng ký</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listLHP
                                            //?.filter((e) => e.trangThai !== 'Đã khóa')
                                            ?.map((item, index) => (
                                                <tr
                                                    key={item?.maLopHocPhan}
                                                    onClick={() => handleSelectLHP(item)}
                                                    className={`${
                                                        selectedLHP?.maLopHocPhan === `${item?.maLopHocPhan}`
                                                            ? 'bg-orange-200'
                                                            : ''
                                                    } hover:cursor-pointer`}
                                                >
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                            name="radio-group-lhp"
                                                            value={item?.maLopHocPhan}
                                                            checked={
                                                                selectedLHP?.maLopHocPhan === `${item?.maLopHocPhan}`
                                                            }
                                                            onChange={() => handleSelectLHP(item)}
                                                        />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.maLopHocPhan}</td>
                                                    <td>{item.tenLopHocPhan}</td>
                                                    <td>{item.siSo}</td>
                                                    <td>{item.siSoThuc}</td>
                                                    <td>{item.trangThai}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-start items-center mt-5 mr-11 ml-10">
                    <div className="text-lg font-bold ">Lịch học của lớp học phần</div>
                </div>
                <HeaderQL
                    placeholder={'Nhập mã lịch'}
                    onPressAdd={handleClickOpenModalLichHoc}
                    onPressUpdate={handleClickOpenModalUpdateLichHoc}
                    onPressSearch={(value) => handleSearchLich(value)}
                />
                <div style={{}} className=" mt-2 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="overflow-y-auto max-h-[480px] ">
                                <table className={cx('table')} id="data">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã lịch</th>
                                            <th>Lịch học</th>
                                            <th>Nhóm TH</th>
                                            {/* <th>Điều kiện</th> */}
                                            <th>Dãy nhà</th>
                                            <th>Phòng</th>
                                            <th>Giảng viên</th>
                                            <th>Ngày</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listLichHoc?.map((item, index) => (
                                            <tr
                                                key={item?.maLich}
                                                onClick={() => setSelectedLichHoc(item)}
                                                className={`${
                                                    selectedLichHoc?.maLich === `${item?.maLich}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-lich"
                                                        value={item.maLich}
                                                        checked={selectedLichHoc?.maLich === `${item?.maLich}`}
                                                        onChange={() => setSelectedLichHoc(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maLich}</td>
                                                <td align="center">
                                                    {item?.loaiLich === 'Lý thuyết' ? 'LT' : 'TH'} -{' '}
                                                    {getDayOfWeek(item?.ngayHoc)} ({item?.caHoc?.tenCaHoc})
                                                </td>
                                                <td>
                                                    {item?.nhomThucHanh?.tenNhom === 'Nhóm 0'
                                                        ? ''
                                                        : item?.nhomThucHanh?.tenNhom}
                                                </td>
                                                <td>{item?.phong?.dayNha?.tenDayNha}</td>
                                                <td>{item?.phong?.tenPhong}</td>
                                                <td>{item?.nhanVien?.tenNhanVien}</td>
                                                <td>
                                                    {/* {convertDateFormat(item.lopHocPhan?.ngayBatDau)} -{' '}
                                                    {convertDateFormat(item.lopHocPhan?.ngayKetThuc)} */}
                                                    {convertDateFormat(item?.ngayHoc)}
                                                </td>
                                                <td>{item?.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog fullWidth={'100%'} maxWidth={'100%'} open={openModalLHP} onClose={handleClickCloseModalLHP}>
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin lớp học phần</div>
                        <div>
                            <FaRegWindowClose
                                className="mr-5"
                                size={30}
                                color="#47A9FF"
                                onClick={handleClickCloseModalLHP}
                            />
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
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Mã lớp học phần:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã lớp học phần"
                                    disabled="true"
                                    value={maLopHocHocPhan}
                                    // onChange={(e) => {
                                    //     setMaLopHocPhan(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên lớp học phần:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên lớp học phần"
                                    value={tenLopHocHocPhan}
                                    onChange={(e) => {
                                        setTenLopHocPhan(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Sỉ số:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Sỉ số"
                                    value={siSo}
                                    onChange={(e) => {
                                        setSiSo(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ngày bắt đầu:</label>
                                </div>

                                <input
                                    type="date"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Tên lớp học phần"
                                    value={ngayBatDau}
                                    onChange={(e) => {
                                        setNgayBatDau(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ngày kết thúc:</label>
                                </div>

                                <input
                                    type="date"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Tên lớp học phần"
                                    value={ngayKetThuc}
                                    onChange={(e) => {
                                        setNgayKetThuc(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={trangThai}
                                        onChange={(e) => setTrangThai(e.target.value)}
                                    >
                                        <option value="Đang lên kế hoạch">Đang lên kế hoạch</option>
                                        <option value="Chờ sinh viên đăng ký">Chờ sinh viên đăng ký</option>
                                        <option value="Chấp nhận mở lớp">Chấp nhận mở lớp</option>
                                        <option value="Đã khóa">Đã khóa</option>
                                        <option value="Chờ hủy lớp">Chờ hủy lớp</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={handleAddLopHocPhan}
                            >
                                Lưu
                            </Button>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<BsFillEraserFill />}
                                    color="success"
                                    onClick={handleXoaTrangModalLHP}
                                >
                                    Xóa trắng
                                </Button>
                            </div>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    startIcon={<TiCancel />}
                                    onClick={handleClickCloseModalLHP}
                                >
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* Phần modal lịch học */}
                <Dialog
                    fullWidth={'100%'}
                    maxWidth={'100%'}
                    open={openModalLichHoc}
                    onClose={handleClickCloseModalLichHoc}
                >
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin lớp học phần</div>
                        <div>
                            <FaRegWindowClose
                                className="mr-5"
                                size={30}
                                color="#47A9FF"
                                onClick={handleClickCloseModalLichHoc}
                            />
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
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Mã lịch:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã lịch"
                                    disabled="true"
                                    value={maLich}
                                    // onChange={(e) => {
                                    //     setMaLopHocPhan(e.target.value);
                                    // }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Khoa:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={khoaGV}
                                        onChange={(e) => handleSelectKhoaGV(e)}
                                        // id="valueKhoaHoc"
                                    >
                                        <option value="">Khoa</option>
                                        {listKhoa?.map((item) => (
                                            <option key={item.maKhoa} value={item.maKhoa}>
                                                {item.tenKhoa}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Giảng viên:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={giangVien}
                                        onChange={(e) => handleSelectGiangVien(e)}
                                        // id="valueKhoaHoc"
                                    >
                                        <option value="">Giảng viên</option>
                                        {listGV?.map((item) => (
                                            <option key={item.maNhanVien} value={item.maNhanVien}>
                                                {item.tenNhanVien}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Loại lịch:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={loaiLich}
                                        onChange={(e) => handleSelectLoaiLich(e)}
                                        ///id="valueKhoaHoc"
                                    >
                                        <option value="LP001">Lý thuyết</option>
                                        <option value="LP002">Thực hành</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ngày trong tuần:</label>
                                </div>
                                <input
                                    type="date"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Tên lớp học phần"
                                    value={ngayHoc}
                                    onChange={(e) => {
                                        setNgayHoc(e.target.value);
                                    }}
                                />
                                {/* </div> */}
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Chọn ca học:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={caHoc}
                                        onChange={(e) => handleSelectCaHoc(e)}
                                        //id="a"
                                    >
                                        <option value="">Ca học</option>
                                        {listCaHoc?.map((item) => (
                                            <option key={item.maCaHoc} value={item.maCaHoc}>
                                                {item.tenCaHoc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Dãy nhà:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={dayNha}
                                        onChange={(e) => handleSelectDayNha(e)}
                                        //id="valueKhoaHoc"
                                    >
                                        <option value="">Dãy nhà</option>
                                        {listDayNha?.map((item) => (
                                            <option key={item.maDayNha} value={item.maDayNha}>
                                                {item.tenDayNha}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Phòng học:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={phongHoc}
                                        onChange={(e) => handleSelectPhongHoc(e)}
                                        // id="valueKhoaHoc"
                                    >
                                        <option value="">Phòng học</option>
                                        {listPhongHoc?.map((item) => (
                                            <option key={item.maPhong} value={item.maPhong}>
                                                {item.tenPhong}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={trangThaiLich}
                                        onChange={(e) => setTrangThaiLich(e.target.value)}
                                    >
                                        <option value="Bình thường">Bình thường</option>
                                        <option value="Online">Online</option>
                                        <option value="Lịch thi">Lịch thi</option>
                                        <option value="Tạm ngưng">Tạm ngưng</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={`${loaiLich === 'LP001' ? `hidden` : `w-full flex flex-row justify-between`} `}>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Nhóm TH:</label>
                                </div>

                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Nhóm TH"
                                    value={nhomTH}
                                    onChange={(e) => {
                                        setNhomTH(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số lượng SV nhóm TH:</label>
                                </div>

                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Nhóm TH"
                                    value={soLuongSV}
                                    onChange={(e) => {
                                        setSoLuongSV(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3"></div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={handleThemLich}
                            >
                                Lưu
                            </Button>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<BsFillEraserFill />}
                                    color="success"
                                    onClick={xoaRongModalThemLich}
                                >
                                    Xóa trắng
                                </Button>
                            </div>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    startIcon={<TiCancel />}
                                    onClick={handleClickCloseModalLichHoc}
                                >
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            {/* <Modal isOpen={showConfirmation} onRequestClose={() => setShowConfirmation(false)}>
                <h2>Xác nhận</h2>
                <p>Bạn có chắc chắn muốn làm điều này?</p>
                <button onClick={handleConfirm}>Đồng ý</button>
                <button onClick={handleCancel}>Từ chối</button>
            </Modal> */}
            <Dialog
                open={showConfirmation}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Bạn có chắc muốn xóa lớp học phần này?'}</DialogTitle>
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

export default LopHoc;
