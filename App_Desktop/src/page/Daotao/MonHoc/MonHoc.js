import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { TiCancel } from 'react-icons/ti';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiFillSave } from 'react-icons/ai';
import { BsFillEraserFill } from 'react-icons/bs';
import { exportToExcel } from '~/function/exportToExcel';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import {
    getTatCaMonHoc,
    addMonHoc,
    getTatCaLoaiMonHoc,
    capNhatMonHoc,
    getMonHocByTextSearch,
} from '~/services/monHocService';
import { getTatCaKhoa } from '~/services/khoaService';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import { height } from '@mui/system';
import HeaderQL from '../../../components/HeaderQL';
import style from './MonHoc.module.scss';
import { Scrollbar } from 'react-scrollbars-custom';
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
const cx = classNames.bind(style);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuPropsMonHoc = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function MonHoc({ onPressSearch, onPressAdd, onPressUpdate, onPressDelete, placeholder }) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const [open, setOpen] = useState(false);
    const [listCheckedHocTruoc, setListCheckedHocTruoc] = useState([]);
    const [listCheckedTienQuyet, setListCheckedTienQuyet] = useState([]);
    const [listCheckedSongSong, setListCheckedSongSong] = useState([]);
    const [listHocTruoc, setListHocTruoc] = useState([]);
    const [listTienQuyet, setListTienQuyet] = useState([]);
    const [listSongHanh, setListSongHanh] = useState([]);
    const [selectedMon, setSelectedMon] = useState('');
    const [listMonHoc, setListMonHoc] = useState();
    const [listMonHocTruoc, setListMonHocTruoc] = useState();
    const [listMonHocTienQuyet, setListMonHocTienQuyet] = useState();
    const [listMonHocSongHanh, setListMonHocSongHanh] = useState();
    const [maMonHoc, setMaMonHoc] = useState('');
    const [tenMonHoc, setTenMonHoc] = useState();
    const [selectTrangThai, setSelectTrangThai] = useState('Bình thường');
    const [soTCLT, setSoTCLT] = useState();
    const [soTCTH, setSoTCTH] = useState();
    const [valueSearchMH, setValueSearchMH] = useState('');

    const [reload, setReload] = useState(false);

    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const getAllCheckedHocTruoc = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const temp = [...listMonHocTruoc];
        if (temp[index].maMonHoc === item.maMonHoc) {
            temp[index].isCheckedHocTruoc = !item.isCheckedHocTruoc;
        }
        //console.log(item);
        if (item.isCheckedHocTruoc) setListCheckedHocTruoc((prev) => [...prev, item.maMonHoc]);
        else {
            var arrRemove = listCheckedHocTruoc?.filter((e) => e !== item.maMonHoc);
            setListCheckedHocTruoc(arrRemove);
        }
        setListMonHocTruoc(temp);
    };

    const getAllCheckedTienQuyet = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const temp = [...listMonHocTienQuyet];
        if (temp[index].maMonHoc === item.maMonHoc) {
            temp[index].isCheckedTienQuyet = !item.isCheckedTienQuyet;
        }
        //console.log(item);
        if (item.isCheckedTienQuyet) setListCheckedTienQuyet((prev) => [...prev, item.maMonHoc]);
        else {
            var arrRemove = listCheckedTienQuyet.filter((e) => e !== item.maMonHoc);
            setListCheckedTienQuyet(arrRemove);
        }
        setListMonHocTienQuyet(temp);
    };

    const getAllCheckedSongHanh = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const temp = [...listMonHocSongHanh];
        if (temp[index].maMonHoc === item.maMonHoc) {
            temp[index].isCheckedHocSongHanh = !item.isCheckedHocSongHanh;
        }
        //console.log(item);
        if (item.isCheckedHocSongHanh) setListCheckedSongSong((prev) => [...prev, item.maMonHoc]);
        else {
            var arrRemove = listCheckedSongSong?.filter((e) => e !== item.maMonHoc);
            setListCheckedSongSong(arrRemove);
        }
        setListMonHocSongHanh(temp);
    };

    const handleSelectMonHoc = (item) => {
        setSelectedMon(item);
    };

    const handleExportExcel = () => {
        exportToExcel('data-sv', 'Danh sách môn học');
    };

    const handleClickOpen = () => {
        handleXoaRong();
        setMaMonHoc('');
        setOpen(true);
    };

    const handleClickOpenUpdate = () => {
        //console.log(selectedMon);
        if (!selectedMon) {
            // alert('Chọn môn học cần sửa');
            // return;
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn môn học cần sửa!', 'Thông báo');
            return;
        }
        if (!!selectedMon) {
            setMaMonHoc(selectedMon.maMonHoc);
            setTenMonHoc(selectedMon.tenMonHoc);
            setSoTCLT(selectedMon.soTCLT);
            setSoTCTH(selectedMon.soTCTH);
            setSelectTrangThai(selectedMon.trangThai);

            //setListHocTruoc(selectedMon.danhSachMonHocHocTruoc.danhSachMonHocHocTruoc[0]);
        }
        setListCheckedHocTruoc([]);
        setListCheckedSongSong([]);
        setListCheckedTienQuyet([]);
        setReload(!reload);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleXoaRong = () => {
        setSelectedMon('');
        setTenMonHoc('');
        setSoTCLT('');
        setSoTCTH('');
        setListCheckedHocTruoc([]);
        setListCheckedSongSong([]);
        setListCheckedTienQuyet([]);
        setReload(!reload);
        //setSelectTrangThai('');
    };

    const handleAddMonHocTruoc = (e) => {
        setListHocTruoc(e.target.value);
    };
    const handleAddMonHocTienQuyet = (e) => {
        setListTienQuyet(e.target.value);
    };

    const handleAddMonHocSongHanh = (e) => {
        setListSongHanh(e.target.value);
    };

    function handleSelectTrangThai(e) {
        setSelectTrangThai(e.target.value);
    }

    useEffect(() => {
        const getALLMonHoc = async () => {
            const getTatCaMH = await getTatCaMonHoc(accessToken, axiosJWT);
            getTatCaMH.isCheckedHocTruoc = false;
            getTatCaMH.isCheckedTienQuyet = false;
            getTatCaMH.isCheckedHocSongHanh = false;
            setListMonHoc(getTatCaMH);
            setListMonHocTruoc(getTatCaMH);
            setListMonHocTienQuyet(getTatCaMH);
            setListMonHocSongHanh(getTatCaMH);
        };

        getALLMonHoc();
    }, [reload]);

    const handleAddMonHoc = async () => {
        var monHoc = {
            maMonHoc: maMonHoc,
            tenMonHoc: tenMonHoc,
            soTCLT: soTCLT,
            soTCTH: soTCTH,
            trangThai: selectTrangThai,
            danhSachMonHocTienQuyet: listCheckedTienQuyet,
            danhSachMonHocHocTruoc: listCheckedHocTruoc,
            danhSachMonHocSongHanh: listCheckedSongSong,
        };

        if (!!selectedMon.maMonHoc) {
            const result = await capNhatMonHoc(monHoc, accessToken, axiosJWT);
            //alert('Cập nhật môn học thành công');
            handleClose();
            setReload(!reload);
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Cập nhật môn học thành công!', 'Thông báo');
            return;
        } else {
            const result = await addMonHoc(monHoc, accessToken, axiosJWT);
            //alert('Lưu môn học thành công');
            handleClose();
            setReload(!reload);
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Lưu môn học thành công!', 'Thông báo');
            return;
        }
    };

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

    const handleTimKiemMH = async (value) => {
        const getTatCaMH = await getMonHocByTextSearch(value, accessToken, axiosJWT);
        //getTatCaMH.isChecked = false;
        setListMonHoc(getTatCaMH);
    };

    return (
        <>
            <div className="w-full h-screen mt-3">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý môn học</div>
                <HeaderQL
                    placeholder="Mã, tên môn học"
                    onPressSearch={(value) => handleTimKiemMH(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpenUpdate}
                ></HeaderQL>

                <div style={{}} className="h-3/4 mt-2 mr-11 ml-10">
                    <div>
                        {/* <Button type="primary" onClick={handleExportExcel}>
                            Export Excel
                        </Button> */}
                        <div className="m-2">
                            <div className="overflow-y-auto max-h-[480px] ">
                                <table className={cx('table-SV')} id="data-sv">
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Mã môn học</th>
                                            <th>Tên môn học</th>
                                            <th>Số TCLT</th>
                                            <th>Số TCTH</th>
                                            <th>Điều kiện</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listMonHoc?.map((item, index) => (
                                            <tr
                                                key={item?.maMonHoc}
                                                onClick={() => handleSelectMonHoc(item)}
                                                className={`${
                                                    selectedMon.maMonHoc === `${item.maMonHoc}` ? 'bg-orange-200' : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item.maMonHoc}
                                                        checked={selectedMon.maMonHoc === `${item.maMonHoc}`}
                                                        onChange={() => handleSelectMonHoc(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maMonHoc}</td>
                                                <td align="left">{item.tenMonHoc}</td>
                                                <td>{item.soTCLT}</td>
                                                <td>{item.soTCTH}</td>
                                                <td>{renderDanhSachDieuKien(item)}</td>
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
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin môn học</div>
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
                                    <label htmlFor="">Mã môn học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã môn học"
                                    value={maMonHoc}
                                    disabled="true"
                                    onChange={(e) => {
                                        setMaMonHoc(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên môn học:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên môn học"
                                    value={tenMonHoc}
                                    onChange={(e) => {
                                        setTenMonHoc(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số tín chỉ LT:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số tín chỉ lý thuyết"
                                    value={soTCLT}
                                    onChange={(e) => {
                                        setSoTCLT(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Số tín chỉ TH:</label>
                                </div>
                                <input
                                    type="number"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Số tín chỉ thực hành"
                                    value={soTCTH}
                                    onChange={(e) => {
                                        setSoTCTH(e.target.value);
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
                                        value={selectTrangThai}
                                        onChange={(e) => handleSelectTrangThai(e)}
                                    >
                                        <option value="Bình thường">Bình thường</option>
                                        <option value="Tạm khóa">Tạm khóa</option>
                                        <option value="Đã khóa">Đã khóa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học trước:</label>
                                </div>

                                <FormControl size="small" color="blue" sx={{ mb: 2, width: 250 }}>
                                    <InputLabel id="select-hoc-truoc">Môn học trước</InputLabel>

                                    <Select
                                        labelId="select-hoc-truoc"
                                        multiple
                                        value={listCheckedHocTruoc}
                                        onChange={(e) => handleAddMonHocTruoc(e)}
                                        input={<OutlinedInput label="Môn học trước" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuPropsMonHoc}
                                    >
                                        {listMonHocTruoc?.map((item, index) => (
                                            <MenuItem
                                                key={item.maMonHoc}
                                                value={item.tenMonHoc}
                                                onClick={() => getAllCheckedHocTruoc(item, index)}
                                            >
                                                {/* <Checkbox checked={listMonHoc.indexOf(item) > -1} /> */}
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-green-500 cursor-pointer mr-2"
                                                    checked={item.isCheckedHocTruoc}
                                                    //onChange={() => getAllChecked(item, index)}
                                                />
                                                <ListItemText primary={item.tenMonHoc} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học tiên quyết:</label>
                                </div>
                                <FormControl size="small" color="blue" sx={{ mb: 2, width: 250 }}>
                                    <InputLabel id="select-tien-quyet">Môn học tiên quyết</InputLabel>

                                    <Select
                                        labelId="select-tien-quyet"
                                        multiple
                                        value={listCheckedTienQuyet}
                                        onChange={(e) => handleAddMonHocTienQuyet(e)}
                                        input={<OutlinedInput label="Môn học tiên quyết" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuPropsMonHoc}
                                    >
                                        {listMonHocTienQuyet?.map((item, index) => (
                                            <MenuItem
                                                key={item.maMonHoc}
                                                value={item.tenMonHoc}
                                                onClick={() => getAllCheckedTienQuyet(item, index)}
                                            >
                                                {/* <Checkbox checked={listMonHoc.indexOf(item) > -1} /> */}
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-green-500 cursor-pointer mr-2"
                                                    checked={item.isCheckedTienQuyet}
                                                    //onChange={() => getAllChecked(item, index)}
                                                />
                                                <ListItemText primary={item.tenMonHoc} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Môn học song hành:</label>
                                </div>
                                <FormControl size="small" color="blue" sx={{ mb: 2, width: 250 }}>
                                    <InputLabel id="select-song-hanh">Môn học song hành</InputLabel>

                                    <Select
                                        labelId="select-song-hanh"
                                        multiple
                                        value={listCheckedSongSong}
                                        onChange={(e) => handleAddMonHocSongHanh(e)}
                                        input={<OutlinedInput label="Môn học song hành" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuPropsMonHoc}
                                    >
                                        {listMonHocSongHanh?.map((item, index) => (
                                            <MenuItem
                                                key={item.maMonHoc}
                                                value={item.tenMonHoc}
                                                onClick={() => getAllCheckedSongHanh(item, index)}
                                            >
                                                {/* <Checkbox checked={listMonHoc.indexOf(item) > -1} /> */}
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-green-500 cursor-pointer mr-2"
                                                    checked={item.isCheckedHocSongHanh}
                                                    //onChange={() => getAllChecked(item, index)}
                                                />
                                                <ListItemText primary={item.tenMonHoc} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3"></div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={handleAddMonHoc}
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

export default MonHoc;
