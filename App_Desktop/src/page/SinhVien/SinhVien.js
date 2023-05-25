import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose, FaPlus } from 'react-icons/fa';
import { BsFillEraserFill } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import Autocomplete from '@mui/material/Autocomplete';
import { AiFillSave } from 'react-icons/ai';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { exportToExcel } from '../../function/exportToExcel';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import style from './SinhVien.module.scss';
import { TfiReload } from 'react-icons/tfi';
import {
    getTatCaSinhVien,
    capNhatSinhVien,
    themSinhVien,
    countSVByLopHoc,
    timKiemSinhVien,
    countSinhVienBySDT,
    countSinhVienByEmail,
    countSinhVienBySoCCCD,
} from '../../services/sinhVienService';
import { getTatCaKhoa } from '../../services/khoaService';
import { getNganhHocByKhoa } from '../../services/nganhService';
import { getLopHocByNganhHoc, themLopHoc, countLopHocByTenLopHoc } from '../../services/lopHocService';
import { getTatCaKhoaHoc } from '../../services/khoaHocService';
import { register } from '../../services/authService';

import moment from 'moment';
import { checkPassOld, updatePassword } from '~/services/authService';
import HeaderQl from '../../components/HeaderQL';
import {
    checkValidTen,
    checkValidSDT,
    checkValidNgaySinh,
    checkValidKhoa,
    checkValidNganh,
    checkValidEmail,
    checkValidKhoaHoc,
    checkValidCCCD,
} from '../../regex/regex';
import { uploadFile, deleteFile } from '~/services/fileService';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

const cx = classNames.bind(style);

