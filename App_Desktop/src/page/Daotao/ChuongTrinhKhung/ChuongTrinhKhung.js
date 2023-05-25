import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineSearch, AiFillSetting, AiFillDelete, AiFillCloseCircle } from 'react-icons/ai';
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
import style from './ChuongTrinhKhung.module.scss';
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
import { getTatCaNganh } from '~/services/nganhService';
import {
    getTatCaChuongTrinhKhung,
    addChuongTrinhKhung,
    capNhatChuongTrinhKhung,
    addChiTietHK,
    getCTKByTextSearch,
} from '~/services/chuongTrinhKhungService';
import { getTatCaKhoa } from '~/services/khoaService';
import { getTatCaKhoaHoc } from '~/services/khoaHocService';
import {
    getHocKyTheoKhoaHoc,
    getHocKyTheoMaCTK,
    addChiTietHocPhan,
    removeMonHocOfChuongTrinhKhung,
} from '~/services/hocKyService';
import { getTatCaMonHoc, getMonHocByTextSearch } from '~/services/monHocService';
import { addHocPhan, getHocPhanTheoHocKy, getHocPhanTheoKhoaHoc, getHocPhanTheoMaMH } from '~/services/hocPhanService';
import { tr } from 'date-fns/locale';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';
const cx = classNames.bind(style);

