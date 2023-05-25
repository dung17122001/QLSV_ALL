import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import style from './danhSachLopHP.scss';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import routes from '../../configRoutes/routes';
import Dialog from '@mui/material/Dialog';
import { FaRegWindowClose, FaFileExcel } from 'react-icons/fa';
import { Scrollbar } from 'react-scrollbars-custom';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getTatCaHocKy } from '~/services/hocKyService';
import { getLHPCuaGVTheoMaHK, getThongTinSVByMaLHP } from '~/services/lopHocPhanService';
import { getSinhVienByMaLHP } from '~/services/sinhVienService';
import ExcelJS from 'exceljs';
import { Button } from '@mui/material';
function DanhSachLopHP() {
    const navigate = useNavigate();
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const currNhanVien = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [open, setOpen] = React.useState(false);
    const [listHocKy, setListHocKy] = useState([]);
    const [selectedHK, setSelectedHK] = useState('');
    const [selectedLHP, setSelectedLHP] = useState('');
    const [listLHP, setListLHP] = useState();
    const [listThongTinLHP, setListThongTinLHP] = useState();
    const [listDiemLHP, setListDiemLHP] = useState();

    useEffect(() => {
        const getHocKy = async () => {
            let result = await getTatCaHocKy(accessToken, axiosJWT);
            //console.log(result);
            setListHocKy(result);
        };
        getHocKy();
    }, [userLoginData]);

    const handleClickOpenThongTinLHP = async (item) => {
        setOpen(true);
        setSelectedLHP(item);
        let sv = await getSinhVienByMaLHP(item.maLopHocPhan, accessToken, axiosJWT);
        //console.log(sv);
        setListThongTinLHP(sv);
        let resultBangDiem = await getThongTinSVByMaLHP(
            item.maLopHocPhan,
            currNhanVien.maNhanVien,
            accessToken,
            axiosJWT,
        );
        //console.log(resultBangDiem);
        if (!!resultBangDiem) setListDiemLHP(resultBangDiem);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectHK = async (e) => {
        setSelectedHK(e.target.value);
        let resultLHP = await getLHPCuaGVTheoMaHK(currNhanVien?.maNhanVien, e.target.value, accessToken, axiosJWT);
        //console.log(resultLHP);
        setListLHP(resultLHP);
        let resultBangDiem = await getThongTinSVByMaLHP(
            e.target.value,
            currNhanVien?.maNhanVien,
            accessToken,
            axiosJWT,
        );
        //console.log(resultBangDiem);
        if (!!resultBangDiem) setListDiemLHP(resultBangDiem);
    };

    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function xepLoaiBangDiem(diemHe10) {
        if (diemHe10 >= 9) {
            return 'Xuất sắc';
        } else if (diemHe10 >= 8) {
            return 'Giỏi';
        } else if (diemHe10 >= 6.5) {
            return 'Khá';
        } else if (diemHe10 >= 5) {
            return 'Trung bình';
        } else if (diemHe10 >= 4) return 'TB yếu';
        else {
            return 'Yếu';
        }
    }

    function chuyenDoiDiemHe10SangHe4Chu(diemHe10) {
        let diemHe4 = '';
        if (diemHe10 >= 9) {
            diemHe4 = 'A+';
        } else if (diemHe10 >= 8.5) {
            diemHe4 = 'A';
        } else if (diemHe10 >= 8) {
            diemHe4 = 'B+';
        } else if (diemHe10 >= 7) {
            diemHe4 = 'B';
        } else if (diemHe10 >= 6.5) {
            diemHe4 = 'C+';
        } else if (diemHe10 >= 5.5) {
            diemHe4 = 'C';
        } else if (diemHe10 >= 5) {
            diemHe4 = 'D+';
        } else if (diemHe10 >= 4) {
            diemHe4 = 'D';
        } else {
            diemHe4 = 'F';
        }
        return diemHe4;
    }

    function chuyenDoiDiemHe10SangHe4(diemHe10) {
        if (diemHe10 >= 9) {
            return 4;
        } else if (diemHe10 >= 8.5) {
            return 3.8;
        } else if (diemHe10 >= 8) {
            return 3.5;
        } else if (diemHe10 >= 7) {
            return 3;
        } else if (diemHe10 >= 6.5) {
            return 2.8;
        } else if (diemHe10 >= 6) {
            return 2.5;
        } else if (diemHe10 >= 5.5) {
            return 2;
        } else if (diemHe10 >= 5) {
            return 1.5;
        } else if (diemHe10 >= 4) {
            return 1;
        } else {
            return 0;
        }
    }

    const exportToExcel = async () => {
        // Tạo workbook và worksheet mới
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');

        var hk = listHocKy.find((e) => e.maHocKy === selectedHK);
        var tenHK = hk?.tenHocKy || '';

        worksheet.columns = [
            { header: 'STT', key: 'stt', width: 5 },
            { header: 'Mã số sinh viên', key: 'maSV', width: 20 },
            { header: 'Họ tên sinh viên', key: 'hoTen', width: 25 },
            { header: 'Giữa kỳ', key: 'giuaKy', width: 6 },
            { header: 'Chuyên cần', key: 'chuyenCan', width: 12 },
            { header: 'Thường kỳ 1', key: 'thuongKy1', width: 6 },
            { header: 'Thường kỳ 2', key: 'thuongKy2', width: 6 },
            { header: 'Thường kỳ 3', key: 'thuongKy3', width: 6 },
            { header: 'Thường kỳ 4', key: 'thuongKy4', width: 6 },
            { header: 'Thường kỳ 5', key: 'thuongKy5', width: 6 },
            { header: 'Thực hành 1', key: 'thucHanh1', width: 6 },
            { header: 'Thực hành 2', key: 'thucHanh2', width: 6 },
            { header: 'Thực hành 3', key: 'thucHanh3', width: 6 },
            { header: 'Cuối kỳ', key: 'cuoiKy', width: 6 },
            { header: 'Tổng kết', key: 'diemTongKet', width: 6 },
            { header: 'Ghi chú', key: 'trangThai', width: 6 },
        ];

        worksheet.mergeCells('A1:D3'); //merge ô từ A1 đến O1
        const mergedCell = worksheet.getCell('A1');
        mergedCell.value = 'BỘ CÔNG THƯƠNG\nTRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HCM';
        mergedCell.font = { size: 11, bold: true };
        mergedCell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        worksheet.eachRow(function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
                cell.border = null;
            });
        });

        worksheet.mergeCells('E1:I3');
        const E1 = worksheet.getCell('E1');
        E1.value = '';
        worksheet.mergeCells('J1:P3');
        const J1 = worksheet.getCell('J1');
        J1.value = 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\r\nĐộc lập - Tự do - Hạnh phúc';
        J1.font = { size: 11, bold: true };
        J1.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        worksheet.mergeCells('A4:P5');
        const A4 = worksheet.getCell('A4');
        A4.value = 'DANH SÁCH THÔNG TIN SINH VIÊN';
        A4.font = { size: 14, bold: true };
        A4.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        worksheet.mergeCells('A6:P6');
        const A6 = worksheet.getCell('A6');
        A6.value = `               Lớp học:       ${selectedLHP.tenLopHocPhan}                 Đợt: ${tenHK}`;
        A6.font = { size: 11, bold: true };
        A6.alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
        };

        worksheet.mergeCells('A7:P7');
        const A7 = worksheet.getCell('A7');
        A7.value = `               Môn học/học phần:       ${selectedLHP.hocPhan.tenHocPhan}`;
        A7.font = { size: 11, bold: true };
        A7.alignment = {
            vertical: 'middle',
            horizontal: 'left',
            wrapText: true,
        };

        worksheet.mergeCells('A8:A9');
        const A8 = worksheet.getCell('A8');
        A8.value = 'STT';
        A8.font = { size: 11, bold: true };
        A8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        A8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('B8:B9');
        const B8 = worksheet.getCell('B8');
        B8.value = 'Mã số sinh viên';
        B8.font = { size: 11, bold: true };
        B8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        B8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('C8:C9');
        const C8 = worksheet.getCell('C8');
        C8.value = 'Họ tên sinh viên';
        C8.font = { size: 11, bold: true };
        C8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        C8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('D8:E8');
        const D8 = worksheet.getCell('D8');
        D8.value = 'Giữa kỳ';
        D8.font = { size: 11, bold: true };
        D8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        D8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('F8:J8');
        const F8 = worksheet.getCell('F8');
        F8.value = 'Thường kỳ';
        F8.font = { size: 11, bold: true };
        F8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        F8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('K8:M8');
        const K8 = worksheet.getCell('K8');
        K8.value = 'Thực hành';
        K8.font = { size: 11, bold: true };
        K8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        K8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('N8:N9');
        const N8 = worksheet.getCell('N8');
        N8.value = 'Cuối kỳ';
        N8.font = { size: 11, bold: true };
        N8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        N8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('O8:O9');
        const O8 = worksheet.getCell('O8');
        O8.value = 'Điểm tổng kết';
        O8.font = { size: 11, bold: true };
        O8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        O8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        worksheet.mergeCells('P8:P9');
        const P8 = worksheet.getCell('P8');
        P8.value = 'Ghi chú';
        P8.font = { size: 11, bold: true };
        P8.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        P8.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };

        const D9 = worksheet.getCell('D9');
        D9.value = 'GK';
        D9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        D9.font = { size: 11, bold: true };
        D9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const E9 = worksheet.getCell('E9');
        E9.value = 'Chuyên cần';
        E9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        E9.font = { size: 11, bold: true };
        E9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const F9 = worksheet.getCell('F9');
        F9.value = '1';
        F9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        F9.font = { size: 11, bold: true };
        F9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const G9 = worksheet.getCell('G9');
        G9.value = '2';
        G9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        G9.font = { size: 11, bold: true };
        G9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const H9 = worksheet.getCell('H9');
        H9.value = '3';
        H9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        H9.font = { size: 11, bold: true };
        H9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const I9 = worksheet.getCell('I9');
        I9.value = '4';
        I9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        I9.font = { size: 11, bold: true };
        I9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const J9 = worksheet.getCell('J9');
        J9.value = '5';
        J9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        J9.font = { size: 11, bold: true };
        J9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        const K9 = worksheet.getCell('K9');
        K9.value = '1';
        K9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        K9.font = { size: 11, bold: true };
        K9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        const L9 = worksheet.getCell('L9');
        L9.value = '2';
        L9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        L9.font = { size: 11, bold: true };
        L9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        const M9 = worksheet.getCell('M9');
        M9.value = '3';
        M9.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        M9.font = { size: 11, bold: true };
        M9.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };

        for (let i = 0; i < listThongTinLHP?.length; i++) {
            let diem = {};
            if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK002') {
                diem = listDiemLHP?.find(
                    (e) =>
                        e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                        e.trangThai !== 'Học lại',
                );
            } else if (listThongTinLHP[i]?.loaiDangKyHP?.maLoaiDKHP === 'LDK003') {
                diem = listDiemLHP?.find(
                    (e) =>
                        e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien &&
                        e.trangThai !== 'Học cải thiện',
                );
            } else {
                diem = listDiemLHP?.find(
                    (e) => e.sinhVien.maSinhVien === listThongTinLHP[i].phieuDangKyHocPhan.sinhVien.maSinhVien,
                );
            }
            worksheet
                .addRow({
                    stt: i + 1 || '',
                    maSV: diem?.sinhVien.maSinhVien || '',
                    hoTen: diem?.sinhVien.tenSinhVien || '',
                    giuaKy: diem?.giuaKy || '',
                    chuyenCan: diem?.chuyenCan || '',
                    thuongKy1: diem?.thuongKy1 || '',
                    thuongKy2: diem?.thuongKy2 || '',
                    thuongKy3: diem?.thuongKy3 || '',
                    thuongKy4: diem?.thuongKy4 || '',
                    thuongKy5: diem?.thuongKy5 || '',
                    thucHanh1: diem?.thucHanh1 || '',
                    thucHanh2: diem?.thucHanh2 || '',
                    thucHanh3: diem?.thucHanh3 || '',
                    cuoiKy: diem?.cuoiKy || '',
                    diemTongKet: diem?.diemTongKet || '',
                    trangThai: diem?.trangThai || '',
                })
                .eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
        }

        // Tạo file Excel từ workbook
        const buffer = await workbook.xlsx.writeBuffer();
        workbook.xlsx
            .writeBuffer({ base64: true, charset: 'utf8' })
            .then((buffer) => {
                // handle the buffer, e.g. send it to client
            })
            .catch((err) => {
                // handle errors
            });

        // Tạo URL từ buffer
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Tạo thẻ a để tải file Excel
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `DS ${selectedLHP.tenLopHocPhan}.xlsx`;
        downloadLink.click();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={'100%'}
                maxWidth={'100%'}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="w-full flex justify-between mt-5">
                    <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin chi tiết của lớp học phần</div>
                    <div>
                        <FaRegWindowClose className="mr-5" size={30} color="#47A9FF" onClick={handleClose} />
                    </div>
                </div>

                <div className="flex h-screen justify-center items-center p-10">
                    <Scrollbar className="w-full, h-full">
                        <div className="p-2">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<FaFileExcel />}
                                onClick={() => exportToExcel()}
                            >
                                Xuất excel
                            </Button>
                        </div>
                        <table className={cx('table-dkhp')}>
                            <thead className="bg-gray-200  text-sv-blue-5 border">
                                <tr className="bg-gray-200 border border-sv-blue-5">
                                    <th rowSpan={3} className="border border-sv-blue-4">
                                        STT
                                    </th>
                                    <th rowSpan={3} className="   border border-sv-blue-4">
                                        Mã số sinh viên
                                    </th>
                                    <th rowSpan={3} className="w-64 border border-sv-blue-4">
                                        Họ tên sinh viên
                                    </th>

                                    <th colSpan={2} className="border border-sv-blue-4">
                                        Giữa kỳ
                                    </th>
                                    <th colSpan={5} className=" border border-sv-blue-4">
                                        Thường xuyên
                                    </th>
                                    <th colSpan={3} className=" border border-sv-blue-4">
                                        Thực hành
                                    </th>

                                    <th colSpan={1} rowSpan={3} className="w-20 border border-sv-blue-4">
                                        Cuối kỳ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className=" w-20 border border-sv-blue-4">
                                        Điểm tổng kết
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="w-20 border border-sv-blue-4">
                                        Thang điểm 4
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="w-20 border border-sv-blue-4">
                                        Điểm chữ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="w-20 border border-sv-blue-4">
                                        Xếp loại
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className="w-20 border border-sv-blue-4">
                                        Chuyên cần
                                    </th>
                                    <th rowSpan={1} colSpan={5} className=" border border-sv-blue-4">
                                        LT Hệ số 1
                                    </th>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        3
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={1} className=" border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={1} className=" border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={1} className=" border border-sv-blue-4">
                                        3
                                    </th>
                                    <th rowSpan={1} className=" border border-sv-blue-4">
                                        4
                                    </th>
                                    <th rowSpan={1} className="border border-sv-blue-4">
                                        5
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listThongTinLHP?.map((item, index) => {
                                    let diem = {};
                                    if (item?.loaiDangKyHP?.maLoaiDKHP === 'LDK002') {
                                        diem = listDiemLHP?.find(
                                            (e) =>
                                                e.sinhVien.maSinhVien === item.phieuDangKyHocPhan.sinhVien.maSinhVien &&
                                                e.trangThai !== 'Học lại',
                                        );
                                    } else if (item?.loaiDangKyHP?.maLoaiDKHP === 'LDK003') {
                                        diem = listDiemLHP?.find(
                                            (e) =>
                                                e.sinhVien.maSinhVien === item.phieuDangKyHocPhan.sinhVien.maSinhVien &&
                                                e.trangThai !== 'Học cải thiện',
                                        );
                                    } else {
                                        diem = listDiemLHP?.find(
                                            (e) =>
                                                e.sinhVien.maSinhVien === item.phieuDangKyHocPhan.sinhVien.maSinhVien,
                                        );
                                    }
                                    //console.log(diem);

                                    return (
                                        <tr className="bg-white" key={item.phieuDangKyHocPhan.sinhVien.maSinhVien}>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                {item?.phieuDangKyHocPhan.sinhVien.maSinhVien}
                                            </td>
                                            <td className="text-left border max-w-md ">
                                                {item?.phieuDangKyHocPhan.sinhVien.tenSinhVien}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.giuaKy}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.giuaKy}
                                            </td>
                                            <td></td>
                                            <td
                                                className={
                                                    `${diem?.thuongKy1}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thuongKy1}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thuongKy2}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thuongKy2}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thuongKy3}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thuongKy3}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thuongKy4}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thuongKy4}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thuongKy5}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thuongKy5}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thucHanh1}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thucHanh1}
                                            </td>

                                            <td
                                                className={
                                                    `${diem?.thucHanh2}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thucHanh2}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.thucHanh3}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.thucHanh3}
                                            </td>
                                            <td
                                                className={
                                                    `${diem?.cuoiKy}` <= 5
                                                        ? 'text-red-500  text-center'
                                                        : 'text-center text-black'
                                                }
                                            >
                                                {diem?.cuoiKy}
                                            </td>
                                            <td className="text-center">
                                                {' '}
                                                {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                                    ? diem?.diemTongKet
                                                    : ''}
                                            </td>
                                            <td className="text-center">
                                                {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                                    ? chuyenDoiDiemHe10SangHe4(diem.diemTongKet)
                                                    : ''}
                                            </td>
                                            <td className="text-center">
                                                {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                                    ? chuyenDoiDiemHe10SangHe4Chu(diem.diemTongKet)
                                                    : ''}
                                            </td>
                                            <td className="text-center">
                                                {' '}
                                                {!!diem?.diemTongKet || diem?.diemTongKet === 0
                                                    ? xepLoaiBangDiem(diem?.diemTongKet)
                                                    : ''}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </Dialog>
            <div className="h-full w-full bg-gray-100 flex flex-row">
                <div className="w-1/12"></div>
                <div className="w-10/12 bg-white mt-2 rounded p-5">
                    <div className=" text-sv-text-2 font-bold border-b-2 ml-2 h-10 flex flex-row justify-between items-center">
                        <p> Danh sách lớp học phần</p>
                        <div className="mr-16">
                            <div className="flex items-center border  border-sv-blue-4 rounded">
                                <select
                                    className="text-sv-text-2 border  border-sv-blue-4 "
                                    value={selectedHK}
                                    onChange={handleSelectHK}
                                >
                                    <option value="">Học kỳ</option>
                                    {listHocKy?.map((option) => (
                                        <option key={option.maHocKy} value={option.maHocKy}>
                                            {option.tenHocKy}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <table className={cx('table-dslhp')}>
                            <thead className="bg-blue-100">
                                <tr>
                                    <th rowSpan={2}>STT</th>
                                    <th rowSpan={2}>Mã học phần</th>
                                    <th rowSpan={2}>Tên lớp học phần</th>
                                    <th rowSpan={2}>Tên môn học/học phần</th>
                                    <th rowSpan={2}>Số TCLT</th>
                                    <th rowSpan={2}>Số TCTH</th>
                                    <th rowSpan={2}>Số SV</th>
                                    <th rowSpan={1} colSpan={2}>
                                        Thời gian
                                    </th>
                                </tr>
                                <tr>
                                    <th>Bắt đầu</th>
                                    <th>Kết thúc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLHP?.map((item, index) => (
                                    <tr
                                        onClick={() => handleClickOpenThongTinLHP(item)}
                                        key={item.maLopHocPhan}
                                        className="hover:cursor-pointer"
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item?.maLopHocPhan}</td>
                                        <td>{item?.tenLopHocPhan}</td>
                                        <td>{item?.hocPhan?.tenHocPhan}</td>
                                        <td>{item?.hocPhan?.monHoc?.soTCLT}</td>
                                        <td>{item?.hocPhan?.monHoc?.soTCTH}</td>
                                        <td>{item.siSoThuc}</td>
                                        <td>{convertDateFormat(item.ngayBatDau)}</td>
                                        <td>{convertDateFormat(item.ngayKetThuc)}</td>
                                    </tr>
                                ))}

                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DanhSachLopHP;
