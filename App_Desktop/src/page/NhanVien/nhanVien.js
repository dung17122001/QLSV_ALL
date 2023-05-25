import React, { useState, useEffect } from 'react';
import HeaderQL from '../../components/HeaderQL/HeaderQL';

import { Avatar, Button, Link } from '@mui/material';
import { IoIosAddCircle } from 'react-icons/io';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { TfiReload } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import {
    themNhanVien,
    timKiemNhanVien,
    countNhanVienByEmail,
    countNhanVienBySoCCCD,
    countNhanVienBySDT,
} from '../../services/nhanVienService';
import { capNhatNhanVien } from '../../services/nhanVienService';

import { TiCancel } from 'react-icons/ti';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { getTatCaKhoa } from '../../services/khoaService';
import { getTatCaChucVu } from '../../services/chucVuService';
import { register } from '../../services/authService';
import { getTatCaNhanVien } from '../../services/nhanVienService';
import { exportToExcel } from './exportToExcel';
import classNames from 'classnames/bind';
import style from './NhanVien.module.scss';
import { uploadFile, deleteFile } from '~/services/fileService';
import {
    checkValidTen,
    checkValidSDT,
    checkValidNgaySinh,
    checkValidKhoa,
    checkValidChucVu,
    checkValidNganh,
    checkValidEmail,
    checkValidKhoaHoc,
    checkValidCCCD,
} from '../../regex/regex';
import { checkPassOld, updatePassword } from '~/services/authService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

