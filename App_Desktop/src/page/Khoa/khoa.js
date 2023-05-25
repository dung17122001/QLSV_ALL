import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { capNhatKhoa, getTatCaKhoa, themKhoa, timKiemKhoa } from '../../services/khoaService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { Alert, AlertTitle } from '@mui/material';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import HeaderQL from '../../components/HeaderQL';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TiCancel } from 'react-icons/ti';
import classNames from 'classnames/bind';
import style from './Khoa.module.scss';
import { exportToExcel } from './exportToExcel';
import { getKhoaTheoTen } from '../../services/khoaService';
import { checkRong } from '../../regex/regex';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

function Khoa() {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const cx = classNames.bind(style);

    const [listKhoa, setListKhoa] = useState();
    const [valueSearch, setValueSearch] = useState('');
    const [selectedKhoa, setSelectedKhoa] = useState('');
    const [maKhoa, setMaKhoa] = useState('');
    const [tenKhoa, setTenKhoa] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [listKhoaByTen, setListKhoaByTen] = useState();

    let khoa = {
        maKhoa,
        tenKhoa,
        trangThai,
    };
    const reload = async () => {
        let getallKhoa = await getTatCaKhoa(accessToken, axiosJWT, dispatch);

        setListKhoa(getallKhoa);
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

    const ToolbarTable = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport fileName="Danh sách môn học" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };
    const [open, setOpen] = useState(false);
    function handleSelectTrangThai(event) {
        setTrangThai(event.target.value);
    }
    const handleClickOpenCapNhat = () => {
        if (!!selectedKhoa) {
            setMaKhoa(selectedKhoa.maKhoa);
            setTenKhoa(selectedKhoa.tenKhoa);
            setTrangThai(selectedKhoa.trangThai);
            setOpen(true);
        } else {
            //alert('Vui lòng chọn khoa');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Vui lòng chọn khoa!', 'Thông báo');
            return;
        }
    };
    const xoaTrang = () => {
        setTenKhoa('');
        setTrangThai('Bình thường');
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClick = () => {
        exportToExcel('data-khoa', 'Danh sách khoa');
    };
    const handleSelectKhoa = (item) => {
        setSelectedKhoa(item);
    };
    const handleClickOpenThem = () => {
        setMaKhoa('');
        setSelectedKhoa('');
        xoaTrang();
        setOpen(true);
    };
    const handleClickSearch = async (value) => {
        const timKhoa = await timKiemKhoa(value, accessToken, axiosJWT);
        setListKhoa(timKhoa);
    };
    useEffect(() => {
        const getKhoa = async () => {
            var getKhoaByTen = await getKhoaTheoTen(tenKhoa, accessToken, axiosJWT);
            setListKhoaByTen(getKhoaByTen);
        };

        getKhoa();
    }, [tenKhoa]);
    console.log(listKhoaByTen);
    function checkTrungTen(tenKhoa) {
        if (tenKhoa === selectedKhoa?.tenKhoa) {
            return true;
        } else if (checkRong(tenKhoa) && listKhoaByTen?.length === 0) {
            return true;
        }
        return false;
    }

    const luuKhoa = async () => {
        if (checkTrungTen(tenKhoa)) {
            if (!!selectedKhoa) {
                khoa.maKhoa = selectedKhoa.maKhoa;

                let suaKhoa = await capNhatKhoa(khoa, accessToken, axiosJWT);

                if (suaKhoa) {
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
                let addKhoa = await themKhoa(khoa, accessToken, axiosJWT);

                if (addKhoa) {
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
        } else {
            //alert('Dữ liệu nhập vào chưa phù hơp!!');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Dữ liệu nhập vào chưa phù hợp!', 'Thông báo');
            return;
        }
    };
    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý khoa</div>
                <HeaderQL
                    placeholder="Mã, tên khoa"
                    onPressSearch={handleClickSearch}
                    onPressAdd={handleClickOpenThem}
                    onPressUpdate={handleClickOpenCapNhat}
                ></HeaderQL>
                <div className="h-3/4 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleClick}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-Khoa')} id="data-khoa">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th className={cx('')}>STT</th>
                                            <th className={cx('')}>Mã số khoa</th>
                                            <th className={cx('')}>Tên khoa</th>
                                            <th className={cx('')}>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listKhoa?.map((item, index) => (
                                            <tr
                                                key={item.maKhoa}
                                                onClick={() => handleSelectKhoa(item)}
                                                className={`${
                                                    selectedKhoa.maKhoa === `${item.maKhoa}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item.maKhoa}
                                                        checked={selectedKhoa.maKhoa === `${item.maKhoa}`}
                                                        onChange={() => handleSelectKhoa(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maKhoa}</td>
                                                <td align="left">{item.tenKhoa}</td>

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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin khoa</div>
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
                                    <label htmlFor="">Mã khoa:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã khoa tự động tạo"
                                    disabled
                                    value={maKhoa}
                                    onChange={(e) => {
                                        setMaKhoa(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên khoa:</label>
                                </div>
                                <div className="h-16">
                                    <input
                                        type="text"
                                        className="block m-4 mb-0 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                        placeholder="Tên khoa"
                                        value={tenKhoa}
                                        onChange={(e) => {
                                            setTenKhoa(e.target.value);
                                        }}
                                    />
                                    {!checkTrungTen(tenKhoa) && (
                                        <span
                                            className={cx('flex justify-start items-center text-red-500 text-xs mt-0')}
                                        >
                                            Tên khoa rỗng hoặc đã tồn tại
                                        </span>
                                    )}
                                </div>
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

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={() => {
                                    luuKhoa();
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

export default Khoa;
