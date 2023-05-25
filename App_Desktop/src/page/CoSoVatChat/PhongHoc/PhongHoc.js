import React, { useState, useEffect } from 'react';
import HeaderQL from '../../../components/HeaderQL/HeaderQL';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { TiCancel } from 'react-icons/ti';
import { getTatCaDayNha, themDayNha, capNhatDayNha, timKiemDayNha } from '../../../services/dayNhaService';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Button, Link } from '@mui/material';
import { exportToExcel } from '~/function/exportToExcel';
import classNames from 'classnames/bind';
import style from './PhongHoc.module.scss';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { getTatCaPhongHoc, getTatLoaiPhong, addPhongHoc, updatePhongHoc } from '~/services/phongService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
const cx = classNames.bind(style);

function PhongHoc() {
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);

    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listDN, setListDN] = useState();
    const [listPhong, setListPhong] = useState();
    const [listloaiPhong, setListLoaiPhong] = useState();
    const [selectedPhong, setSelectPhong] = useState('');
    const [maPhong, setMaPhong] = useState();
    const [tenPhong, setTenPhong] = useState();
    const [loaiPhong, setLoaiPhong] = useState('');
    const [dayNha, setDayNha] = useState('');
    const [soGhe, setSoGhe] = useState(60);
    const [trangThai, setTrangThai] = useState('Bình thường');

    const handleClickOpen = () => {
        setOpen(true);
        setSelectPhong('');
        handleXoaRong();
    };
    const handleClickUpdatePhong = () => {
        if (!selectedPhong && selectedPhong.maPhong !== '') {
            //alert('Vui lòng chọn phòng cần cập nhật thông tin');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Vui lòng chọn phòng cần sửa!', 'Thông báo');
        } else {
            //console.log(selectedPhong);
            setOpen(true);
            setMaPhong(selectedPhong.maPhong);
            setTenPhong(selectedPhong.tenPhong);
            setSoGhe(selectedPhong.soGhe);
            setDayNha(selectedPhong.dayNha?.maDayNha);
            setLoaiPhong(selectedPhong.loaiPhong?.maLoaiPhong);
            setTrangThai(selectedPhong.trangThai);
        }
    };
    const handleXoaRong = () => {
        setMaPhong('');
        setTenPhong('');
        setSoGhe('');
        setDayNha('');
        setLoaiPhong('');
        setTrangThai('Bình thường');
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddPhong = async () => {
        let phong = {
            maPhong: maPhong,
            tenPhong: tenPhong,
            soGhe: soGhe,
            loaiPhong: loaiPhong,
            dayNha: dayNha,
            trangThai: trangThai,
        };

        //console.log(phong);
        if (!selectedPhong && selectedPhong.maPhong !== '') {
            let checkTenPhong = listPhong.find((e) => e.tenPhong === phong.tenPhong);
            if (!!checkTenPhong) {
                //alert('Tên phòng bị trùng');
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.warning('Tên phòng học bị trùng!', 'Thông báo');
                return;
            }
            let result = await addPhongHoc(phong, accessToken, axiosJWT);
            setReload(!reload);
            handleClose();
            if (!!result) {
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.success('Đã thêm phòng học!', 'Thông báo');
            } //alert('Đã thêm phòng học');
        } else {
            let result = await updatePhongHoc(phong, accessToken, axiosJWT);
            setReload(!reload);
            handleClose();
            if (!!result) {
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.success('Đã cập nhật thông tin phòng học!', 'Thông báo');
            } //alert('Đã cập nhật thông tin phòng học');
        }
    };

    useEffect(() => {
        const getALLDayNha = async () => {
            try {
                let getDayNha = await getTatCaDayNha(accessToken, axiosJWT, dispatch);
                setListDN(getDayNha);
            } catch (error) {
                console.log(error);
            }
        };
        const getAllPhong = async () => {
            try {
                let result = await getTatCaPhongHoc(accessToken, axiosJWT, dispatch);
                setListPhong(result);
            } catch (error) {
                console.log(error);
            }
        };
        const getAllLoaiPhong = async () => {
            try {
                let result = await getTatLoaiPhong(accessToken, axiosJWT, dispatch);
                setListLoaiPhong(result);
            } catch (error) {
                console.log(error);
            }
        };
        getALLDayNha();
        getAllPhong();
        getAllLoaiPhong();
    }, [reload]);
    //console.log(listPhong);
    return (
        <>
            <div className="h-full mt-5 w-full">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4 mb-3">Quản lý phòng học</div>
                <HeaderQL
                    placeholder="Mã, tên phòng học"
                    onPressSearch={(value) => console.log(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickUpdatePhong}
                ></HeaderQL>
                <div style={{}} className="h-3/4 mr-5 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-DN')} id="data">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã phòng</th>
                                            <th>Tên phòng</th>
                                            <th>Số ghế</th>
                                            <th>Dãy nhà</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listPhong?.map((item, index) => (
                                            <tr
                                                key={item.maPhong}
                                                onClick={() => setSelectPhong(item)}
                                                className={`${
                                                    selectedPhong.maPhong === `${item.maPhong}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <div className="flex items-center justify-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                            name="radio-group-phong"
                                                            value={item.maPhong}
                                                            checked={selectedPhong.maPhong === `${item.maPhong}`}
                                                            onChange={() => setSelectPhong(item)}
                                                        />
                                                    </div>
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item?.maPhong}</td>
                                                <td>{item.tenPhong}</td>
                                                <td>{item.soGhe}</td>
                                                <td>{item.dayNha.tenDayNha}</td>
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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin phòng học</div>
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
                                    <label htmlFor="">Mã phòng học:</label>
                                </div>
                                <input
                                    type="text"
                                    disabled
                                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã phòng tự động tạo"
                                    value={maPhong}
                                    // onChange={(e) => {
                                    //     setValueTenGV(e.target.value);
                                    // }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên phòng học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên phòng học"
                                    autoFocus
                                    value={tenPhong}
                                    onChange={(e) => {
                                        setTenPhong(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số ghế:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    value={soGhe}
                                    onChange={(e) => {
                                        setSoGhe(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between mt-4">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Dãy nhà:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 ">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={dayNha}
                                        onChange={(e) => setDayNha(e.target.value)}
                                    >
                                        <option value="">Dãy nhà</option>
                                        {listDN?.map((item, index) => (
                                            <option key={item.maDayNha} value={item.maDayNha}>
                                                {item.tenDayNha}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Loại phòng:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={loaiPhong}
                                        onChange={(e) => setLoaiPhong(e.target.value)}
                                    >
                                        <option value="">Loại phòng</option>
                                        {listloaiPhong?.map((item, index) => (
                                            <option key={item.maLoaiPhong} value={item.maLoaiPhong}>
                                                {item.tenLoaiPhong}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={trangThai}
                                        onChange={(e) => setTrangThai(e.target.value)}
                                    >
                                        <option value="Bình thường">Bình thường</option>
                                        <option value="Tạm khóa">Tạm khóa</option>
                                        <option value="Đang sửa chữa">Đang sửa chữa</option>
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
                                onClick={handleAddPhong}
                            >
                                Lưu
                            </Button>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<BsFillEraserFill />}
                                    color="success"
                                    onClick={handleXoaRong}
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
                                    onClick={handleClose}
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

export default PhongHoc;
