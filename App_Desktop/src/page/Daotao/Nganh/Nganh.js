import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { TiCancel } from 'react-icons/ti';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import style from './NganhHoc.module.scss';
import classNames from 'classnames/bind';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { exportToExcel } from '~/function/exportToExcel';
import HeaderQL from '../../../components/HeaderQL';
import { getTatCaNganh, capNhatNganh, themNganh } from '~/services/nganhService';
import { getTatCaKhoa } from '~/services/khoaService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

const cx = classNames.bind(style);

function Nganh() {
    const [open, setOpen] = useState(false);
    const [danhSachNganh, setDanhSachNganh] = useState();
    const [danhSachKhoa, setDanhSachKhoa] = useState();

    const [selectedNganh, setSelectedNganh] = useState('');
    const [maNganh, setMaNganh] = useState();
    const [tenNganh, setTenNganh] = useState();
    //const [tongTinChi, setTongTinChi] = useState();
    const [trangThai, setTrangThai] = useState();
    const [khoa, setKhoa] = useState('Khoa');
    const [listNganh, setListNganh] = useState();
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    useEffect(() => {
        const getALLNganh = async () => {
            const dsNganh = await getTatCaNganh(accessToken, axiosJWT);
            setDanhSachNganh(dsNganh);
        };
        const getALLKhoa = async () => {
            const dsKhoa = await getTatCaKhoa(accessToken, axiosJWT);
            setDanhSachKhoa(dsKhoa);
        };

        getALLNganh();
        getALLKhoa();
    }, []);

    const handleSelectNganh = (item) => {
        setSelectedNganh(item);
    };

    const handleClickOpen = () => {
        xoaTrang();
        setSelectedNganh();
        setMaNganh('');
        setOpen(true);
    };
    const handleClickOpenUpdate = () => {
        if (!selectedNganh) {
            // alert('Vui lòng chọn ngành cần sửa');
            // return;
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn lịch ngành sửa!', 'Thông báo');
            return;
        } else {
            setTenNganh(selectedNganh.tenNganh);
            setKhoa(selectedNganh.khoa.maKhoa);
            //setTongTinChi(selectedNganh.tongTinChi);
            setTrangThai(selectedNganh.setTrangThai);
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const reload = async () => {
        let getNganh = await getTatCaNganh(accessToken, axiosJWT);
        setDanhSachNganh(getNganh);
    };
    const handleExportExcel = () => {
        exportToExcel('data-nganh', 'Danh sách ngành học');
    };
    const handleKhoa = (e) => {
        setKhoa(e.target.value);
    };
    const nganh = {
        maNganh,
        tenNganh,
        khoa,
        //tongTinChi,
        trangThai,
    };
    const xoaTrang = () => {
        setTenNganh('');
        //setTongTinChi('');
        setTrangThai('Bình thường');
        setKhoa('Khoa');
    };
    const handleClickThem = () => {
        setMaNganh('');
        setSelectedNganh('');
        setKhoa('Khoa');
        xoaTrang();
        setOpen(true);
    };
    const handleClickOpenCapNhat = () => {
        if (!!selectedNganh) {
            setMaNganh(selectedNganh.maNganh);
            setTenNganh(selectedNganh.tenNganh);
            //setTongTinChi(selectedNganh.tongTinChi);
            setKhoa(selectedNganh.khoa.maKhoa);
            setTrangThai(selectedNganh.trangThai);
            setOpen(true);
        } else {
            //alert('Vui lòng chọn ngành');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Vui lòng chọn ngành!', 'Thông báo');
            return;
        }
    };
    const handleAddNganh = async () => {
        if (!!selectedNganh) {
            nganh.maNganh = selectedNganh.maNganh;
            //console.log(nganh);
            let suaNganh = await capNhatNganh(nganh, accessToken, axiosJWT);
            if (suaNganh) {
                setOpen(false);
                //alert('Cập nhật thành công!!');
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
            } else {
                //alert('Cập nhật không thành công');
                setOpen(false);
                toastr.options = {
                    positionClass: 'toast-top-center',
                    closeButton: true,
                    timeOut: 5000,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                };
                toastr.warning('Cập nhật không thành công!', 'Thông báo');
                return;
            }
        } else {
            let addNganh = await themNganh(nganh, accessToken, axiosJWT);
            if (addNganh) {
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
    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý ngành học</div>
                <HeaderQL
                    placeholder="Mã, tên ngành"
                    onPressSearch={(value) => console.log(value)}
                    onPressAdd={handleClickThem}
                    onPressUpdate={handleClickOpenCapNhat}
                ></HeaderQL>

                <div style={{}} className="h-3/4 mt-2 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="overflow-y-auto max-h-[480px] ">
                                <table className={cx('table-nganh')} id="data-nganh">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã ngành</th>
                                            <th>Tên ngành</th>
                                            {/* <th>Tổng tín chỉ</th> */}
                                            <th>Khoa</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {danhSachNganh?.map((item, index) => (
                                            <tr
                                                key={item?.maNganh}
                                                onClick={() => handleSelectNganh(item)}
                                                className={`${
                                                    selectedNganh.maNganh === `${item?.maNganh}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item?.maNganh}
                                                        checked={selectedNganh.maNganh === `${item?.maNganh}`}
                                                        onChange={() => handleSelectNganh(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item?.maNganh}</td>
                                                <td>{item?.tenNganh}</td>
                                                {/* <td>{item?.tongTinChi}</td> */}
                                                <td>{item?.khoa?.tenKhoa}</td>
                                                <td>{item?.trangThai}</td>
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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin ngành học</div>
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
                                    <label htmlFor="">Mã ngành:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã ngành học"
                                    disabled="true"
                                    value={maNganh}
                                    onChange={(e) => {
                                        setMaNganh(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên ngành:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên ngành học"
                                    value={tenNganh}
                                    onChange={(e) => {
                                        setTenNganh(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Khoa:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={khoa}
                                        onChange={(e) => handleKhoa(e)}
                                    >
                                        <option value="Khoa">Khoa</option>
                                        {danhSachKhoa?.map((item, index) => (
                                            <option key={item?.maKhoa} value={item?.maKhoa}>
                                                {item?.tenKhoa}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                {/* <div className="w-32 text-left">
                                    <label htmlFor="">Tổng tín chỉ:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tổng tín chỉ   "
                                    value={tongTinChi}
                                    onChange={(e) => {
                                        setTongTinChi(e.target.value);
                                    }}
                                /> */}
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
                            <div className="w-1/3"></div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={() => {
                                    handleAddNganh();
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

export default Nganh;
