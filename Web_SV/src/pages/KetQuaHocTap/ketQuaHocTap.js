import React, { useState, useEffect } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import classNames from 'classnames';
import style from './ketQuaHocTap.scss';
import Menu from '../../components/Menu/menu';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { getHocKyByKhoaHoc } from '../../service/hocKyService';
import { getBangDiemTheoHK, diemTBTheoHK } from '../../service/lopHocPhanService';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function KetQuaHocTap() {
    const [showMenu, setShowMenu] = useState(false); // Sửa giá trị mặc định của showMenu
    const [listDiemTB, setListDiemTB] = useState([]);
    const [diemTB, setDiemTB] = useState([]);
    const [arr, setArr] = useState([]);

    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    //console.log(userLogin);

    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [listHocKy, setListHocKy] = useState([]);

    function Menu1() {
        setShowMenu(!showMenu); // Sửa logic trong hàm Menu1
    }

    useEffect(() => {
        // console.log('cmm');

        const fetchData = async () => {
            const getHocKy = await getHocKyByKhoaHoc(userLogin?.khoaHoc?.maKhoaHoc, accessToken, axiosJWT);
            setListHocKy(getHocKy); // Cập nhật listHocKy với dữ liệu mới

            // Kiểm tra listHocKy khác null hoặc rỗng
            if (getHocKy && getHocKy.length > 0) {
                const promises = getHocKy.map(async (hocKy) => {
                    const getDiemByHK = await getBangDiemTheoHK(
                        userLogin.maSinhVien,
                        hocKy.maHocKy,
                        accessToken,
                        axiosJWT,
                    );
                    console.log(getDiemByHK);
                    const diemFiltered = getDiemByHK.filter(
                        (item) => item.trangThai !== 'Học lại' && item.trangThai !== 'Học cải thiện',
                    );

                    return { hocKy: hocKy.tenHocKy, diem: diemFiltered };
                });

                const results = await Promise.all(promises);
                const bangDiemDaXuatHien = {};
                function removeDuplicateBangDiem(list) {
                    const results = [...list];
                    const bangDiemDaXuatHien = {};

                    // Duyệt qua từng học kỳ trong danh sách
                    for (let i = results.length - 1; i >= 0; i--) {
                        const hocKy = results[i];
                        const diemMoi = [];
                        console.log(results[i]);

                        // Duyệt qua từng bảng điểm trong học kỳ
                        for (let j = 0; j < hocKy.diem.length; j++) {
                            const bangDiem = hocKy.diem[j];

                            // Nếu bảng điểm đã xuất hiện trước đó
                            if (bangDiemDaXuatHien[bangDiem.maBangDiem]) {
                                // Loại bỏ bảng điểm đó khỏi học kỳ hiện tại
                                continue;
                            }

                            // Thêm bảng điểm vào danh sách mới
                            else diemMoi.push(bangDiem);
                            console.log(diemMoi);

                            // Đánh dấu bảng điểm đó đã xuất hiện
                            bangDiemDaXuatHien[bangDiem.maBangDiem] = true;
                        }

                        // Cập nhật danh sách bảng điểm của học kỳ
                        hocKy.diem = diemMoi;
                    }

                    return results;
                }
                console.log(removeDuplicateBangDiem(results));
                setArr(results);
            }
        };
        if (!!userLogin) fetchData();
    }, [userLogin]);
    console.log(arr);

    // useEffect(() => {
    //     const diem = async () => {
    //         // Kiểm tra listHocKy khác null hoặc rỗng
    //         if (listHocKy && listHocKy.length > 0) {
    //             // Sử dụng Promise.all để đợi tất cả các hàm lấy dữ liệu từ API hoàn thành
    //             const diemTB = await Promise.all(
    //                 listHocKy.map(async (hocKy) => {
    //                     const diemTBByHK = await diemTBTheoHK(
    //                         userLogin.maSinhVien,
    //                         hocKy.maHocKy,
    //                         accessToken,
    //                         axiosJWT,
    //                     );
    //                     return { hocKy: hocKy.tenHocKy, diem: diemTBByHK || 0 };
    //                 }),
    //             );

    //             // Cập nhật giá trị mới cho biến địa phương diemTB
    //             setDiemTB(diemTB);
    //         }
    //     };
    //     diem();
    // }, [listHocKy]); // Giám sát listHocKy để gọi lại diem() khi listHocKy thay đổi

    // useEffect(() => {
    //     // Cập nhật giá trị của listDiemTB khi diemTB thay đổi
    //     setListDiemTB(diemTB);
    // }, [diemTB]); // Giám sát diemTB để cập nhật listDiemTB khi diem

    // console.log(listDiemTB);
    const tinhDiemTrungBinh = (danhSachDiem) => {
        let tongDiemTinChi = 0;
        let tongSoTinChi = 0;

        danhSachDiem?.forEach((diem) => {
            tongDiemTinChi += diem.diemTongKet * (diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH);
            tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
        });

        if (tongSoTinChi === 0) {
            return 0; // Tránh chia cho 0
        }

        return (tongDiemTinChi / tongSoTinChi).toFixed(2);
    };

    const tinhDiemTrungBinhTatCaHocKy = (arr, index) => {
        let tongDiemTinChi = 0;
        let tongSoTinChi = 0;

        // Duyệt qua từng học kỳ trong danh sách môn học
        for (let i = 0; i <= index; i++) {
            const danhSachDiem = arr[i]?.diem;

            for (let diem of danhSachDiem) {
                // Duyệt qua từng điểm trong danh sách điểm của học kỳ đang xét

                tongDiemTinChi += diem.diemTongKet * (diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH);
                tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
            }
        }

        if (tongSoTinChi === 0) {
            return 0; // Tránh chia cho 0
        }

        return (tongDiemTinChi / tongSoTinChi).toFixed(2);
    };

    const tongSoTinChiDaDangKy = (arr, index) => {
        let tongSoTinChi = 0;

        // Duyệt qua từng học kỳ trong danh sách môn học
        for (let i = 0; i <= index; i++) {
            const danhSachDiem = arr[i]?.diem;
            console.log(danhSachDiem);
            for (let diem of danhSachDiem) {
                // Duyệt qua từng điểm trong danh sách điểm của học kỳ đang xét

                tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
            }
        }

        return tongSoTinChi;
    };
    const tongSoTinChiTichLuy = (arr, index) => {
        let tongSoTinChi = 0;
        if (arr.length > 0) {
            // Duyệt qua từng học kỳ trong danh sách môn học
            for (let i = 0; i <= index; i++) {
                const danhSachDiem = arr[i]?.diem;
                console.log(danhSachDiem);

                for (let diem of danhSachDiem) {
                    // Duyệt qua từng điểm trong danh sách điểm của học kỳ đang xét
                    if (diem.trangThai === 'Đạt')
                        tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
                }
            }
        }
        return tongSoTinChi;
    };

    const tongSoTinChiKhongDat = (arr, index) => {
        let tongSoTinChi = 0;
        if (arr.length > 0) {
            // Duyệt qua từng học kỳ trong danh sách môn học
            for (let i = 0; i <= index; i++) {
                const danhSachDiem = arr[i]?.diem;
                console.log(danhSachDiem);

                for (let diem of danhSachDiem) {
                    // Duyệt qua từng điểm trong danh sách điểm của học kỳ đang xét
                    if (diem.trangThai === 'Không đạt')
                        tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
                }
            }
        }
        return tongSoTinChi;
    };
    const tongTinChiDatTrongHK = (danhSachDiem) => {
        let tongSoTinChi = 0;

        danhSachDiem?.forEach((diem) => {
            if (diem.trangThai === 'Đạt') {
                tongSoTinChi += diem.hocPhan.monHoc.soTCLT + diem.hocPhan.monHoc.soTCTH;
            }
        });

        return tongSoTinChi;
    };

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
    function xepLoaiBangDiem(diemHe10) {
        if (diemHe10 >= 9) {
            return 'Xuất sắc';
        } else if (diemHe10 >= 8) {
            return 'Giỏi';
        } else if (diemHe10 >= 6.5) {
            return 'Khá';
        } else if (diemHe10 >= 5) {
            return 'Trung bình';
        } else if (diemHe10 >= 4) {
            return 'TB yếu';
        } else return 'Yếu';
    }

    console.log(listHocKy);
    const listDiem = [
        {
            TK1: '3.0',
            TK: '4.0',
            CK: '8.0',
        },
    ];

    return (
        <>
            <div className="w-full  bg-slate-300 p-3">
                <div className=" flex flex-col w-full  h-full bg-white  border rounded ">
                    <div className="w-auto">
                        <h1 className="text-2xl text-sv-text-2 font-bold border-b-2 ml-2  h-10">Kết quả học tập</h1>
                    </div>
                    <Scrollbar className="w-full, h-60">
                        <table className={cx('table-kqht mt-2 pr-3')}>
                            <thead className="bg-gray-200  text-sv-blue-5 border">
                                <tr className="bg-gray-200 border border-sv-blue-5">
                                    <th rowSpan={3} className="border border-sv-blue-4">
                                        STT
                                    </th>
                                    <th
                                        rowSpan={3}
                                        className="px-14 py-1 whitespace-nowrap text-ellipsis border border-sv-blue-4"
                                    >
                                        Mã lớp học phần
                                    </th>
                                    <th
                                        rowSpan={6}
                                        className=" px-14 border  whitespace-nowrap text-ellipsis border-sv-blue-4"
                                    >
                                        Tên môn học/Học phần
                                    </th>
                                    <th rowSpan={3} className="w-14 border border-sv-blue-4">
                                        Số tín chỉ
                                    </th>
                                    <th colSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        Giữa kỳ
                                    </th>
                                    <th colSpan={5} className="px-4 py-1 border border-sv-blue-4">
                                        Thường xuyên
                                    </th>
                                    <th colSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Thực hành
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        TBQT
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Cuối kỳ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Điểm tổng kết
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Thang điểm 4
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Điểm chữ
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Xếp loại
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-2 border border-sv-blue-4">
                                        Ghi chú
                                    </th>
                                    <th colSpan={1} rowSpan={3} className="px-4 py-1 border border-sv-blue-4">
                                        Đạt
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className=" border border-sv-blue-4">
                                        Chuyên cần
                                    </th>
                                    <th rowSpan={1} colSpan={5} className=" border border-sv-blue-4">
                                        LT Hệ số 1
                                    </th>
                                    <th rowSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        3
                                    </th>
                                </tr>
                                <tr>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        1
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        2
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        3
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        4
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        5
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr.map((item, index) => (
                                    <>
                                        <tr key={item.hocKy} className="bg-slate-300">
                                            <td colSpan={22} className="font-bold text-sv-blue-5 ">
                                                {item.hocKy}
                                            </td>
                                        </tr>
                                        {item.diem.map((i, index1) => (
                                            <tr className="bg-white">
                                                <td className="text-center">1</td>
                                                <td className="text-center">{i.hocPhan.maHocPhan}</td>
                                                <td className=" border max-w-md whitespace-nowrap text-ellipsis">
                                                    {i.hocPhan.tenHocPhan}
                                                </td>
                                                <td className=" text-center  px-4">
                                                    {' '}
                                                    {i.hocPhan.monHoc.soTCLT + i.hocPhan.monHoc.soTCTH}
                                                </td>

                                                <td
                                                    className={
                                                        `${i.giuaKy}` <= 5
                                                            ? 'text-red-500  text-center'
                                                            : 'text-center text-black'
                                                    }
                                                >
                                                    {i?.giuaKy}
                                                </td>
                                                <td className="text-center"></td>
                                                <td className="text-center">{i?.thuongKy1}</td>
                                                <td className="text-center">{i?.thuongKy2}</td>
                                                <td className="text-center">{i?.thuongKy3}</td>
                                                <td className="text-center">{i?.thuongKy4}</td>

                                                <td className="text-center">{i?.thuongKy5}</td>
                                                <td className="text-center">{i?.thucHanh1}</td>
                                                <td className="text-center">{i?.thucHanh2}</td>
                                                <td className="text-center">{i?.thucHanh3}</td>
                                                <td className="text-center"></td>
                                                <td className="text-center">{i?.cuoiKy}</td>
                                                <td className="text-center">{i.diemTongKet}</td>
                                                <td className="text-center">
                                                    {!!i?.diemTongKet || i?.diemTongKet === 0
                                                        ? chuyenDoiDiemHe10SangHe4(i?.diemTongKet)
                                                        : ''}
                                                </td>
                                                <td className="text-center">
                                                    {i.diemTongKet || i?.diemTongKet === 0
                                                        ? chuyenDoiDiemHe10SangHe4Chu(i.diemTongKet)
                                                        : ''}
                                                </td>
                                                <td className="text-center">
                                                    {i.diemTongKet || i?.diemTongKet === 0
                                                        ? xepLoaiBangDiem(i.diemTongKet)
                                                        : ''}
                                                </td>
                                                <td className="text-center"></td>
                                                <td className="text-center">
                                                    {i.diemTongKet >= 4 ? (
                                                        <BsFillCheckCircleFill color="green" size={18} />
                                                    ) : (
                                                        <AiFillCloseCircle color="red" size={21} />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}

                                        {item.diem.some((diem) => diem.diemTongKet) ? (
                                            <>
                                                <tr>
                                                    <td colSpan={2}>
                                                        Điểm trung bình học kỳ hệ 10:{' '}
                                                        {tinhDiemTrungBinh(arr[index]?.diem)}
                                                    </td>
                                                    <td>
                                                        Điểm trung bình học kỳ hệ 4:{' '}
                                                        {chuyenDoiDiemHe10SangHe4(tinhDiemTrungBinh(arr[index]?.diem))}
                                                    </td>
                                                    <td colSpan={19}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        Điểm trung bình tích lũy:{' '}
                                                        {tinhDiemTrungBinhTatCaHocKy(arr, index)}
                                                    </td>
                                                    <td>
                                                        Điểm trung bình tích lũy hệ 4:{' '}
                                                        {chuyenDoiDiemHe10SangHe4(
                                                            tinhDiemTrungBinhTatCaHocKy(arr, index),
                                                        )}
                                                    </td>
                                                    <td colSpan={19}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        Tổng số tín chỉ đã đăng ký: {tongSoTinChiDaDangKy(arr, index)}
                                                    </td>
                                                    <td>Tổng số tín chỉ tích lũy: {tongSoTinChiTichLuy(arr, index)}</td>
                                                    <td colSpan={19}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        Tổng số tín đạt: {tongTinChiDatTrongHK(arr[index]?.diem)}
                                                    </td>
                                                    <td>
                                                        Tổng số tín chỉ nợ tính đến hiện tại:{' '}
                                                        {tongSoTinChiKhongDat(arr, index)}
                                                    </td>
                                                    <td colSpan={19}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2}>
                                                        Xếp loại học lực tích lũy:{' '}
                                                        {xepLoaiBangDiem(tinhDiemTrungBinhTatCaHocKy(arr, index))}
                                                    </td>
                                                    <td>
                                                        Xếp loại học lực học kỳ:{' '}
                                                        {xepLoaiBangDiem(tinhDiemTrungBinh(arr[index]?.diem))}
                                                    </td>
                                                    <td colSpan={19}></td>
                                                </tr>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </div>
        </>
    );
}

export default KetQuaHocTap;