function ChuongTrinhKhung() {
    const [open, setOpen] = useState(false);
    const [openModalMonHoc, setOpenModalMonHoc] = useState(false);
    const [danhSachNganh, setDanhSachNghanh] = useState();
    const [reload, setReload] = useState(false);
    const [selectedCTK, setSelectedCTK] = useState('');
    const [selectedHK, setSelectedHK] = useState('');
    const [maCTK, setMaCTK] = useState();
    const [tenCTK, setTenCTK] = useState();
    const [nganhHoc, setNganhHoc] = useState();
    const [khoaHoc, setKhoaHoc] = useState();
    const [trangThai, setTrangThai] = useState('Bình thường');
    const [danhSachCTK, setDanhSachCTK] = useState();
    const [listKhoaHoc, setListKhoaHoc] = useState();
    const [listMonHoc, setListMonHoc] = useState();
    const [listHocKy, setListHocKy] = useState();
    const [listChecked, setListChecked] = useState([]);
    const [display, setDisplay] = useState('');
    const [tongTinChi, setTongTinChi] = useState(146);
    const [listHPTheoKy, setListHPTheoKy] = useState();
    const [listHocPhanTheoKhoaHoc, setListHocPhanKhoaHoc] = useState();
    const [typeHocPhan, setTypeHocPhan] = useState('');
    const [valueSearchMH, setValueSearchMH] = useState('');
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    var sttHP = 1,
        tongSoTCBB = 0,
        tongSoTCTC = 0;

    const tinhTongSoTC = () => {
        if (!!listHocPhanTheoKhoaHoc && listHocPhanTheoKhoaHoc.length > 0) {
            for (let i = 0; i < listHocPhanTheoKhoaHoc.length; i++) {
                if (listHocPhanTheoKhoaHoc[i].trangThai === 'Tự chọn')
                    tongSoTCTC +=
                        listHocPhanTheoKhoaHoc[i].hocPhan.monHoc.soTCLT +
                        listHocPhanTheoKhoaHoc[i].hocPhan.monHoc.soTCTH;
                else
                    tongSoTCBB +=
                        listHocPhanTheoKhoaHoc[i].hocPhan.monHoc.soTCLT +
                        listHocPhanTheoKhoaHoc[i].hocPhan.monHoc.soTCTH;
            }
        }
    };
    tinhTongSoTC();

    useEffect(() => {
        const getALLNganh = async () => {
            const dsNganh = await getTatCaNganh(accessToken, axiosJWT);
            setDanhSachNghanh(dsNganh);
        };

        const getALLCTK = async () => {
            const dsCTK = await getTatCaChuongTrinhKhung(accessToken, axiosJWT);
            setDanhSachCTK(dsCTK);
        };
        const getALLKhoaHoc = async () => {
            const dsKH = await getTatCaKhoaHoc(accessToken, axiosJWT);
            setListKhoaHoc(dsKH);
        };

        const getALLMonHoc = async () => {
            const getTatCaMH = await getTatCaMonHoc(accessToken, axiosJWT);
            getTatCaMH.isChecked = false;
            setListMonHoc(getTatCaMH);
        };

        getALLMonHoc();
        getALLNganh();
        getALLCTK();
        getALLKhoaHoc();
    }, [reload]);

    const handleTimKiemMH = async () => {
        const getTatCaMH = await getMonHocByTextSearch(valueSearchMH, accessToken, axiosJWT);
        getTatCaMH.isChecked = false;
        setListMonHoc(getTatCaMH);
    };

    const handleSelectCTK = async (item) => {
        setSelectedCTK(item);
        let dsHocKy = await getHocKyTheoMaCTK(item.maChuongTrinhKhung, accessToken, axiosJWT);
        if (!!item?.khoaHoc.tenKhoaHoc) {
            const startYear = item?.khoaHoc.tenKhoaHoc.substring(0, 4);
            const endYear = item?.khoaHoc.tenKhoaHoc.substring(5);
            var listHocPhanTheoKhoaHoc = await getHocPhanTheoKhoaHoc(
                `${startYear}-08-01`,
                `${endYear}-06-01`,
                item.maChuongTrinhKhung,
                accessToken,
                axiosJWT,
            );
            setListHocPhanKhoaHoc(listHocPhanTheoKhoaHoc);
        }
        //console.log(dsHocKy);
        setListHocKy(dsHocKy);
    };

    // const handleSelectHocKy = (item) => {
    //     setSelectedHK(item);
    // };

    const handleClickOpen = () => {
        setMaCTK('');
        handleXoaRong();
        setOpen(true);
    };

    const handleClickOpenModalMonHoc = (item) => {
        //console.log(item);
        setTypeHocPhan('Bắt buộc');
        setReload(!reload);
        setOpenModalMonHoc(true);
        setSelectedHK(item);
        setListChecked([]);
    };
    const handleClickOpenModalMonHocTuChon = (item) => {
        //console.log(item);
        setTypeHocPhan('Tự chọn');
        setReload(!reload);
        setOpenModalMonHoc(true);
        setSelectedHK(item);
        setListChecked([]);
    };
    const handleCloseModalMonHoc = () => {
        setReload(!reload);
        setOpenModalMonHoc(false);
        //setSelectedCTK('');
    };
    const handleClickOpenUpdate = () => {
        if (!!selectedCTK) {
            setMaCTK(selectedCTK.maChuongTrinhKhung);
            setTenCTK(selectedCTK.tenChuongTrinhKhung);
            setKhoaHoc(selectedCTK.khoaHoc?.maKhoaHoc);
            setNganhHoc(selectedCTK.nganhHoc?.maNganh);
            setTongTinChi(selectedCTK?.tongSoTinChi);
            setTrangThai(selectedCTK.trangThai);
        } else {
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn chương trình khung cần sửa!', 'Thông báo');
            return;
        }
        setOpen(true);
    };

    const handleXoaRong = () => {
        setTenCTK('');
        setKhoaHoc('');
        setNganhHoc('');
        setTongTinChi(146);
        setTrangThai('Bình thường');
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleExportExcel = () => {
        exportToExcel('data-nganh', 'Danh sách ngành học');
    };
    const handleNganhHoc = (e) => {
        setNganhHoc(e.target.value);
    };
    const handleThemCTK = async () => {
        var ctk = {
            maChuongTrinhKhung: maCTK,
            tenChuongTrinhKhung: tenCTK,
            nganhHoc: nganhHoc,
            khoaHoc: khoaHoc,
            tongSoTinChi: tongTinChi,
            trangThai: trangThai,
        };
        if (!selectedCTK.maChuongTrinhKhung && selectedCTK.maChuongTrinhKhung !== '') {
            let result = await addChuongTrinhKhung(ctk, accessToken, axiosJWT);
            //console.log(result);
            if (!!khoaHoc) {
                const kh = listKhoaHoc.find((item) => item.maKhoaHoc === khoaHoc);
                const startYear = kh?.tenKhoaHoc.substring(0, 4);
                const endYear = kh?.tenKhoaHoc.substring(5);
                var listHK = await getHocKyTheoKhoaHoc(`${startYear}-08-01`, `${endYear}-06-01`, accessToken, axiosJWT);
                //setListHocKy(listHK);
                for (let i = 0; i < listHK?.length; i++) {
                    let ctHocKy = {
                        chuongTrinhKhung: result?.maChuongTrinhKhung,
                        hocKy: listHK[i].maHocKy,
                    };
                    await addChiTietHK(ctHocKy, accessToken, axiosJWT);
                    //console.log(ctHocKy);
                }
            }
            //alert('Thêm chương trình khung thành công');
            handleClose();
            setReload(!reload);
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Thêm chương trình khung thành công!', 'Thông báo');
            return;
        } else {
            //console.log(ctk);
            await capNhatChuongTrinhKhung(ctk, accessToken, axiosJWT);
            //alert('Cập nhật chương trình khung thành công');
            handleClose();
            setReload(!reload);
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.success('Cập nhật chương trình khung thành công!', 'Thông báo');
            return;
        }
    };
    const hanldeSearchCTK = async (value) => {
        let dsCTK = await getCTKByTextSearch(value, accessToken, axiosJWT);
        setDanhSachCTK(dsCTK);
    };
    const handleDisplay = async (maHK) => {
        // console.log('1 ' + maHK);
        display === `${maHK}` ? setDisplay('') : setDisplay(`${maHK}`);
        // var dsHP = await getHocPhanTheoHocKy(maHK, accessToken, axiosJWT);
        // setListHPTheoKy(dsHP);
    };
    const renderDanhSachDieuKien = (item) => {
        let arrFilterHocTruoc = item.danhSachMonHocHocTruoc?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (a)</span>
                </>
            );
        });
        let arrFilterTienQuyet = item.danhSachMonHocTienQuyet?.map((monHoc) => {
            return (
                <>
                    {monHoc.maMonHoc} <span className="text-red-500"> (b)</span>
                </>
            );
        });
        let arrFilterSongHanh = item.danhSachMonHocSongHanh?.map((monHoc) => {
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
    const getAllChecked = (item, index) => {
        //setTick(!tick);
        //console.log(item);
        const filteredMonHoc = listMonHoc?.filter(
            (item) => !listHocPhanTheoKhoaHoc.some((hocPhan) => hocPhan.hocPhan.monHoc.maMonHoc === item.maMonHoc),
        );
        const temp = [...filteredMonHoc];
        if (temp[index].maMonHoc === item.maMonHoc) {
            temp[index].isChecked = !item.isChecked;
        }
        //console.log(item);
        if (item.isChecked) setListChecked((prev) => [...prev, item]);
        else {
            var arrRemove = listChecked.filter((e) => e.maMonHoc !== item.maMonHoc);
            setListChecked(arrRemove);
        }
        setListMonHoc(temp);
    };
    //console.log(listChecked);
    const handleThemChiTietHK = async () => {
        // console.log(selectedHK);
        // console.log(listChecked);
        if (listChecked.length > 0) {
            for (let i = 0; i < listChecked.length; i++) {
                var hp = {
                    tenHocPhan: listChecked[i].tenMonHoc,
                    monHoc: listChecked[i].maMonHoc,
                    trangThai: 'Bình thường',
                };
                var resultHP;
                var hpDaCo = await getHocPhanTheoMaMH(listChecked[i].maMonHoc, accessToken, axiosJWT); //Kiểm tra nếu học phần đã có thì không thêm mới
                //console.log(hpDaCo + 'kk');
                if (hpDaCo === '') resultHP = await addHocPhan(hp, accessToken, axiosJWT);
                var ctHP = {
                    hocPhan: hpDaCo !== '' ? hpDaCo.maHocPhan : resultHP.maHocPhan,
                    hocKy: selectedHK.maHocKy,
                    chuongTrinhKhung: selectedCTK?.maChuongTrinhKhung,
                    trangThai: typeHocPhan === 'Bắt buộc' ? 'Bắt buộc' : 'Tự chọn',
                };
                await addChiTietHocPhan(ctHP, accessToken, axiosJWT);
                handleCloseModalMonHoc();
            }
        } else {
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.warning('Chọn môn học cần thêm vào chương trình khung!', 'Thông báo');
            return;
        } //alert('Chọn môn học cần thêm vào chương trình khung');
        //setReload(!reload);
        // alert('Thêm môn học vào học kỳ thành công');
        toastr.options = {
            positionClass: 'toast-top-center',
            closeButton: true,
            timeOut: 5000,
            extendedTimeOut: 0,
            tapToDismiss: false,
        };
        toastr.success('Thêm môn học vào học kỳ thành công!', 'Thông báo');
        //return;
        if (!!selectedCTK?.khoaHoc?.tenKhoaHoc) {
            const startYear = selectedCTK?.khoaHoc?.tenKhoaHoc.substring(0, 4);
            const endYear = selectedCTK?.khoaHoc?.tenKhoaHoc.substring(5);
            var listHocPhanTheoKhoaHoc = await getHocPhanTheoKhoaHoc(
                `${startYear}-08-01`,
                `${endYear}-06-01`,
                selectedCTK.maChuongTrinhKhung,
                accessToken,
                axiosJWT,
            );
            setListHocPhanKhoaHoc(listHocPhanTheoKhoaHoc);
        }
    };

    const handleRemoveMonHoc = async (item) => {
        var hocKy = selectedHK.maHocKy;

        await removeMonHocOfChuongTrinhKhung(
            selectedCTK?.maChuongTrinhKhung,
            hocKy,
            item.hocPhan.maHocPhan,
            accessToken,
            axiosJWT,
        );
        if (!!selectedCTK?.khoaHoc?.tenKhoaHoc) {
            const startYear = selectedCTK?.khoaHoc?.tenKhoaHoc.substring(0, 4);
            const endYear = selectedCTK?.khoaHoc?.tenKhoaHoc.substring(5);
            var listHocPhanTheoKhoaHoc = await getHocPhanTheoKhoaHoc(
                `${startYear}-08-01`,
                `${endYear}-06-01`,
                selectedCTK.maChuongTrinhKhung,
                accessToken,
                axiosJWT,
            );
            setListHocPhanKhoaHoc(listHocPhanTheoKhoaHoc);
        }
    };

    const renderMonHoc = () => {
        var listRow = [];

        if (!!listMonHoc && listMonHoc.length > 0 && !!listHocPhanTheoKhoaHoc && listHocPhanTheoKhoaHoc.length > 0) {
            // Gộp hai danh sách lại với nhau
            const mergedList = listMonHoc.filter((monHoc) => {
                return !listHocPhanTheoKhoaHoc.some((hocPhan) => hocPhan.hocPhan.monHoc.maMonHoc === monHoc.maMonHoc);
            });
            //console.log(mergedList);
            for (let i = 0; i < mergedList?.length; i++) {
                var mh = mergedList[i];
                //console.log(diemSV);
                // Hàm trợ giúp để tạo ra phiên bản độc lập của Comp
                const createComp = (mh, i) => (
                    <>
                        <tr
                            onClick={() => getAllChecked(mh, i)}
                            //className="cursor-pointer"
                            className={`${mh.isChecked ? 'bg-orange-200' : ''} hover:cursor-pointer`}
                        >
                            <td>
                                <div className="flex mhs-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
                                        checked={mh.isChecked}
                                    />
                                </div>
                            </td>
                            <td>{i + 1}</td>
                            <td>{mh.maMonHoc}</td>
                            <td align="left">{mh.tenMonHoc}</td>
                            <td>{mh.soTCLT}</td>
                            <td>{mh.soTCTH}</td>
                            <td>{renderDanhSachDieuKien(mh)}</td>
                            <td>{mh.trangThai}</td>
                        </tr>
                    </>
                );
                var Comp = createComp(mh, i);
                listRow.push(Comp);
            }
            if (listRow.length > 0) return listRow;
        }
        return <></>;
    };

    return (
        <>
            <div className="w-full mt-3 ">
                <div className="flex justify-center text-lg font-bold text-sv-blue-4">Quản lý chương trình khung</div>
                <HeaderQL
                    placeholder="Mã CTK, tên ngành học"
                    onPressSearch={(value) => hanldeSearchCTK(value)}
                    onPressAdd={handleClickOpen}
                    onPressUpdate={handleClickOpenUpdate}
                ></HeaderQL>

                <div style={{}} className=" mt-2 mr-11 ml-10">
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
                                            <th>Mã chương trình khung</th>
                                            <th>Tên chương trình khung</th>
                                            <th>Ngành</th>
                                            <th>Khóa học</th>
                                            <th>Tổng số TC</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {danhSachCTK?.map((item, index) => (
                                            <tr
                                                key={item?.maChuongTrinhKhung}
                                                onClick={() => handleSelectCTK(item)}
                                                className={`${
                                                    selectedCTK.maChuongTrinhKhung === `${item.maChuongTrinhKhung}`
                                                        ? 'bg-orange-200'
                                                        : ''
                                                } hover:cursor-pointer`}
                                            >
                                                <td>
                                                    <input
                                                        type="radio"
                                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                        name="radio-group-mon"
                                                        value={item.maChuongTrinhKhung}
                                                        checked={
                                                            selectedCTK.maChuongTrinhKhung ===
                                                            `${item.maChuongTrinhKhung}`
                                                        }
                                                        onChange={() => handleSelectCTK(item)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                <td>{item.maChuongTrinhKhung}</td>
                                                <td>{item.tenChuongTrinhKhung}</td>
                                                <td>{item.nganhHoc?.tenNganh}</td>
                                                <td>{item.khoaHoc?.tenKhoaHoc}</td>
                                                <td>{item.tongSoTinChi}</td>
                                                <td>{item.trangThai}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="border border-b ml-11 mr-8 mt-4 mb-2"></div>
                    <div className="flex justify-start text-lg font-bold text-sv-blue-4 ml-11">
                        Chi tiết chương trình khung
                    </div>
                    <div style={{}} className={!!selectedCTK ? ' mt-2 mr-11 ml-10' : 'hidden'}>
                        <div className="m-2">
                            <div className="">
                                <table className={cx('table-nganh')}>
                                    <thead className="text-sv-blue-5">
                                        <tr className={cx(' bg-blue-100')}>
                                            <th className={cx('')}>STT</th>
                                            <th className={cx('w-72')}>Tên môn học/học phần</th>
                                            <th className={cx('')}>Mã học phần</th>
                                            <th className={cx('')}>Điều kiện</th>
                                            <th className={cx('')}>Số TC</th>
                                            <th className={cx('')}>Số TC LT</th>
                                            <th className={cx('')}>Số TC TH</th>
                                            <th>Bắt buộc</th>
                                            <th>Chức năng</th>
                                        </tr>
                                    </thead>

                                    {listHocKy?.map((item, index) => (
                                        <tbody key={item.maHocKy + index}>
                                            <tr
                                                className=" bg-blue-100 hover:cursor-pointer font-bold text-sv-blue-5 transition delay-700"
                                                onClick={() => handleDisplay(item.maHocKy)}
                                            >
                                                <td colSpan={4}>{item.tenHocKy}</td>
                                                <td>{item.soTC}</td>
                                                <td colSpan={5}></td>
                                            </tr>

                                            <tr className={display === `${item.maHocKy}` ? ' hidden ' : ''}>
                                                <td colSpan={10}></td>
                                            </tr>
                                            <tr className={display === `${item.maHocKy}` ? ' ' : ' hidden '}>
                                                <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                    Học phần bắt buộc
                                                </td>
                                                <td className="font-bold text-sv-blue-5 "></td>
                                                <td colSpan={3} className="font-bold text-sv-blue-5 "></td>
                                                <td
                                                    className="cursor-pointer"
                                                    onClick={() => handleClickOpenModalMonHoc(item)}
                                                    align="center"
                                                >
                                                    <IoIosAddCircle size={25} color="green"></IoIosAddCircle>
                                                </td>
                                            </tr>
                                            {listHocPhanTheoKhoaHoc?.map((itemSub, indexSub1) =>
                                                itemSub.trangThai === 'Bắt buộc' &&
                                                itemSub.hocKy.maHocKy === item.maHocKy ? (
                                                    <tr
                                                        className={display === `${item.maHocKy}` ? ' ' : ' hidden '}
                                                        key={item + indexSub1 + 'sub'}
                                                    >
                                                        <td>{sttHP++}</td>
                                                        <td align="left">{itemSub.hocPhan.tenHocPhan}</td>
                                                        <td>{itemSub.hocPhan.maHocPhan}</td>
                                                        <td>{renderDanhSachDieuKien(itemSub.hocPhan.monHoc)}</td>
                                                        <td>
                                                            {itemSub.hocPhan.monHoc.soTCLT +
                                                                itemSub.hocPhan.monHoc.soTCTH}
                                                        </td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCLT}</td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCTH}</td>
                                                        <td>{itemSub.trangThai}</td>
                                                        <td align="center" onClick={() => handleRemoveMonHoc(itemSub)}>
                                                            <AiFillCloseCircle
                                                                color="red"
                                                                size={22}
                                                            ></AiFillCloseCircle>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <></>
                                                ),
                                            )}
                                            <tr className={display === `${item.maHocKy}` ? ' ' : ' hidden '}>
                                                <td colSpan={4} className="font-bold text-sv-blue-5 ">
                                                    Học phần tự chọn
                                                </td>
                                                <td className="font-bold text-sv-blue-5 ">{item.soTC}</td>
                                                <td colSpan={3} className="font-bold text-sv-blue-5 "></td>
                                                <td
                                                    className="cursor-pointer"
                                                    onClick={() => handleClickOpenModalMonHocTuChon(item)}
                                                    align="center"
                                                >
                                                    <IoIosAddCircle size={25} color="green"></IoIosAddCircle>
                                                </td>
                                            </tr>
                                            {listHocPhanTheoKhoaHoc?.map((itemSub, indexSub2) =>
                                                itemSub.trangThai === 'Tự chọn' &&
                                                itemSub.hocKy.maHocKy === item.maHocKy ? (
                                                    <tr
                                                        className={display === `${item.maHocKy}` ? ' ' : ' hidden '}
                                                        key={item + indexSub2 + 'sub'}
                                                    >
                                                        <td>{sttHP++}</td>
                                                        <td align="left">{itemSub.hocPhan.tenHocPhan}</td>
                                                        <td>{itemSub.hocPhan.maHocPhan}</td>
                                                        <td>{renderDanhSachDieuKien(itemSub.hocPhan.monHoc)}</td>
                                                        <td>
                                                            {itemSub.hocPhan.monHoc.soTCLT +
                                                                itemSub.hocPhan.monHoc.soTCTH}
                                                        </td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCLT}</td>
                                                        <td>{itemSub.hocPhan.monHoc.soTCTH}</td>
                                                        <td>{itemSub.trangThai}</td>
                                                        <td align="center" onClick={() => handleRemoveMonHoc(itemSub)}>
                                                            <AiFillCloseCircle
                                                                color="red"
                                                                size={22}
                                                            ></AiFillCloseCircle>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <></>
                                                ),
                                            )}
                                        </tbody>
                                    ))}
                                    <tr className="bg-blue-100">
                                        <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                            Tổng số TC yêu cầu
                                        </td>
                                        <td className="font-bold text-red-500 ">{selectedCTK.tongSoTinChi}</td>
                                        <td colSpan={5}></td>
                                    </tr>
                                    <tr className="bg-blue-100">
                                        <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                            Tổng số TC bắt buộc
                                        </td>
                                        <td className="font-bold text-red-500 ">{tongSoTCBB}</td>
                                        <td colSpan={5}></td>
                                    </tr>
                                    <tr className="bg-blue-100">
                                        <td className="font-bold text-sv-blue-5 " colSpan={4}>
                                            Tổng số TC tự chọn
                                        </td>
                                        <td className="font-bold text-red-500 ">
                                            {selectedCTK.tongSoTinChi * 1 - tongSoTCBB * 1}
                                        </td>
                                        <td colSpan={5}></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog fullWidth={'100%'} maxWidth={'100%'} open={open} onClose={handleClose}>
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Thông tin chương trình kung</div>
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
                                    <label htmlFor="">Mã chương trình khung:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Mã chương trình khung"
                                    disabled="true"
                                    value={maCTK}
                                    onChange={(e) => {
                                        setMaCTK(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Tên chương trình khung:</label>
                                </div>
                                <input
                                    type="text"
                                    className="block m-4 p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Tên chương trình khung"
                                    value={tenCTK}
                                    onChange={(e) => {
                                        setTenCTK(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Khóa:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={khoaHoc}
                                        onChange={(e) => setKhoaHoc(e.target.value)}
                                        id="valueKhoaHoc"
                                    >
                                        <option value="Khóa">Khóa</option>
                                        {listKhoaHoc?.map((item, index) => (
                                            <option key={item.maKhoaHoc} value={item.maKhoaHoc}>
                                                {item.tenKhoaHoc}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
                                    <label htmlFor="">Ngành:</label>
                                </div>

                                <div className="flex w-60 border h-9 border-sv-blue-4 rounded-md p-1 m-4">
                                    <select
                                        className=" w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                                        value={nganhHoc}
                                        onChange={(e) => handleNganhHoc(e)}
                                    >
                                        <option value="Khóa">Ngành</option>
                                        {danhSachNganh?.map((item, index) => (
                                            <option key={item.maNganh} value={item.maNganh}>
                                                {item.tenNganh}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-center flex-row items-center w-1/3">
                                <div className="w-32 text-left">
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
                                onClick={handleThemCTK}
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
                <Dialog fullWidth={'100%'} maxWidth={'100%'} open={openModalMonHoc} onClose={handleCloseModalMonHoc}>
                    <div className="w-full flex justify-between mt-5 border-b-2">
                        <div className="text-xl font-bold text-sv-blue-5 pl-2">Chọn môn học cho học kỳ</div>
                        <div>
                            <FaRegWindowClose
                                className="mr-5"
                                size={30}
                                color="#47A9FF"
                                onClick={handleCloseModalMonHoc}
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

                        <div>
                            <div className="flex flex-row  justify-center items-center">
                                <input
                                    type="text"
                                    className="block p-2 pl-4 h-9 caret-sv-blue-4 text-sm w-60 rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic "
                                    placeholder="Nhập mã, tên môn học"
                                    value={valueSearchMH}
                                    onChange={(e) => {
                                        setValueSearchMH(e.target.value);
                                    }}
                                />
                                <div className="ml-6">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<AiOutlineSearch />}
                                        onClick={handleTimKiemMH}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </div>
                            <div className="m-2">
                                <div className="overflow-y-auto max-h-[480px] ">
                                    <table className={cx('table-nganh')} id="data-sv">
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
                                            {listMonHoc
                                                ?.filter(
                                                    (item) =>
                                                        !listHocPhanTheoKhoaHoc?.some(
                                                            (hocPhan) =>
                                                                hocPhan.hocPhan.monHoc.maMonHoc === item.maMonHoc,
                                                        ),
                                                )
                                                .map((item, index) => (
                                                    <tr
                                                        key={item.maMonHoc}
                                                        onClick={() => getAllChecked(item, index)}
                                                        className={`${
                                                            item.isChecked ? 'bg-orange-200' : ''
                                                        } hover:cursor-pointer`}
                                                    >
                                                        <td>
                                                            <div className="flex items-center justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-checkbox h-5 w-5 text-green-500 cursor-pointer"
                                                                    checked={item.isChecked}
                                                                />
                                                            </div>
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

                                            {/* {renderMonHoc()} */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex flex-row justify-center p-3">
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<AiFillSave />}
                                color="success"
                                onClick={handleThemChiTietHK}
                            >
                                Lưu
                            </Button>
                            <div className="ml-6">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    startIcon={<TiCancel />}
                                    onClick={handleCloseModalMonHoc}
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

export default ChuongTrinhKhung;
