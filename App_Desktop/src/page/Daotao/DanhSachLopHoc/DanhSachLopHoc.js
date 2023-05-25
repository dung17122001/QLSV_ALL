import React, { useState } from 'react';
import HeaderQL from '../../../components/HeaderQL/HeaderQL';
import {
    DataGridPremium,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    viVN,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Avatar, Button, Link } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { FaRegWindowClose, FaPlus } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';
import { TiCancel } from 'react-icons/ti';
import { BsFillEraserFill } from 'react-icons/bs';

function DanhSachLopHoc() {
    const dsKhoa = ['Công nghệ thông tin', 'Khoa học cơ bản', 'Điện - điện tử'];
    const [open, setOpen] = useState(false);
    const [lichHoc, setLichHoc] = useState('');
    const [caHoc, setCaHoc] = useState('');
    const [nhomTH, setNhomTH] = useState(0);
    const [dayNha, setDayNha] = useState('null');
    const [phong, setPhong] = useState(dsKhoa[0]);
    const [giangVien, setGiangVien] = useState('');
    const [ngayBD, setNgayBD] = useState('');
    const [ngayKT, setNgayKT] = useState('');
    const [trangThai, setTrangThai] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleSelectLichHoc(event) {
        setLichHoc(event.target.value);
    }

    function handleSelectCaHoc(event) {
        setCaHoc(event.target.value);
    }
    function handleSelectNhomTH(event) {
        setNhomTH(event.target.value);
    }
    function handleSelectDayNha(event) {
        setDayNha(event.target.value);
    }
    function handleSelectPhong(event) {
        setPhong(event.target.value);
    }
    function handleSelectGiangVien(event) {
        setGiangVien(event.target.value);
    }
    function handleSelectNgayBD(event) {
        setNgayBD(event.target.value);
    }
    function handleSelectNgayKT(event) {
        setNgayKT(event.target.value);
    }
    function AddLichHoc() {
        if (nhomTH < 5) {
            setNhomTH(nhomTH + 1);
        }
    }
    function RemoveLichHoc() {
        if (nhomTH > 0) {
            setNhomTH(nhomTH - 1);
        }
        console.log(nhomTH);
    }
    console.log(nhomTH);
    const columns = [
        {
            field: 'STT',
            renderHeader: () => <strong>STT</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            filterable: false,
            width: 50,
            align: 'center',
        },
        {
            field: 'maLHP',
            renderHeader: () => <strong>Mã lớp học phần</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },

        {
            field: 'tenLopHP',
            renderHeader: () => <strong>Tên lớp học phần</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 250,
            align: 'center',
        },
        {
            field: 'lopDuKien',
            renderHeader: () => <strong>Lớp dự kiến</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },
        {
            field: 'soTCLT',
            renderHeader: () => <strong>Sỉ số tối đa</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'soTCTH',
            renderHeader: () => <strong>Đã đăng ký</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 150,
            align: 'center',
        },
        {
            field: 'lichHoc',
            renderHeader: () => <strong>Lịch học</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },

        {
            field: 'trangThai',
            renderHeader: () => <strong>Trạng thái</strong>,
            headerClassName: 'bg-2t-yellow-1 bg-opacity-10',
            width: 200,
            align: 'center',
        },
    ];

    const row = [
        {
            id: 1,
            maMonHoc: '2534253',
            tenMonHoc: 'OOP',
            khoa: 'CNTT',
            soTCLT: 2,
            soTCTH: 1,
            dieuKien: '7666a',
            batBuoc: true,
            trangThai: '',
        },
    ];

    const ToolbarTable = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarExport fileName="Danh sách phim" />
                <GridToolbarColumnsButton />
            </GridToolbarContainer>
        );
    };
    return (
        <div className="h-full w-full">
            <div className="w-full flex justify-center items-center mt-3">
                <div className="text-lg font-bold text-sv-blue-4">Danh sách lớp học phần</div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="border border-gray-300 w-[96%]"></div>
            </div>
            <div className="mt-4">
                <HeaderQL
                    placeholder={'Nhập mã, tên lớp HP'}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpen}
                ></HeaderQL>
            </div>
            <div className=" h-3/4 mr-11 ml-10">
                <DataGridPremium
                    columns={columns}
                    rows={row.map((item, index) => ({ STT: index + 1, ...item }))}
                    getRowId={(row) => row.STT}
                    checkboxSelection
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    //onRowClick={handleOpenListClass}
                    // loading={loading}
                    // localeText={{
                    //     toolbarColumns: 'Thay đổi cột',
                    //     toolbarExport: 'Xuất báo cáo',
                    //     MuiTablePagination: {
                    //         labelDisplayedRows: ({ from, to, count }) => `${from} - ${to} của ${count}`,
                    //     },
                    // }}
                    // autoPageSize

                    pagination
                    localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                    components={{
                        Toolbar: ToolbarTable,
                    }}
                />
            </div>
            <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                <div className="w-full h-12 flex justify-between border-b-2 items-center">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin lớp học phần</div>
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
                        <div className="flex justify-center flex-row items-center w-full">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Lịch học:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={lichHoc}
                                        onChange={handleSelectLichHoc}
                                    >
                                        <option value="thu2">Thứ 2</option>
                                        <option value="thu3">Thứ 3</option>
                                        <option value="thu4">Thứ 4</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ca học:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={caHoc}
                                        onChange={handleSelectCaHoc}
                                    >
                                        <option value="T1-T3">T1-T3</option>
                                        <option value="T4-T6">T4-T6</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Giảng viên:</label>
                                </div>
                                <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={setLichHoc}
                                        onChange={handleSelectLichHoc}
                                    >
                                        <option value="LT">Nguyễn Văn Tài</option>
                                        <option value="Nam">0</option>
                                        <option value="Nu">1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-full">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Dãy nhà:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={dayNha}
                                        onChange={handleSelectDayNha}
                                    >
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
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
                                        value={phong}
                                        onChange={handleSelectPhong}
                                    >
                                        <option value="A2.01">T1-T3</option>
                                        <option value="A2.02">T4-T6</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Loại:</label>
                                </div>
                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        // value={setLichHoc}
                                        // onChange={handleSelectLichHoc}
                                    >
                                        <option value="Lý thuyết">Lý thuyết</option>
                                        <option value="Thực hành">Thực hành</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-between border-b-2">
                        <div className="flex justify-center flex-row items-center w-full">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ngày bắt đầu:</label>
                                </div>
                                <input
                                    type="date"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    //placeholder="Mã giảng viên"
                                    value={ngayBD}
                                    onChange={(e) => {
                                        setNgayBD(e.target.value);
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
                                    //placeholder="Mã giảng viên"
                                    value={ngayKT}
                                    onChange={(e) => {
                                        setNgayKT(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Trạng thái:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Trạng thái"
                                    value={trangThai}
                                    onChange={(e) => {
                                        setTrangThai(e.target.value);
                                    }}
                                    spellCheck={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex justify-center flex-row items-center w-full">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<FaPlus />}
                                    color="success"
                                    onClick={AddLichHoc}
                                >
                                    Thêm lịch học
                                </Button>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<MdRemove />}
                                    color="success"
                                    onClick={RemoveLichHoc}
                                >
                                    Giảm lịch học
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={nhomTH > 0 ? '' : 'hidden '}>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Lịch học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={lichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="thu2">Thứ 2</option>
                                            <option value="thu3">Thứ 3</option>
                                            <option value="thu4">Thứ 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Ca học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={caHoc}
                                            onChange={handleSelectCaHoc}
                                        >
                                            <option value="T1-T3">T1-T3</option>
                                            <option value="T4-T6">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Giảng viên:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={setLichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="LT">Nguyễn Văn Tài</option>
                                            <option value="Nam">0</option>
                                            <option value="Nu">1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Dãy nhà:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={dayNha}
                                            onChange={handleSelectDayNha}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
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
                                            value={phong}
                                            onChange={handleSelectPhong}
                                        >
                                            <option value="A2.01">T1-T3</option>
                                            <option value="A2.02">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Loại:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            // value={setLichHoc}
                                            // onChange={handleSelectLichHoc}
                                        >
                                            <option value="Lý thuyết">Lý thuyết</option>
                                            <option value="Thực hành">Thực hành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={nhomTH > 1 ? '' : 'hidden '}>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Lịch học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={lichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="thu2">Thứ 2</option>
                                            <option value="thu3">Thứ 3</option>
                                            <option value="thu4">Thứ 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Ca học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={caHoc}
                                            onChange={handleSelectCaHoc}
                                        >
                                            <option value="T1-T3">T1-T3</option>
                                            <option value="T4-T6">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Giảng viên:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={setLichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="LT">Nguyễn Văn Tài</option>
                                            <option value="Nam">0</option>
                                            <option value="Nu">1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Dãy nhà:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={dayNha}
                                            onChange={handleSelectDayNha}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
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
                                            value={phong}
                                            onChange={handleSelectPhong}
                                        >
                                            <option value="A2.01">T1-T3</option>
                                            <option value="A2.02">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Loại:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            // value={setLichHoc}
                                            // onChange={handleSelectLichHoc}
                                        >
                                            <option value="Lý thuyết">Lý thuyết</option>
                                            <option value="Thực hành">Thực hành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={nhomTH > 2 ? '' : 'hidden'}>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Lịch học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={lichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="thu2">Thứ 2</option>
                                            <option value="thu3">Thứ 3</option>
                                            <option value="thu4">Thứ 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Ca học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={caHoc}
                                            onChange={handleSelectCaHoc}
                                        >
                                            <option value="T1-T3">T1-T3</option>
                                            <option value="T4-T6">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Giảng viên:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={setLichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="LT">Nguyễn Văn Tài</option>
                                            <option value="Nam">0</option>
                                            <option value="Nu">1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Dãy nhà:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={dayNha}
                                            onChange={handleSelectDayNha}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
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
                                            value={phong}
                                            onChange={handleSelectPhong}
                                        >
                                            <option value="A2.01">T1-T3</option>
                                            <option value="A2.02">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Loại:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            // value={setLichHoc}
                                            // onChange={handleSelectLichHoc}
                                        >
                                            <option value="Lý thuyết">Lý thuyết</option>
                                            <option value="Thực hành">Thực hành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={nhomTH > 3 ? '' : 'hidden'}>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Lịch học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={lichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="thu2">Thứ 2</option>
                                            <option value="thu3">Thứ 3</option>
                                            <option value="thu4">Thứ 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Ca học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={caHoc}
                                            onChange={handleSelectCaHoc}
                                        >
                                            <option value="T1-T3">T1-T3</option>
                                            <option value="T4-T6">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Giảng viên:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={setLichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="LT">Nguyễn Văn Tài</option>
                                            <option value="Nam">0</option>
                                            <option value="Nu">1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Dãy nhà:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={dayNha}
                                            onChange={handleSelectDayNha}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
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
                                            value={phong}
                                            onChange={handleSelectPhong}
                                        >
                                            <option value="A2.01">T1-T3</option>
                                            <option value="A2.02">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Loại:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            // value={setLichHoc}
                                            // onChange={handleSelectLichHoc}
                                        >
                                            <option value="Lý thuyết">Lý thuyết</option>
                                            <option value="Thực hành">Thực hành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={nhomTH > 4 ? '' : 'hidden'}>
                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Lịch học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={lichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="thu2">Thứ 2</option>
                                            <option value="thu3">Thứ 3</option>
                                            <option value="thu4">Thứ 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Ca học:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={caHoc}
                                            onChange={handleSelectCaHoc}
                                        >
                                            <option value="T1-T3">T1-T3</option>
                                            <option value="T4-T6">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Giảng viên:</label>
                                    </div>
                                    <div className="flex w-60 border h-8 border-sv-blue-4 rounded-lg p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={setLichHoc}
                                            onChange={handleSelectLichHoc}
                                        >
                                            <option value="LT">Nguyễn Văn Tài</option>
                                            <option value="Nam">0</option>
                                            <option value="Nu">1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-full">
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Dãy nhà:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            value={dayNha}
                                            onChange={handleSelectDayNha}
                                        >
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
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
                                            value={phong}
                                            onChange={handleSelectPhong}
                                        >
                                            <option value="A2.01">T1-T3</option>
                                            <option value="A2.02">T4-T6</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center flex-row items-center w-1/3">
                                    <div className="w-32 text-left">
                                        <label htmlFor="">Loại:</label>
                                    </div>
                                    <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                        <select
                                            className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                            // value={setLichHoc}
                                            // onChange={handleSelectLichHoc}
                                        >
                                            <option value="Lý thuyết">Lý thuyết</option>
                                            <option value="Thực hành">Thực hành</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center p-3">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AiFillSave />}
                            color="success"
                            //onClick={() => onPressSearch(valueSearch)}
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
    );
}

export default DanhSachLopHoc;
