import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import iuh from './../../images/iuh.jpg';
import { FaCalendarAlt, FaCalendarCheck, FaRegChartBar, FaBuffer, FaList, FaAlignJustify } from 'react-icons/fa';
import ItemMenuHome from '../../components/ItemMenuHome';
import { useState, useEffect } from 'react';
import config from '../../configRoutes';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Menu from '../../components/Menu/menu';
import style from './home.scss';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getHocPhanTheoHocKy } from '../../service/hocPhanService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import { getBangDiemDat } from '../../service/lopHocPhanService';
import { getCTKByMaSV } from '../../service/hocPhanService';
import {
    getPhieuDKByHocKyMaSinhVien,
    themPhieuDangKy,
    themChiTietPhieuDangKy,
    getChiTietPhieuDKByHocKyAndSinhVien,
} from '../../service/phieuDKHP';
import BieuDo from '../../components/BieuDo/bieuDo';

ChartJS.register(ArcElement, Tooltip, Legend);
function Home() {
    const cx = classNames.bind(style);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    const userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listHK, setListHK] = useState([]);
    const [listDaDK, setListDaDK] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [listLopHocPhanByHK, setListHocPhanByHK] = useState([]);
    const [cTK, setCTK] = useState([]);
    const [selectedHK, setSelectedHK] = useState('');
    // Kích thước của biểu đồ

    useEffect(() => {
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!userLogin.khoaHoc) {
                    const startYear = userLogin.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = userLogin.khoaHoc?.tenKhoaHoc.substring(5) * 1 + 2;
                    var list = await getHocKyTheoKhoaHoc(
                        `${startYear}-08-01`,
                        `${endYear}-06-01`,
                        accessToken,
                        axiosJWT,
                    );
                    //console.log(list);
                    setListHK(list);
                    if (!!list) setSelectedHK(list[0]?.maHocKy);
                }
            } catch (error) {
                console.log(error);
            }
        };
        const getCTK = async () => {
            const getCTKTheoSV = await getCTKByMaSV(userLogin.maSinhVien, accessToken, axiosJWT);
            setCTK(getCTKTheoSV);
        };
        getHocKyByKhoaHoc();
        getCTK();
    }, [userLogin]);

    //console.log(selectedHK);
    useEffect(() => {
        const getLopHocPhanByHK = async () => {
            let getLopHocByHK = await getChiTietPhieuDKByHocKyAndSinhVien(
                userLogin.maSinhVien,
                selectedHK,
                accessToken,
                axiosJWT,
            );
            //console.log(getLopHocByHK);
            const uniqueListHP = getLopHocByHK.filter((item, index, self) => {
                return (
                    item.nhomThucHanh.tenNhom === 'Nhóm 0' && // Thêm điều kiện chỉ lấy nhóm thực hành có tenNhom là 'Nhóm 0'
                    self.findIndex(
                        (i) =>
                            i.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan ===
                            item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan,
                    ) === index
                );
            });
            setListHocPhanByHK(uniqueListHP);
        };
        getLopHocPhanByHK();
    }, [selectedHK]);
    //console.log(listLopHocPhanByHK);
    const [arr, setArr] = useState([]);
    useEffect(() => {
        const bangDiemDat = async () => {
            const listBangDiemDat = await getBangDiemDat(userLogin.maSinhVien, accessToken, axiosJWT);
            setArr(listBangDiemDat);
        };
        bangDiemDat();
    }, [userLogin]);
    const TCDaHoc = () => {
        let tinChiDat = 0;
        for (let i = 0; i < arr.length; i++) {
            tinChiDat =
                tinChiDat +
                (arr[i].hocPhan.monHoc.soTCLT ? arr[i].hocPhan.monHoc.soTCLT : 0) +
                (arr[i].hocPhan.monHoc.soTCTH ? arr[i].hocPhan.monHoc.soTCTH : 0);
        }

        return tinChiDat;
    };
    //console.log(TCDaHoc());
    const dataTinChi = {
        labels: ['Số tín chỉ còn lại', 'Số tín chỉ đã học'],
        datasets: [
            {
                label: 'Số tín chỉ',
                data: [!!cTK && cTK[0]?.tongSoTinChi - TCDaHoc(), TCDaHoc()],
                backgroundColor: ['#01BAF2', '#71BF45'],
                // borderColor: ['green', 'blue'],
            },
        ],
    };

    const navigate = useNavigate();

    const handleChangeHK = (event) => {
        setSelectedHK(event.target.value);
    };
    const handleKetQuaHocTap = async () => {
        navigate(config.routeConfig.ketQuaHocTap);
    };

    function Menu1() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
    }

    return (
        <>
            <div className={cx('flex w-full h-max justify-start bg-slate-300')}>
                <div className="w-1/12 ">
                    <span className="w-1/12 mt-10 ">
                        <div className="p-2">
                            {' '}
                            <FaAlignJustify size={25} onClick={Menu1} />
                        </div>
                        <div className={showMenu ? '' : 'hidden'}>
                            <span className="w-52 absolute  border border-sv-blue-4 bg-white">
                                <Menu />
                            </span>
                        </div>
                    </span>
                </div>
                <div className=" flex flex-col w-10/12 h-full">
                    <div className=" flex flex-row">
                        <div className="w-2/3 p-5">
                            <div className="w-full bg-white h-60   border rounded ">
                                <div>
                                    {' '}
                                    <h1 className="text-2xl text-sv-text-2 font-bold shadow-sm ml-2  h-10">
                                        Thông tin sinh viên
                                    </h1>
                                </div>
                                <div className=" flex flex-row w-full mt-2">
                                    <div className="w-2/3 flex ">
                                        <div className="w-1/3 flex flex-col items-center mt-2 ">
                                            <div className="w-28 h-28  rounded-full border border-blue-500">
                                                <img
                                                    src={(!!userLogin && userLogin?.linkAnh) || logo_iuh}
                                                    alt="avatar"
                                                    className={cx('h-28 w-28 rounded-full')}
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className="text-sv-blue-4 text-xs mt-2 cursor-pointer"
                                                    onClick={() => navigate(config.routeConfig.thongTinSinhVien)}
                                                >
                                                    Xem chi tiết
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-2/3 mt-2">
                                            <div className="flex flex-row text-xs">
                                                <p className="mr-2 text-sv-text-1 ">MSSV:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.maSinhVien}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4 ">
                                                <p className="mr-2  w-auto text-sv-text-1 ">Họ tên:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.tenSinhVien}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Giới tính:</p>
                                                <p className="text-sv-text-2 font-bold">
                                                    {userLogin?.gioiTinh ? 'Nam' : 'Nữ'}
                                                </p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Ngày sinh:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.ngaySinh}</p>
                                            </div>
                                            <div className="flex flex-row text-xs mt-4">
                                                <p className="mr-2 text-sv-text-1 ">Nơi sinh:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.noiSinh}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/3 ">
                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Lớp học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.lopHoc.tenLop}</p>
                                        </div>
                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Khóa học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.khoaHoc.tenKhoaHoc}</p>
                                        </div>

                                        <div className="flex flex-row text-xs mt-4">
                                            <p className="mr-2 text-sv-text-1 ">Ngành:</p>
                                            <p className="text-sv-text-2 font-bold">
                                                {userLogin?.lopHoc.nganhHoc.tenNganh}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col w-1/3 mt-5 h-60">
                            <div className="h-1/2 pb-2">
                                <div className="h-full  p-2 flex bg-sv-blue-2 d border border-sv-blue-4 rounded ">
                                    <div
                                        className="flex flex-col w-full cursor-pointer "
                                        onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                    >
                                        <p className="ml-4 text-sv-blue-4 text-sm">Lịch học trong tuần</p>
                                        <p className="p-4 text-6xl text-sv-blue-4 ">0</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-10 h-10 p-2 flex justify-center items-center bg-sv-blue-2 d border border-sv-blue-4 rounded-full">
                                            <FaCalendarAlt color="#47A9FF" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-1/2  p-2 flex bg-sv-yellow-1 d border border-sv-yellow-2 rounded ">
                                <div
                                    className="flex flex-col w-full cursor-pointer"
                                    onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                >
                                    <p className="ml-4 text-sv-yellow-2 text-sm">Lịch thi trong tuần</p>
                                    <p className="p-4 text-6xl text-sv-yellow-2 ">0</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-10 h-10 p-2 flex justify-center items-center bg-sv-yellow-1 d border border-sv-yellow-2 rounded-full">
                                        <FaCalendarCheck color="#CD853F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex h-full ">
                        <div className="w-2/3 pl-5 pr-5 pb-2 ">
                            <div className="">
                                <div className=" flex w-full justify-between">
                                    <ItemMenuHome
                                        Icon={<FaCalendarAlt color="#47A9FF" size={30} />}
                                        NameMenu="Lịch theo tuần"
                                        onClick={() => navigate(config.routeConfig.lichTheoTuan)}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaRegChartBar color="#47A9FF" size={30} />}
                                        NameMenu="Kết quả học tập "
                                        onClick={handleKetQuaHocTap}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaBuffer color="#47A9FF" size={30} />}
                                        NameMenu="Đăng ký học phần "
                                        onClick={() => navigate(config.routeConfig.dangKyHP)}
                                    ></ItemMenuHome>
                                    <ItemMenuHome
                                        Icon={<FaList color="#47A9FF" size={30} />}
                                        NameMenu="Lịch theo tiến độ "
                                        onClick={() => navigate(config.routeConfig.lichTheoTienDo)}
                                    ></ItemMenuHome>
                                </div>
                            </div>
                            <div className="flex h-80 mt-3">
                                <div className="w-8/12 pr-3 ">
                                    <div className="h-full pl-0 p-2 flex bg-white d border  rounded ">
                                        <div className="w-full  mr-3">
                                            <div className="flex justify-between items-center mr-7 h-10  border-b-2">
                                                <div>
                                                    {' '}
                                                    <h1 className="text-xl ml-2 flex text-sv-text-2 font-bold  ">
                                                        Kết quả học tập
                                                    </h1>
                                                </div>
                                                <div className="flex items-center border  border-sv-blue-4 rounded">
                                                    <select
                                                        className="text-sv-text-2 border  border-sv-blue-4 "
                                                        value={selectedHK}
                                                        onChange={handleChangeHK}
                                                    >
                                                        {listHK?.map((option) => (
                                                            <option key={option.maHocKy} value={option.maHocKy}>
                                                                {option.tenHocKy}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="ml-0">
                                                <BieuDo hocKy={selectedHK} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-4/12 ">
                                    <div className="h-80 mb-20 p-2 flex bg-white d border  rounded">
                                        <div className="w-full  mr-3">
                                            <div className="flex justify-between items-center  h-10  border-b-2">
                                                <div>
                                                    {' '}
                                                    <h1 className="text-xl flex text-sv-text-2 font-bold  ">
                                                        Tiến độ học tập
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="w-full h-64">
                                                <Doughnut data={dataTinChi} />
                                                <div className="text-center">
                                                    {TCDaHoc() + '/' + cTK[0]?.tongSoTinChi}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 pb-2 ">
                            <div className="flex h-full  bg-white d border border-white rounded">
                                <div className="w-full ml-3 mr-3 ">
                                    <div className="flex justify-between items-center  h-10  border-b-2">
                                        <div>
                                            {' '}
                                            <h1 className="text-xl flex text-sv-text-2 font-bold  ">Lớp học phần</h1>
                                        </div>
                                        <div className="flex items-center border  border-sv-blue-4 rounded">
                                            <select
                                                className="text-sv-text-2 border  border-sv-blue-4 "
                                                value={selectedHK}
                                                onChange={handleChangeHK}
                                            >
                                                {listHK?.map((option) => (
                                                    <option key={option.maHocKy} value={option.maHocKy}>
                                                        {option.tenHocKy}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-row justify-between text-sm mt-3 text-sv-text-1">
                                        <div>Môn học/Học phần</div>
                                        <div>Tín chỉ</div>
                                    </div>
                                    {listLopHocPhanByHK?.map((item, index) => (
                                        <div className="w-full flex flex-row border-t-2 text-sm mt-3 text-sv-text-1">
                                            <div className="w-10/12">
                                                <div className="text-sv-blue-4 font-bold">
                                                    {item.nhomThucHanh.lopHocPhan.hocPhan.maHocPhan}
                                                </div>
                                                <div>{item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}</div>
                                            </div>
                                            <div className="w-2/12 flex justify-center items-center">
                                                <p>
                                                    {item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCLT +
                                                        item.nhomThucHanh.lopHocPhan.hocPhan.monHoc.soTCTH}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/12"></div>
            </div>
        </>
    );
}

export default Home;
