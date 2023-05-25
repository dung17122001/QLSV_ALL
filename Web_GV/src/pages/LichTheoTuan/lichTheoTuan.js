import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import React, { useState, useEffect } from 'react';
import MenuItem from '../../components/ItemMenu';
import ItemLichHoc from '../../components/ItemLichHoc';
import classNames from 'classnames';
import style from './lichTheoTuan.scss';
import Button from '@mui/material/Button';
import Menu from '../../components/Menu/menu';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getLichTheoThoiGian } from '~/services/lichService';

const cx = classNames.bind(style);

function LichTheoTuan() {
    var currGV = useSelector((state) => state.persistedReducer.signIn.userLogin);
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData?.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);

    const [selectedValue, setSelectedValue] = useState('all');
    const [currentDate, setCurrentDate] = useState(moment());
    const [listLich, setListLich] = useState([]);
    const [listLichAll, setListLichAll] = useState([]); //dùng để lọc loại lịch
    const [date, setDate] = useState(currentDate.format('YYYY-MM-DD'));
    const handleRadioButtonChange = (event) => {
        setSelectedValue(event.target.value);
        setSelectedValue(event.target.value);
        //console.log(event.target.value);
        let temp = [...listLichAll];

        if (event.target.value === 'Lịch thi') {
            let result = temp.filter((e) => e.trangThai === 'Lịch thi');
            setListLich(result);
            return;
        }
        if (event.target.value === 'Lịch học') {
            let result = temp.filter((e) => e.trangThai !== 'Lịch thi');
            setListLich(result);
            return;
        } else setListLich(temp);
        return;
    };

    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //Tháng trong javascript bắt đầu từ 0
    // var yyyy = today.getFullYear();

    // today = yyyy + '-' + dd + '-' + mm;

    // const [date, setDate] = useState(today);

    //console.log(date);
    //console.log(currentDate);

    const handleDateChange = (e) => {
        //setDate(event.target.value);
        const newDate = e.target.value;
        setDate(newDate);
        setCurrentDate(moment(newDate, 'YYYY-MM-DD'));
    };
    const [week, setWeek] = useState([]);
    useEffect(() => {
        // const selectedDate = moment(date);
        // const selectedWeek = selectedDate.isoWeek();
        // const selectedYear = selectedDate.isoWeekYear();
        // const startOfWeek = moment().isoWeek(selectedWeek).isoWeekYear(selectedYear).startOf('isoWeek');
        // const endOfWeek = moment().isoWeek(selectedWeek).isoWeekYear(selectedYear).endOf('isoWeek');

        const startOfWeek = currentDate.clone().isoWeekday(1).startOf('day'); // Lấy ngày bắt đầu tuần từ thứ 2
        const endOfWeek = currentDate.clone().isoWeekday(7).endOf('day'); // Lấy ngày kết thúc tuần là chủ nhật
        const days = [];
        for (let i = 0; i <= 6; i++) {
            const day = startOfWeek.clone().add(i, 'day'); // Thêm các ngày trong tuần vào mảng days
            moment.locale('vi'); // đặt locale cho tiếng Việt

            const dayStr = day.format('dddd DD/MM/YYYY '); // hiển thị thứ bằng tiếng Việt

            days.push(dayStr); // Thêm ngày đã format vào mảng days
        }
        setWeek(days);
        // Lấy ngày đầu tiên của mảng
        const firstDay = moment(days[0], 'dddd DD/MM/YYYY').format('YYYY-MM-DD');

        // Lấy ngày cuối cùng của mảng
        const lastDay = moment(days[days.length - 1], 'dddd DD/MM/YYYY').format('YYYY-MM-DD');
        // console.log(firstDay);
        // console.log(lastDay);
        const getAllLich = async () => {
            let resultLich = await getLichTheoThoiGian(currGV?.maNhanVien, firstDay, lastDay, accessToken, axiosJWT);
            //console.log(resultLich);
            if (!!resultLich) {
                setListLich(resultLich);
                setListLichAll(resultLich);
            }
        };
        getAllLich();
    }, [currentDate]);

    // console.log(week);
    // console.log(listLich);
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const handleNextWeek = () => {
        const nextWeek = currentDate.clone().add(1, 'week');
        setCurrentDate(nextWeek);
        //setReloadNgay(!reloadNgay);
    };
    const handleDownWeek = () => {
        const previousWeek = currentDate.clone().subtract(1, 'week');
        setCurrentDate(previousWeek);
    };
    const getDayOfWeek = (date) => {
        const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const dayIndex = new Date(date).getDay();
        return daysOfWeek[dayIndex];
    };

    function filterLichHocByThuCa(lichHoc, thu) {
        let ca = 0;
        switch (thu) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                ca = 6;
                break;
            case 6:
                ca = 12;
                break;
            case 7:
                ca = 18;
                break;
            default:
                break;
        }

        return lichHoc.filter((item) => {
            const startTiet = parseInt(item.tiet.split(' - ')[0], 10);
            const endTiet = parseInt(item.tiet.split(' - ')[1], 10);
            const startCa = Math.floor(startTiet / 2) + 1;
            const endCa = Math.floor((endTiet - 1) / 2) + 1;
            return endCa >= ca && startCa < ca + 6;
        });
    }

    function layTietHoc(chuoiTiet) {
        const matches = chuoiTiet.match(/\d+/g);
        if (matches === null || matches.length !== 2) {
            return null; // hoặc giá trị mặc định khác
        }
        const soTiet = parseInt(matches[1]) - parseInt(matches[0]) + 1;
        return soTiet;
    }

    //console.log(layTietHoc('Tiết 1-3')); // kết quả là 3

    //console.log(layTietHoc('Tiết 1-3'));
    //console.log(listLich);
    return (
        <div className="flex flex-row w-full  bg-gray-100 pt-3 ">
            <div className="w-1/12 h-full"></div>
            <div className="w-10/12 h-full flex flex-row">
                <div className="w-1/6 h-min bg-white">
                    <Menu />
                </div>
                <div className="w-5/6 h-min bg-white ml-4">
                    <div className="text-xl font-bold text-sv-blue-5 pt-3 pl-2">Lịch dạy, lịch coi thi theo tuần</div>
                    <div className="flex flex-row items-center justify-center">
                        <div className="">
                            <div className="flex flex-row text-sm">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="Bình thường"
                                        checked={selectedValue === 'Bình thường'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Tất cả</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="Lịch học"
                                        checked={selectedValue === 'Lịch học'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Lịch dạy</span>
                                </label>
                                <label className="inline-flex items-center ml-4">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        name="radio-group"
                                        value="Lịch thi"
                                        checked={selectedValue === 'Lịch thi'}
                                        onChange={handleRadioButtonChange}
                                    />
                                    <span className="ml-1">Lịch thi</span>
                                </label>
                                <div className="relative border border-gray-400 ml-2">
                                    <input
                                        type="date"
                                        className="form-input block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none 
                                        focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        value={currentDate.format('YYYY-MM-DD')}
                                        onChange={handleDateChange}
                                    />
                                </div>

                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small" onClick={handleDownWeek}>
                                        <AiOutlineLeft />
                                        Trở lại
                                    </Button>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small" onClick={() => setCurrentDate(moment())}>
                                        Hiện tại
                                    </Button>
                                </div>
                                <div className="ml-4 flex items-center">
                                    <Button variant="contained" size="small" onClick={handleNextWeek}>
                                        Tiếp
                                        <AiOutlineRight></AiOutlineRight>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 m-2"></div>
                    <div className="m-2">
                        <div className="">
                            <table className={cx('table')}>
                                <thead className="text-sv-blue-5">
                                    <tr>
                                        <th>Ca học</th>
                                        {week.map((day, index) => (
                                            <th key={index}>{capitalizeFirstLetter(day)}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className={cx('row-ca ')}>Sáng</td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ hai' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ ba' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ tư' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ năm' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ sáu' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ bảy' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Chủ nhật' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 7
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={cx('row-ca ')}>Chiều</td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ hai' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ ba' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ tư' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ năm' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ 6' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ 7' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Chủ nhật' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) < 13 &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 6
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={cx('row-ca ')}>Tối</td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ hai' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ ba' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ tư' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ năm' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ sáu' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Thứ bảy' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                        <td>
                                            {listLich
                                                ?.filter((lich) => {
                                                    return (
                                                        getDayOfWeek(lich.ngayHoc) === 'Chủ nhât' &&
                                                        layTietHoc(lich.caHoc.tenCaHoc) > 12
                                                    );
                                                })
                                                .map((item, index) => {
                                                    return (
                                                        <ItemLichHoc
                                                            key={item.maLich}
                                                            mon={item.nhomThucHanh.lopHocPhan.hocPhan.tenHocPhan}
                                                            lop={`${item.nhomThucHanh.lopHocPhan.tenLopHocPhan} - ${item.nhomThucHanh.lopHocPhan.maLopHocPhan}`}
                                                            tiet={item.caHoc.tenCaHoc}
                                                            phong={'Phòng: ' + item.phong.tenPhong}
                                                            maLich={'Mã lịch: ' + item.maLich}
                                                            type={item.trangThai}
                                                        />
                                                    );
                                                })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="ghichu flex flex-row p-2 item-center">
                        <div className="ml-2 h-4 flex items-center">
                            <b>Ghi chú</b>
                        </div>
                        <div className="h-4 w-10 bg-blue-200 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch học</p>
                        </div>
                        <div className="h-4 w-10 bg-orange-300 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch thi</p>
                        </div>
                        <div className="h-4 w-10 bg-blue-400 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Lịch trực tuyến</p>
                        </div>
                        <div className="h-4 w-10 bg-red-400 ml-4"></div>
                        <div className="ml-2 h-4 flex items-center">
                            <p>Tạm ngưng</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/12 h-full"></div>
        </div>
    );
}

export default LichTheoTuan;