function GiangVien() {
    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    let [listKhoa, setListKhoa] = useState([]);
    let [listChucVu, setListChucVu] = useState([]);
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [open, setOpen] = useState(false);
    const [tenNhanVien, setTenNhanVien] = useState('');
    const [maNhanVien, setMaNhanVien] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [demSDT, setDemSDT] = useState(0);
    const [demCCCD, setDemSoCCCD] = useState(0);

    const [demEmail, setDemEmail] = useState(0);
    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setEmail] = useState('');
    const [khoa, setKhoa] = useState('null');
    const [chucVu, setChucVu] = useState('null');
    const [soCCCD, setSoCCCD] = useState('');
    const [ngayCapCCCD, setNgayCapCCCD] = useState('');
    const [noiCapCCCD, setNoiCapCCCD] = useState('');
    const [diaChi, setDiaChi] = useState('');
    const [noiSinh, setNoiSinh] = useState('');
    const [doiTuong, setDoiTuong] = useState('');
    const [ngayVaoDoan, setNgayVaoDoan] = useState('');
    const [ngayVaoDang, setNgayVaoDang] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [valueAvatar, setValueAvatar] = useState(null);
    const [linkAnh, setLinkAnh] = useState('');
    const [hocVi, setHocVi] = useState('');

    let nhanVien = {
        maNhanVien,
        diaChi,
        doiTuong,
        email,
        ngayCapCCCD,
        ngaySinh,
        ngayVaoDang,
        ngayVaoDoan,
        noiCapCCCD,
        noiSinh,
        soDienThoai,
        gioiTinh,
        tenNhanVien,
        trangThai,
        chucVu,
        soCCCD,
        khoa,
        hocVi,
    };

    const [listNV, setListNV] = useState();
    const [selectedNhanVien, setSelectedNhanVien] = useState('');
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
        const getALLChucVu = async () => {
            try {
                const getChucVu = await getTatCaChucVu(accessToken, axiosJWT, dispatch);
                setListChucVu(getChucVu);
            } catch (error) {
                console.log(error);
            }
        };
        getALLChucVu();
    }, []);

    useEffect(() => {
        let getALLNhanVien = async () => {
            let getTatCaNV = await getTatCaNhanVien(accessToken, axiosJWT, dispatch);

            setListNV(getTatCaNV);
        };
        getALLNhanVien();
    }, []);
    const reload = async () => {
        let getTatCaNV = await getTatCaNhanVien(accessToken, axiosJWT, dispatch);

        setListNV(getTatCaNV);
    };

    const handleClickOpenCapNhat = () => {
        if (!!selectedNhanVien) {
            setTenNhanVien(selectedNhanVien.tenNhanVien);
            setMaNhanVien(selectedNhanVien.maNhanVien);
            setSoDienThoai(selectedNhanVien.soDienThoai);
            setGioiTinh(selectedNhanVien.gioiTinh);
            setNgaySinh(selectedNhanVien.ngaySinh);
            setEmail(selectedNhanVien.email);
            setKhoa(selectedNhanVien.khoa?.maKhoa);
            setChucVu(selectedNhanVien.chucVu?.maChucVu);
            setSoCCCD(selectedNhanVien.soCCCD);
            setNgayCapCCCD(selectedNhanVien.ngayCapCCCD);
            setNoiCapCCCD(selectedNhanVien.noiCapCCCD);
            setDiaChi(selectedNhanVien.diaChi);
            setNoiSinh(selectedNhanVien.noiSinh);
            setDoiTuong(selectedNhanVien.doiTuong);
            setNgayVaoDoan(selectedNhanVien.ngayVaoDoan);
            setNgayVaoDang(selectedNhanVien.ngayVaoDang);
            setTrangThai(selectedNhanVien.trangThai);
            //setLinkAnh(selectedNhanVien.linkAnh);
            setOpen(true);
            setHocVi(selectedNhanVien.hocVi);
        } else {
            //alert('Vui lòng chọn nhân viên');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Vui lòng chọn nhân viên!', 'Thông báo');
            return;
        }
    };
    const xoaTrang = () => {
        setTenNhanVien('');

        setSoDienThoai('');
        setGioiTinh('true');
        setNgaySinh('');
        setEmail('');
        setKhoa('');
        setChucVu('');
        setSoCCCD('');
        setNgayCapCCCD('');
        setNoiCapCCCD('');
        setDiaChi('');
        setNoiSinh('');
        setDoiTuong('');
        setNgayVaoDoan('');
        setNgayVaoDang('');
        setTrangThai('Bình thường');
        setLinkAnh('');
        setHocVi('');
    };
    const handleClickOpenThem = () => {
        setMaNhanVien('');
        setSelectedNhanVien('');
        xoaTrang();
        setOpen(true);
        //console.log(selectedNhanVien);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectNhanVien = (item) => {
        setSelectedNhanVien(item);
    };

    useEffect(() => {
        const dem = async () => {
            const checkEmail = await countNhanVienByEmail(email, accessToken, axiosJWT);
            setDemEmail(checkEmail);
        };
        dem();
    }, [email]);
    function checkTrungEmail(email) {
        if (email === selectedNhanVien?.email) {
            return true;
        } else if (checkValidEmail(email) && demEmail === 0) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        const dem = async () => {
            const checkSDT = await countNhanVienBySDT(soDienThoai, accessToken, axiosJWT);
            setDemSDT(checkSDT);
        };
        dem();
    }, [soDienThoai]);

    const checkTrungSoDienThoai = (sdt) => {
        if (sdt === selectedNhanVien?.soDienThoai) {
            return true;
        } else if (checkValidSDT(sdt) && demSDT === 0) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        const dem = async () => {
            const checkSoCCCD = await countNhanVienBySoCCCD(soCCCD, accessToken, axiosJWT);
            setDemSoCCCD(checkSoCCCD);
        };
        dem();
    }, [soCCCD]);

    const checkTrungSoCCCD = (soCCCD) => {
        if (soCCCD === selectedNhanVien?.soCCCD) {
            return true;
        } else if (checkValidCCCD(soCCCD) && demCCCD === 0) {
            return true;
        }
        return false;
    };
    const luuNhanVien = async () => {
        let formDataFile = new FormData();
        formDataFile.append('file', valueAvatar);
        let linkAvatar = (await uploadFile(formDataFile, accessToken, axiosJWT)) || '';
        //console.log(linkAvatar);
        nhanVien = { ...nhanVien, linkAnh: linkAvatar !== '' ? linkAvatar : selectedNhanVien.linkAnh };
        if (!!selectedNhanVien) {
            nhanVien.maNhanVien = selectedNhanVien.maNhanVien;

            let suaNhanVien = await capNhatNhanVien(nhanVien, accessToken, axiosJWT);

            if (suaNhanVien) {
                setOpen(false);
                //alert('Cập nhật thành công');
                reload();
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.success('Cập nhật thành công!', 'Thông báo');
                return;
            }
        } else {
            let role = '';
            let addNhanVien = await themNhanVien(nhanVien, accessToken, axiosJWT);
            console.log(addNhanVien);
            if (addNhanVien.chucVu.maChucVu === 'CV001') {
                role = 'ROLE_QUANLY';
            } else if (addNhanVien.chucVu.maChucVu === 'CV002') {
                role = 'ROLE_PHONGDAOTAO';
            } else {
                role = 'ROLE_GIANGVIEN';
            }
            const nhanVienRegister = { username: addNhanVien.maNhanVien, password: '123456', role: role };

            console.log(nhanVienRegister);
            await register(nhanVienRegister);
            if (addNhanVien && nhanVienRegister) {
                setOpen(false);
                //alert('Thêm thành công');
                reload();
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.success('Thêm thành công!', 'Thông báo');
                return;
            }
        }
    };

    const handleClickSearch = async (value) => {
        const timNhanVien = await timKiemNhanVien(value, accessToken, axiosJWT);
        setListNV(timNhanVien);
    };
    function handleSelectGT(event) {
        setGioiTinh(event.target.value);
    }
    function handleSelectTrangThai(event) {
        setTrangThai(event.target.value);
    }

    function handleSelectKhoa(event) {
        setKhoa(event.target.value);
    }
    function handleSelectChucVu(event) {
        setChucVu(event.target.value);
    }

    const handleClick = () => {
        exportToExcel('data-nv', 'Danh sách nhân viên');
    };
    const handleClickReSet = async () => {
        if (!!selectedNhanVien) {
            if (window.confirm('Bạn chắc chắn muốn reset lại mật khẩu?')) {
                await updatePassword(selectedNhanVien.maNhanVien, '123456', accessToken, axiosJWT);
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
            //alert('Vui lòng chọn nhân viên');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Vui lòng chọn nhân viên!', 'Thông báo');
            return;
        }
    };

    return (
        <div className="h-full mt-5 w-full">
            <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý giảng viên</div>
            <div className=" flex justify-center flex-row items-center m-2">
                <HeaderQL
                    placeholder="Mã, tên nhân viên"
                    onPressSearch={handleClickSearch}
                    onPressAdd={handleClickOpenThem}
                    onPressUpdate={handleClickOpenCapNhat}
                    onChangeSearch={handleClickSearch}
                ></HeaderQL>
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

            <div className="h-3/4 mr-11 ml-10">
                <div>
                    {/* <Button type="primary" onClick={handleClick}>
                        Export Excel
                    </Button> */}
                    <div className="m-2">
                        <div className="">
                            <table className={cx('table-SV')} id="data-nv">
                                <thead className="text-sv-blue-5">
                                    <tr className={cx(' bg-blue-100')}>
                                        <th></th>
                                        <th className={cx('')}>STT</th>
                                        <th className={cx('')}>Mã số nhân viên</th>
                                        <th className={cx('')}>Họ tên</th>
                                        <th className={cx('')}>Giới tính</th>
                                        <th className={cx('')}>Ngày sinh</th>

                                        <th>Khoa</th>
                                        <th>Chức vụ</th>
                                        <th className={cx('')}>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listNV?.map((item, index) => (
                                        <tr
                                            key={item.maNhanVien}
                                            onClick={() => handleSelectNhanVien(item)}
                                            className={`${
                                                selectedNhanVien.maNhanVien === `${item.maNhanVien}`
                                                    ? 'bg-orange-200'
                                                    : ''
                                            } hover:cursor-pointer`}
                                        >
                                            <td>
                                                <input
                                                    type="radio"
                                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    name="radio-group-mon"
                                                    value={item.maNhanVien}
                                                    checked={selectedNhanVien.maNhanVien === `${item.maNhanVien}`}
                                                    onChange={() => handleSelectNhanVien(item)}
                                                />
                                            </td>
                                            <td>{index + 1}</td>
                                            <td>{item.maNhanVien}</td>
                                            <td align="left">{item.tenNhanVien}</td>
                                            <td>{item.gioiTinh ? 'Nam' : 'Nữ'}</td>
                                            <td>{convertDateFormat(item?.ngaySinh)}</td>
                                            <td align="left">{item.khoa?.tenKhoa}</td>
                                            <td align="left">{item.chucVu.tenChucVu}</td>

                                            <td>{item.trangThai}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                <div className="w-full flex justify-between mt-5 border-b-2">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin giảng viên</div>
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
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Mã giảng viên:</label>
                            </div>
                            <input
                                type="text"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Mã giảng viên tự động tạo"
                                disabled
                                value={maNhanVien}
                                onChange={(e) => {
                                    setMaNhanVien(e.target.value);
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
                                    placeholder="Họ và tên"
                                    value={tenNhanVien}
                                    onChange={(e) => {
                                        setTenNhanVien(e.target.value);
                                    }}
                                />
                                {!checkValidTen(tenNhanVien) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Tên sinh viên không được rỗng và không chứa số!!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ảnh:</label>
                            </div>
                            <input
                                type="file"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                accept="image/*"
                                placeholder="Link ảnh"
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
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={gioiTinh}
                                    onChange={handleSelectGT}
                                >
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày sinh:</label>
                            </div>
                            <div className="h-16">
                                <input
                                    type="date"
                                    className="block m-4 mb-0 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic"
                                    placeholder="Số điện thoại"
                                    value={ngaySinh}
                                    onChange={(e) => {
                                        setNgaySinh(e.target.value);
                                    }}
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
                                <label htmlFor="">Chức vụ:</label>
                            </div>
                            <div className="h-16">
                                <select
                                    className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    value={chucVu}
                                    onChange={handleSelectChucVu}
                                >
                                    <option value="">Chức vụ</option>
                                    {listChucVu.map((option) => (
                                        <option key={option.maChucVu} value={option.maChucVu}>
                                            {option.tenChucVu}
                                        </option>
                                    ))}
                                </select>
                                {!checkValidChucVu(chucVu) && (
                                    <span className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}>
                                        Bắt buộc
                                    </span>
                                )}
                            </div>
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
                                <label htmlFor="">Ngày cấp CCCD:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                placeholder="Ngày cấp căn cước công dân"
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
                                placeholder="Nơi cấp"
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
                                placeholder="Nơi sinh"
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
                                placeholder="Đối tượng"
                                value={doiTuong}
                                onChange={(e) => {
                                    setDoiTuong(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào đoàn:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                //placeholder="Mã hồ sơ"
                                value={ngayVaoDoan}
                                onChange={(e) => {
                                    setNgayVaoDoan(e.target.value);
                                }}
                            />
                        </div>

                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Ngày vào Đảng:</label>
                            </div>
                            <input
                                type="date"
                                className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                //placeholder="Mã giảng viên"
                                value={ngayVaoDang}
                                onChange={(e) => {
                                    setNgayVaoDang(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Học vị:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={hocVi}
                                    onChange={(e) => setHocVi(e.target.value)}
                                >
                                    <option value="">Học vị</option>
                                    <option value="Thạc sĩ">Thạc sĩ</option>
                                    <option value="Tiến sĩ">Tiến sĩ</option>
                                    <option value="Phó giáo sư">Phó giáo sư</option>
                                    <option value="Giáo sư">Giáo sư</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-1/3">
                            <div className="w-32 text-left">
                                <label htmlFor="">Trạng thái:</label>
                            </div>
                            <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                <select
                                    className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                    value={trangThai}
                                    onChange={handleSelectTrangThai}
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
                                luuNhanVien();
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
                                onClick={() => xoaTrang()}
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
        </div>
    );
}

export default GiangVien;