function SinhVien() {
    const options = ['Option 1', 'Option 2'];
    const refLopHoc = useRef(null);
    const [open, setOpen] = useState(false);
    const [listChecked, setListChecked] = useState([]);
    const [khoaHoc, setKhoaHoc] = useState('null');

    const [listKhoaHocALL, setListKhoaHocALL] = useState([]);
    const [listKhoaHoc, setListKhoaHoc] = useState([]);

    const navigate = useNavigate();

    const [ngayVaoTruong, setNgayVaoTruong] = useState(new Date().toISOString().substr(0, 10));

    const [inputValue, setInputValue] = useState('');

    let [listKhoa, setListKhoa] = useState([]);
    const [khoa, setKhoa] = useState('');
    const [lopHoc, setLopHoc] = useState('');
    const [maLop, setMaLop] = useState('');
    const [listLH, setListLH] = useState([]);
    const [email, setEmail] = useState('');
    const [maSinhVien, setMaSinhVien] = useState('');
    const [tenSinhVien, setTenSinhVien] = useState('');
    const [nganhHoc, setNganhHoc] = useState('');
    const [soCCCD, setSoCCCD] = useState('');
    const [noiCapCCCD, setNoiCapCCCD] = useState('');
    const [listSV, setListSV] = useState();
    const [soDienThoai, setSoDienThoai] = useState('');
    const [linkAnh, setLinkAnh] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [ngayCapCCCD, setNgayCapCCCD] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [noiSinh, setNoiSinh] = useState('');
    const [doiTuong, setDoiTuong] = useState('');
    const [ngayVaoDang, setNgayVaoDang] = useState('');
    const [ngayVaoDoan, setNgayVaoDoan] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [selectedSinhVien, setSelectedSinhVien] = useState('');
    const [validTenSinhVien, setValidTenSinhVien] = useState('');

    const [demSVLopHoc, setDemSVLopHoc] = useState('');
    const [demSDT, setDemSDT] = useState(0);
    const [demCCCD, setDemSoCCCD] = useState(0);
    let [countSV, setCountSV] = useState(0);
    const [demEmail, setDemEmail] = useState(0);
    const [valueAvatar, setValueAvatar] = useState(null);
    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);

    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listNganh, setListNganh] = useState([]);

    const handleExportExcel = () => {
        exportToExcel('data-sv', 'Danh sách sinh viên');
    };

    useEffect(() => {
        const getALLKhoa = async () => {
            try {
                const getKhoa = await getTatCaKhoa(accessToken, axiosJWT, dispatch);
                setListKhoa(getKhoa);
            } catch (error) {
                console.log(error);
            }
        };
        getALLKhoa();
    }, []);
    useEffect(() => {
        const getALLKhoaHoc = async () => {
            try {
                const getKhoaHoc = await getTatCaKhoaHoc(accessToken, axiosJWT, dispatch);
                setListKhoaHoc(getKhoaHoc);
            } catch (error) {
                console.log(error);
            }
        };
        getALLKhoaHoc();
    }, []);

    useEffect(() => {
        const getALLSinhVien = async () => {
            const getTatCaSV = await getTatCaSinhVien(accessToken, axiosJWT, dispatch);

            setListSV(getTatCaSV);
        };
        getALLSinhVien();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    function handleSelectKhoa(event) {
        setKhoa(event.target.value);
    }
    const handleClickReSet = async () => {
        if (!!selectedSinhVien) {
            if (window.confirm('Bạn chắc chắn muốn reset lại mật khẩu?')) {
                await updatePassword(selectedSinhVien.maSinhVien, '123456', accessToken, axiosJWT);
                //alert('Cập nhật mật khẩu thành công');
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.success('Cập nhật mật khẩu thành công!', 'Thông báo');
                return;
            }
        } else {
            //alert('Vui lòng chọn sinh viên');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Vui lòng chọn sinh viên!', 'Thông báo');
            return;
        }
    };
    const xoaTrang = () => {
        setTenSinhVien('');
        setLinkAnh('');
        setSoDienThoai('');
        setGioiTinh('true');
        setNgaySinh('');
        setKhoa('');
        setNganhHoc('');
        setLopHoc('');
        setEmail('');
        setKhoaHoc('');
        setNgayVaoTruong(new Date().toISOString().substr(0, 10));
        setSoCCCD('');
        setNgayCapCCCD('');
        setNoiCapCCCD('');
        setDiaChi('');
        setNoiSinh('');
        setDoiTuong('');
        setNgayVaoDang('');
        setNgayVaoDoan('');
        setTrangThai('Bình thường');
    };
    const handleClickOpenThem = () => {
        setMaSinhVien('');

        setSelectedSinhVien('');
        xoaTrang();
        setOpen(true);
    };

    const handleSelectSinhVien = (item) => {
        setSelectedSinhVien(item);
    };
    const handleClickSearch = async (value) => {
        const timSinhVien = await timKiemSinhVien(value, accessToken, axiosJWT);
        setListSV(timSinhVien);
    };

    const handleClickAddLopHoc = async () => {
        const lop = {
            maLop: maLop,
            tenLop: refLopHoc.current.value,
            nganhHoc: nganhHoc,
        };

        if (lop.tenLop !== '' && nganhHoc != null) {
            const countLopHoc = await countLopHocByTenLopHoc(refLopHoc.current.value, accessToken, axiosJWT);
            if (countLopHoc >= 1) {
                //alert('Tên lớp học này đã tồn tại!!!');
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.error('Tên lớp học đã tồn tại!', 'Thông báo');
                return;
            } else {
                const addLop = await themLopHoc(lop, accessToken, axiosJWT);
                if (addLop) {
                    //alert('Thêm thành công');
                    toastr.options = {
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 0,
                        tapToDismiss: false,
                    };
                    toastr.success('Thêm lớp học thành công!', 'Thông báo');
                    setLopHoc(refLopHoc);

                    setListLH((prev) => [addLop, ...prev]);
                    return;
                }
            }
        } else {
            //alert('Vui lòng nhập tên lớp');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Vui lòng nhập tên lớp!', 'Thông báo');
            return;
        }
    };

    useEffect(() => {
        if (!!khoa) {
            const getNganh = async () => {
                const getNganhTheoKhoa = await getNganhHocByKhoa(khoa, accessToken, axiosJWT);
                if (!!getNganhTheoKhoa) {
                    setListNganh(getNganhTheoKhoa);
                }
            };
            getNganh();
        } else {
            setListNganh([]);
        }
    }, [khoa]);
    useEffect(() => {
        if (!!nganhHoc) {
            const getLopHoc = async () => {
                const getLopHocTheoNganh = await getLopHocByNganhHoc(nganhHoc, accessToken, axiosJWT);

                setListLH(getLopHocTheoNganh);
            };
            getLopHoc();
        } else {
            setListLH([]);
        }
    }, [nganhHoc]);

    let sinhVien = {
        maSinhVien,
        tenSinhVien,
        linkAnh,
        soDienThoai,
        gioiTinh,
        ngaySinh,
        khoa,
        nganhHoc,
        lopHoc,
        email,
        khoaHoc,
        ngayVaoTruong,
        soCCCD,
        ngayCapCCCD,
        noiCapCCCD,
        diaChi,
        noiSinh,
        doiTuong,
        ngayVaoDang,
        ngayVaoDoan,
        trangThai,
    };

    //console.log(sinhVien);
    const handleClickOpenCapNhat = () => {
        if (!!selectedSinhVien) {
            setTenSinhVien(selectedSinhVien.tenSinhVien);
            setLinkAnh(selectedSinhVien.linkAnh);
            setMaSinhVien(selectedSinhVien.maSinhVien);
            setSoDienThoai(selectedSinhVien.soDienThoai);
            setGioiTinh(selectedSinhVien?.gioiTinh);
            setNgaySinh(selectedSinhVien.ngaySinh);
            setEmail(selectedSinhVien.email);
            setLopHoc(selectedSinhVien?.lopHoc);
            setKhoaHoc(selectedSinhVien?.khoaHoc?.maKhoaHoc);
            setNganhHoc(selectedSinhVien?.lopHoc?.nganhHoc?.maNganh);
            setKhoa(selectedSinhVien?.lopHoc?.nganhHoc?.khoa?.maKhoa);
            setSoCCCD(selectedSinhVien.soCCCD);
            setNgayCapCCCD(selectedSinhVien.ngayCapCCCD);
            setNoiCapCCCD(selectedSinhVien.noiCapCCCD);
            setDiaChi(selectedSinhVien.diaChi);
            setNoiSinh(selectedSinhVien.noiSinh);
            setDoiTuong(selectedSinhVien.doiTuong);
            setNgayVaoDoan(selectedSinhVien.ngayVaoDoan);
            setNgayVaoDang(selectedSinhVien.ngayVaoDang);
            setTrangThai(selectedSinhVien.trangThai);
            setLinkAnh(selectedSinhVien.linkAnh);
            setOpen(true);
        } else {
            //alert('Vui lòng chọn sinh viên');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Vui lòng chọn sinh viên!', 'Thông báo');
            return;
        }
    };
    const reload = async () => {
        let getTatCaSV = await getTatCaSinhVien(accessToken, axiosJWT, dispatch);

        setListSV(getTatCaSV);
    };

    // Hàm kiểm tra trùng số điện thoại
    useEffect(() => {
        const dem = async () => {
            const countSVByLH = await countSVByLopHoc(lopHoc?.maLop, accessToken, axiosJWT);
            setDemSVLopHoc(countSVByLH);
        };
        dem();
    }, [lopHoc, refLopHoc]);

    const checkLopHoc = (lopHoc) => {
        if (!!lopHoc && demSVLopHoc < 80) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        const dem = async () => {
            const checkEmail = await countSinhVienByEmail(email, accessToken, axiosJWT);
            setDemEmail(checkEmail);
        };
        dem();
    }, [email]);
    function checkTrungEmail(email) {
        if (email === selectedSinhVien?.email) {
            return true;
        } else if (checkValidEmail(email) && demEmail === 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        const dem = async () => {
            const checkSoCCCD = await countSinhVienBySoCCCD(soCCCD, accessToken, axiosJWT);
            setDemSoCCCD(checkSoCCCD);
        };
        dem();
    }, [soCCCD]);

    const checkTrungSoCCCD = (soCCCD) => {
        if (soCCCD === selectedSinhVien?.soCCCD) {
            return true;
        } else if (checkValidCCCD(soCCCD) && demCCCD === 0) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        const dem = async () => {
            const checkSDT = await countSinhVienBySDT(soDienThoai, accessToken, axiosJWT);
            setDemSDT(checkSDT);
        };
        dem();
    }, [soDienThoai]);

    const checkTrungSoDienThoai = (sdt) => {
        if (sdt === selectedSinhVien?.soDienThoai) {
            return true;
        } else if (checkValidSDT(sdt) && demSDT === 0) {
            return true;
        }
        return false;
    };

    const luuSinhVien = async () => {
        //console.log(sinhVien);
        if (
            checkValidTen(tenSinhVien) &&
            checkValidNgaySinh(ngaySinh) &&
            checkTrungSoDienThoai(soDienThoai) &&
            checkValidKhoa(khoa) &&
            checkValidNganh(nganhHoc) &&
            checkLopHoc(lopHoc) &&
            checkTrungSoCCCD(soCCCD) &&
            checkTrungEmail(email)
        ) {
            let formDataFile = new FormData();
            formDataFile.append('file', valueAvatar);
            let linkAvatar = (await uploadFile(formDataFile, accessToken, axiosJWT)) || '';
            //console.log(linkAvatar);
            sinhVien = { ...sinhVien, linkAnh: linkAvatar !== '' ? linkAvatar : selectedSinhVien.linkAnh };
            if (!!selectedSinhVien) {
                sinhVien.maSinhVien = selectedSinhVien.maSinhVien;

                let suaSinhVien = await capNhatSinhVien(sinhVien, accessToken, axiosJWT);

                if (suaSinhVien) {
                    setOpen(false);
                    //alert('Cập nhật thành công');
                    toastr.options = {
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 0,
                        tapToDismiss: false,
                    };
                    toastr.success('Cập nhật thông tin thành công!', 'Thông báo');
                    reload();
                    return;
                }
            } else {
                let addSinhVien = await themSinhVien(sinhVien, accessToken, axiosJWT);

                const sinhVienRegister = {
                    username: addSinhVien.maSinhVien,
                    password: '123456',
                    role: 'ROLE_SINHVIEN',
                };

                //console.log(sinhVienRegister);
                await register(sinhVienRegister);
                if (addSinhVien && sinhVienRegister) {
                    setOpen(false);
                    //await new Promise((resolve) => setTimeout(resolve, 0));
                    //alert('Thêm thành công');
                    toastr.options = {
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 0,
                        tapToDismiss: false,
                    };
                    toastr.success('Thêm thành công!', 'Thông báo');
                    reload();
                    return;
                }
            }
        } else {
            //alert('Dữ liệu nhập vào chưa phù hơp!!');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Dữ liệu nhập vào thông hợp lệ!', 'Thông báo');
            return;
        }
    };

    return (
        <>
            <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin sinh viên</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>
                <DialogContent>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Mã số sinh viên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Mã tự động tạo"
                                value={maSinhVien}
                                disabled
                                onChange={(e) => {
                                    setMaSinhVien(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Họ và tên:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="text"
                                    className="block m-4 mb-0 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic"
                                    placeholder="Họ tên sinh viên"
                                    value={tenSinhVien}
                                    onChange={(e) => setTenSinhVien(e.target.value)}
                                />
                                {!checkValidTen(tenSinhVien) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Tên sinh viên không được rỗng và không chứa số!!
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Hình ảnh:</label>
                            </div>
                            <input
                                type="file"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="link hình ảnh"
                                accept="image/*"
                                //value={valueAvatar}
                                onChange={(e) => {
                                    setValueAvatar(e.target.files[0]);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Số điện thoại:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="text"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số điện thoại"
                                    value={soDienThoai}
                                    onChange={(e) => setSoDienThoai(e.target.value)}
                                />

                                {!checkTrungSoDienThoai(soDienThoai) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Số điện thoại không đúng hoặc đã tồn tại
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Giới tính:</label>
                            </div>
                            <div className="">
                                <div>
                                    <select
                                        value={gioiTinh}
                                        onChange={(e) => setGioiTinh(e.target.value)}
                                        name="selectedFruit"
                                        className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    >
                                        <option value="true">Nam</option>
                                        <option value="false">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày sinh:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="date"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Ngày sinh"
                                    value={ngaySinh}
                                    onChange={(e) => setNgaySinh(e.target.value)}
                                />
                                {!checkValidNgaySinh(ngaySinh) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Bắt buộc!!
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Khoa:</label>
                            </div>

                            <div className="h-16">
                                <select
                                    value={khoa}
                                    onChange={(e) => setKhoa(e.target.value)}
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                >
                                    <option value="">Khoa</option>
                                    {listKhoa.map((option) => (
                                        <option key={option.maKhoa} value={option.maKhoa}>
                                            {option.tenKhoa}
                                        </option>
                                    ))}
                                </select>
                                {!checkValidKhoa(khoa) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Bắt buộc
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngành:</label>
                            </div>
                            <div className="h-16">
                                <select
                                    value={nganhHoc}
                                    onChange={(e) => setNganhHoc(e.target.value)}
                                    name="selectedFruit"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                >
                                    <option value="">Ngành</option>
                                    {listNganh?.map((option) => (
                                        <option key={option?.maNganh} value={option?.maNganh}>
                                            {option?.tenNganh}
                                        </option>
                                    ))}
                                </select>
                                {!checkValidNganh(nganhHoc) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Bắt buộc
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Lớp học:</label>
                            </div>
                            <div className=" w-60 h-9 flex justify-center items-center m-4">
                                <div className="h-16">
                                    <div className="flex flex-row w-60 items-center m-4 mb-0">
                                        <Autocomplete
                                            value={lopHoc}
                                            onChange={(e, value) => setLopHoc(value)}
                                            id="controllable-states-demo"
                                            options={listLH}
                                            getOptionLabel={(option) => option.tenLop || ''}
                                            freeSolo
                                            sx={{
                                                width: 240,

                                                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: '#47A9FF',
                                                    borderRadius: '5px',
                                                    border: '2',
                                                    height: 40,
                                                },
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    label="Lớp học"
                                                    placeholder="Chọn lớp học"
                                                    inputRef={refLopHoc}
                                                />
                                            )}
                                        />
                                        <div className="ml-3">
                                            <FaPlus size={20} color="green" onClick={handleClickAddLopHoc} />
                                        </div>
                                    </div>
                                    {!checkLopHoc(lopHoc) && (
                                        <span
                                            className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}
                                        >
                                            Bắt buộc
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Email:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="text"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                {!checkTrungEmail(email) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Email không đúng hoặc đã tồn tại
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Khóa học:</label>
                            </div>

                            <div className="h-16">
                                <select
                                    name="selectedFruit"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    value={khoaHoc}
                                    onChange={(e) => {
                                        setKhoaHoc(e.target.value);
                                    }}
                                >
                                    <option value="">Khóa học</option>
                                    {listKhoaHoc?.map((option) => (
                                        <option key={option?.maKhoaHoc} value={option?.maKhoaHoc}>
                                            {option?.tenKhoaHoc}
                                        </option>
                                    ))}
                                </select>
                                {!checkValidKhoaHoc(khoaHoc) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Bắt buộc
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào trường:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Ngày vào trường"
                                value={ngayVaoTruong}
                                onChange={(e) => {
                                    setNgayVaoTruong(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Số CCCD:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="text"
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số căn cước công dân"
                                    value={soCCCD}
                                    onChange={(e) => {
                                        setSoCCCD(e.target.value);
                                    }}
                                />
                                {!checkTrungSoCCCD(soCCCD) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Số CCCD không đúng hoặc bị trùng
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày cấp:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Ngày cấp"
                                value={ngayCapCCCD}
                                onChange={(e) => {
                                    setNgayCapCCCD(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi cấp:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Nơi cấp CCCD"
                                value={noiCapCCCD}
                                onChange={(e) => {
                                    setNoiCapCCCD(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Địa chỉ:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Địa chỉ"
                                value={diaChi}
                                onChange={(e) => {
                                    setDiaChi(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Nơi sinh:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                value={noiSinh}
                                onChange={(e) => {
                                    setNoiSinh(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Đối tượng:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào Đảng:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào đoàn:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Số điện thoại"
                                // value={valueSDT}
                                // onChange={(e) => {
                                //     setValueTenGV(e.target.value);
                                // }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Trạng thái:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    // value={trangThai}
                                    // onChange={handleSelectTrangThai}
                                >
                                    <option value="Bình thường">Bình thường</option>
                                    <option value="Tạm ngưng">Tạm ngưng</option>
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
                            onClick={() => {
                                luuSinhVien();
                            }}
                        >
                            Lưu
                        </Button>
                        <div className="ml-6">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<BsFillEraserFill />}
                                color="success"
                                //onClick={() => onPressSearch(valueSearch)}
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
                                //onClick={() => onPressSearch(valueSearch)}
                            >
                                Hủy bỏ
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="w-full h-full mt-5 mr-5">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý sinh viên</div>
                <div className=" flex justify-center flex-row items-center m-2">
                    <HeaderQl
                        placeholder="Mã, tên sinh viên"
                        onPressSearch={handleClickSearch}
                        onPressAdd={handleClickOpenThem}
                        onPressUpdate={handleClickOpenCapNhat}
                        onChangeSearch={handleClickSearch}
                    />
                    <div className="ml-6 ">
                        <Button
                            className="text-sm"
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<TfiReload />}
                            onClick={() => handleClickReSet()}
                        >
                            Reset mật khẩu
                        </Button>
                    </div>
                </div>
                <div style={{}} className="h-3/4 mr-5 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-SV')} id="data-sv">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã số SV</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>Ngày sinh</th>
                                            <th>Lớp</th>
                                            <th>Khoa</th>
                                            <th>Khóa học</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listSV?.map((item, index) => (
                                            <tr
                                                key={item.maSinhVien}
                                                onClick={() => handleSelectSinhVien(item)}
                                                className={`${
                                                    selectedSinhVien.maSinhVien === `${item.maSinhVien}`
                                                        ? 'bg-orange-200'
                                                        : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                            name="radio-group-mon"
                                                            value={item.maSinhVien}
                                                            checked={
                                                                selectedSinhVien.maSinhVien === `${item.maSinhVien}`
                                                            }
                                                            onChange={() => handleSelectSinhVien(item)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item?.maSinhVien}</td>
                                                <td align="left">{item.tenSinhVien}</td>
                                                <td>{item.gioiTinh ? 'Nam' : 'Nữ'}</td>
                                                <td>{convertDateFormat(item?.ngaySinh)}</td>
                                                <td align="left">{item?.lopHoc?.tenLop}</td>
                                                <td align="left">{item?.lopHoc?.nganhHoc?.khoa?.tenKhoa}</td>
                                                <td align="left">{item?.khoaHoc?.tenKhoaHoc}</td>
                                                <td>{item.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SinhVien;
