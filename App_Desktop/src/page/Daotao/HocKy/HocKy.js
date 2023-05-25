import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HeaderQL from '../../../components/HeaderQL';
import { exportToExcel } from '../../../function/exportToExcel';
import classNames from 'classnames/bind';
import style from './HocKy.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTatCaHocKy, capNhatHocKy, themHocKy, timKiemHocKy } from '../../../services/hocKyService';

import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { TiCancel } from 'react-icons/ti';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import Box from '@mui/material/Box';
import { getHocKyTheoTen } from '../../../services/hocKyService';
import { checkRong } from '../../../regex/regex';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
function HocKy() {
    const [listHocKyByTen, setListHocKyByTen] = useState('');
    const [listHK, setListHK] = useState();
    const [selectedHocKy, setSelectedHocKy] = useState('');
    const [maHocKy, setMaHocKy] = useState('');
    const [tenHocKy, setTenHocKy] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [thoiGianBD, setThoiGianBD] = useState('');
    const [thoiGianKT, setThoiGianKT] = useState('');
    const handleClickOpenAdd = () => {
        setMaHocKy('');
        setSelectedHocKy('');
        xoaTrang();
        setOpen(true);
    };
    const handleClickOpenUpdate = () => {
        if (!!selectedHocKy) {
            setMaHocKy(selectedHocKy.maHocKy);
            setTenHocKy(selectedHocKy.tenHocKy);
            setTrangThai(selectedHocKy.trangThai);
            setThoiGianBD(selectedHocKy.thoiGianBD);
            setThoiGianKT(selectedHocKy.thoiGianKT);
            setOpen(true);
        } else {
            // alert('Vui lòng chọn 1 học kỳ');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn học kỳ cần sửa!', 'Thông báo');
        }
    };
    const xoaTrang = () => {
        setTenHocKy('');
        setTrangThai('Bình thường');
    };
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    let hocKy = {
        maHocKy,
        tenHocKy,
        thoiGianBD,
        thoiGianKT,
        trangThai,
    };
    const handleClick = () => {
        exportToExcel('data-hk', 'Danh sách học kỳ');
    };
    const handleSelectHocKy = (item) => {
        setSelectedHocKy(item);
    };
    function handleSelectTrangThai(event) {
        setTrangThai(event.target.value);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickSearch = async (value) => {
        const timHK = await timKiemHocKy(value, accessToken, axiosJWT);
        setListHK(timHK);
    };
    const reload = async () => {
        let getALLHocKy = await getTatCaHocKy(accessToken, axiosJWT, dispatch);

        setListHK(getALLHocKy);
    };
    useEffect(() => {
        const getALLHocKy = async () => {
            const getTatCaHK = await getTatCaHocKy(accessToken, axiosJWT, dispatch);

            setListHK(getTatCaHK);
        };
        getALLHocKy();
    }, []);

    useEffect(() => {
        const getHocKy = async () => {
            var getHocKyByTen = await getHocKyTheoTen(tenHocKy, accessToken, axiosJWT);
            setListHocKyByTen(getHocKyByTen);
        };

        getHocKy();
    }, [tenHocKy]);

    function checkTrungTen(tenHocKy) {
        if (tenHocKy === selectedHocKy?.tenHocKy) {
            return true;
        } else if (checkRong(tenHocKy) && listHocKyByTen?.length === 0) {
            return true;
        }
        return false;
    }
    function checkNgayBatDau(thoiGianBD) {
        if (thoiGianBD === selectedHocKy?.thoiGianBD) {
            return true;
        } else if (checkRong(thoiGianBD)) {
            return true;
        }
        return false;
    }
    function checkNgayKetThuc(thoiGianKT) {
        if (thoiGianKT === selectedHocKy?.thoiGianKT) {
            return true;
        } else if (checkRong(thoiGianKT) && thoiGianKT > thoiGianBD) {
            return true;
        }
        return false;
    }

    const luuHocKy = async () => {
        if (checkTrungTen(tenHocKy)) {
            if (!!selectedHocKy) {
                hocKy.maHocKy = selectedHocKy.maHocKy;

                let suaHocKy = await capNhatHocKy(hocKy, accessToken, axiosJWT);

                if (suaHocKy) {
                    setOpen(false);
                    //alert('Cập nhật thành công');
                    toastr.options = {
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        timeOut: 5000,
                        extendedTimeOut: 0,
                        tapToDismiss: false,
                    };
                    toastr.success('Cập nhật thành công!', 'Thông báo');
                    reload();
                }
            } else {
                let addHocKy = await themHocKy(hocKy, accessToken, axiosJWT);

                if (addHocKy) {
                    setOpen(false);
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
                }
            }
        } else {
            //alert('Dữ liệu không phù hợp !!');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Dữ liệu không hợp lệ!', 'Thông báo');
        }
    };
    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý học kỳ</div>
                <HeaderQL
                    placeholder="Mã, tên học kỳ"
                    onPressSearch={handleClickSearch}
                    onPressAdd={handleClickOpenAdd}
                    onPressUpdate={handleClickOpenUpdate}
                ></HeaderQL>

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
                                            <th className={cx('')}>Mã số học kỳ</th>
                                            <th className={cx('')}>Tên học kỳ</th>

                                            <th className={cx('')}>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listHK?.map((item, index) => (
                                            <tr
                                                key={item?.maHocKy}
                                                onClick={() => handleSelectHocKy(item)}
                                                className={`${
                                                    selectedHocKy.maHocKy === `${item.maHocKy}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item.maHocKy}
                                                        checked={selectedHocKy.maHocKy === `${item.maHocKy}`}
                                                        onChange={() => handleSelectHocKy(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maHocKy}</td>
                                                <td align="left">{item.tenHocKy}</td>

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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin học kỳ</div>
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
                                    <label htmlFor="">Mã học Kỳ:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã học kỳ tự động tạo"
                                    disabled
                                    value={maHocKy}
                                    onChange={(e) => {
                                        setMaHocKy(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên học kỳ:</label>
                                </div>
                                <div className="h-16">
                                    <input
                                        type="text"
                                        className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                        placeholder="Tên học kỳ"
                                        value={tenHocKy}
                                        onChange={(e) => {
                                            setTenHocKy(e.target.value);
                                        }}
                                    />
                                    {!checkTrungTen(tenHocKy) && (
                                        <span
                                            className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}
                                        >
                                            Tên học kỳ rỗng hoặc đã tồn tại
                                        </span>
                                    )}
                                </div>
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
                                        <option value="Bình thường">Bình thường</option>
                                        <option value="Tạm ngưng">Tạm ngưng</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Thời gian bắt đầu:</label>
                                </div>
                                <div className="h-16">
                                    <input
                                        type="date"
                                        className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                        placeholder=""
                                        value={thoiGianBD}
                                        onChange={(e) => {
                                            setThoiGianBD(e.target.value);
                                        }}
                                    />
                                    {!checkNgayBatDau(thoiGianBD) && (
                                        <span
                                            className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}
                                        >
                                            Bắt buộc
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Thời gian kết thúc:</label>
                                </div>
                                <div className="h-16">
                                    <input
                                        type="date"
                                        className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                        placeholder="Thời gian kết thúc"
                                        value={thoiGianKT}
                                        onChange={(e) => {
                                            setThoiGianKT(e.target.value);
                                        }}
                                    />
                                    {!checkNgayKetThuc(thoiGianKT) && (
                                        <span
                                            className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}
                                        >
                                            Bắt buộc & Sau ngày bắt đầu
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="w-1/3"></div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={() => {
                                    luuHocKy();
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
            </div>
        </>
    );
}

export default HocKy;
