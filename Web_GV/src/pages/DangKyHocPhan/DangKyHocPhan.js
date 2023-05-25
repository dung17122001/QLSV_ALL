import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import classNames from 'classnames';
import style from './DangKyHocPhan.scss';
import Button from '@mui/material/Button';

const cx = classNames.bind(style);

function DangKyHocPhan() {
    const options = ['HK1 (2021-2022)', 'HK2 (2021-2022)', 'HK3 (2021-2022)'];
    const listMon = [
        {
            maHP: 87464474,
            tenMon: 'Khóa luận tốt ngiệp',
            soTC: 4,
            batBuoc: true,
            dieuKien: [
                { maMon: '3432', type: 'a' },
                { maMon: '3432', type: 'a' },
            ],
        },
        {
            maHP: 8575844,
            tenMon: 'Thực tập danh nghiệp',
            soTC: 4,
            batBuoc: false,
            dieuKien: [{ maMon: '3432', type: 'a' }],
        },
    ];
    const listLop = [
        {
            maHP: 8746994474,
            tenLopHP: 'Khóa luận tốt ngiệp',
            lopDuKien: 'DHKTPM15A',
            siSoToiDa: 70,
            siSoDK: 62,
            trangThai: 'Chờ sinh viên đăng ký',
        },
        {
            maHP: 8749964474,
            tenLopHP: 'Khóa luận tốt ngiệp',
            lopDuKien: 'DHKTPM15B',
            siSoToiDa: 80,
            siSoDK: 22,
            trangThai: 'Chờ sinh viên đăng ký',
        },
    ];

    const listLichHoc = [
        {
            maLopHP: '48474747449',
            lichHoc: 'LT - Thứ 4 (T7-T9)',
            nhomTH: '',
            phong: 'A2.03',
            dayNha: 'A',
            giangVien: 'Ths Nguyễn Thị Lan',
            thoiGian: '2/2/2022 - 5/5/2022',
            type: 'LT',
        },
        {
            maLopHP: '4847476747449',
            lichHoc: 'TH - Thứ 4 (T7-T9)',
            nhomTH: '1',
            phong: 'A2.03',
            dayNha: 'A',
            giangVien: 'Ths Nguyễn Thị Lan',
            thoiGian: '2/2/2022 - 5/5/2022',
            type: 'TH',
        },
        {
            maLopHP: '4847476747449',
            lichHoc: 'TH - Thứ 4 (T7-T9)',
            nhomTH: '2',
            phong: 'A2.03',
            dayNha: 'A',
            giangVien: 'Ths Nguyễn Thị Lan',
            thoiGian: '2/2/2022 - 5/5/2022',
            type: 'TH',
        },
        {
            maLopHP: '4847476747449',
            lichHoc: 'LT - Thứ 4 (T7-T9)',
            nhomTH: '3',
            phong: 'A2.03',
            dayNha: 'A',
            giangVien: 'Ths Nguyễn Thị Lan',
            thoiGian: '2/2/2022 - 5/5/2022',
            type: 'TH',
        },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    function handleChange(event) {
        setSelectedOption(event.target.value);
    }

    const [selectedLoai, setSelectedLoai] = useState('hocmoi');
    const [selectedMon, setSelectedMon] = useState('');
    const [selectedLop, setSelectedLop] = useState('');
    const [selectedLichHoc, setSelectedLichHoc] = useState('');

    const handleSelectLoaiDK = (event) => {
        setSelectedLoai(event.target.value);
    };

    const handleSelectMonHoc = (maHP) => {
        setSelectedMon(`${maHP}`);
    };

    const handleSelectLopHoc = (maHP) => {
        setSelectedLop(`${maHP}`);
    };

    const handleSelectGioHoc = (maLopHP) => {
        setSelectedLichHoc(`${maLopHP}`);
    };

    return (
        <div className="h-max w-full bg-gray-100 flex flex-row">
            <div className="w-1/12"></div>
            <div className="w-10/12 bg-white mt-2">
                <div className="text-xl text-sv-blue-5 m-4">
                    <b>Đăng ký học phần</b>
                </div>
                <div className="border-t border-gray-200 m-2"></div>
                <div className="flex flex-row items-center justify-center">
                    <div className="flex w-72 border  border-sv-blue-4 rounded-lg p-1">
                        <select
                            className="text-sv-text-2 w-full bg-white leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedOption}
                            onChange={handleChange}
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="hocmoi"
                            checked={selectedLoai === 'hocmoi'}
                            onChange={handleSelectLoaiDK}
                        />
                        <span className="ml-1">Học mới</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="hoclai"
                            checked={selectedLoai === 'hoclai'}
                            onChange={handleSelectLoaiDK}
                        />
                        <span className="ml-1">Học lại</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input
                            type="radio"
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            name="radio-group-loai"
                            value="hoccaithien"
                            checked={selectedLoai === 'hoccaithien'}
                            onChange={handleSelectLoaiDK}
                        />
                        <span className="ml-1">Học cải thiện</span>
                    </label>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Môn học, học phần chờ đăng ký</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên môn học/học phần</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Bắt buộc</th>
                                    <th className={cx('')}>học phần: học trước (a), tiên quyết (b), song hành (c)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listMon.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedMon === `${item.maHP}` ? 'bg-orange-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maHP + index + 'a'}
                                        onClick={() => handleSelectMonHoc(item.maHP)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-mon"
                                                value={item.maHP}
                                                checked={selectedMon === `${item.maHP}`}
                                                onChange={() => handleSelectMonHoc(item.maHP)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.maHP}</td>
                                        <td>{item.tenMon}</td>
                                        <td>{item.soTC}</td>
                                        <td align="center">
                                            {item.batBuoc ? (
                                                <BsFillCheckCircleFill color="green" size={18} />
                                            ) : (
                                                <AiFillCloseCircle color="red" size={21} />
                                            )}
                                        </td>
                                        <td className="">
                                            <div className="flex flex-row items-center justify-center">
                                                {item.dieuKien.map((dk, index) => (
                                                    <div className="" key={dk.maMon + index + 'b'}>
                                                        <span> {dk.maMon}</span>
                                                        <span className="text-red-500">({dk.type})</span>
                                                        {index > 0 ? '' : ','}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center text-base w-full relative">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 ml-40">Lớp học phần chờ đăng ký</b>
                    <label className="absolute right-0 flex flex-row items-center">
                        <input
                            type="checkbox"
                            className=" h-4 w-4 text-indigo-600 transition duration-150 ease-in-out p-2"
                            name="checkbox-trung"
                        />
                        <span>
                            <b className="text-base text-sv-blue-5 mr-6 ml-2">Hiển thị lớp học phần không trùng lịch</b>
                        </span>
                    </label>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}></th>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã học phần</th>
                                    <th className={cx('')}>Tên lớp học phần</th>
                                    <th className={cx('')}>Lớp dự kiến</th>
                                    <th className={cx('')}>Sỉ số tối đa</th>
                                    <th className={cx('')}>Đã đăng ký</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLop.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedLop === `${item.maHP}` ? 'bg-orange-200' : ''
                                        } hover:cursor-pointer`}
                                        key={item.maHP + index + 'a'}
                                        onClick={() => handleSelectLopHoc(item.maHP)}
                                    >
                                        <td>
                                            <input
                                                type="radio"
                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                name="radio-group-lop"
                                                value={item.maHP}
                                                checked={selectedLop === `${item.maHP}`}
                                                onChange={() => handleSelectLopHoc(item.maHP)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{item.maHP}</td>
                                        <td>{item.tenLopHP}</td>
                                        <td>{item.lopDuKien}</td>
                                        <td align="center">{item.siSoToiDa}</td>
                                        <td className="">{item.siSoDK}</td>
                                        <td>{item.trangThai}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Chi tiết lớp học phần</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Lịch học</th>
                                    <th className={cx('')}>Nhóm TH</th>
                                    <th className={cx('')}>Phòng</th>
                                    <th className={cx('')}>Dãy nhà</th>
                                    <th className={cx('')}>Giảng viên</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listLichHoc.map((item, index) => (
                                    <tr
                                        className={`${
                                            selectedLichHoc === `${item.nhomTH}` || `${item.type}` === 'LT'
                                                ? 'bg-orange-200'
                                                : ''
                                        } hover:cursor-pointer`}
                                        key={item.maLopHP + index + 'a'}
                                        onClick={() => handleSelectGioHoc(item.nhomTH)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item.lichHoc}</td>
                                        <td>{item.nhomTH}</td>
                                        <td>{item.phong}</td>
                                        <td align="center">{item.dayNha}</td>
                                        <td className="">{item.giangVien}</td>
                                        <td>{item.thoiGian}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex items-center justify-center p-2">
                        <Button variant="contained" size="small">
                            Đăng ký môn học
                        </Button>
                    </div>
                </div>
                <div className="mt-8 p-2 flex flex-row items-center">
                    <div className="ml-2 mr-2 h-5 w-1 bg-red-500"> </div>
                    <b className="text-sv-blue-5 text-base">Lớp học phần đã đăng ký trong học kỳ này</b>
                </div>
                <div className="m-2">
                    <div className="">
                        <table className={cx('table-dkhp')}>
                            <thead className="text-sv-blue-5">
                                <tr className={cx(' bg-blue-100')}>
                                    <th className={cx('')}>STT</th>
                                    <th className={cx('')}>Mã LHP</th>
                                    <th className={cx('')}>Tên môn học</th>
                                    <th className={cx('')}>Lớp học dự kiến</th>
                                    <th className={cx('')}>Số TC</th>
                                    <th className={cx('')}>Nhóm TH</th>
                                    <th>Học phí</th>
                                    <th>Hạn nộp</th>
                                    <th>Thu</th>
                                    <th>Trạng thái ĐK</th>
                                    <th>Ngày ĐK</th>
                                    <th>Trạng thái LHP</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>6656543333</td>
                                    <td>Nhập môn Lập trình</td>
                                    <td>DHKTPM15A</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>1,800,000</td>
                                    <td>2/3/2022</td>
                                    <td align="center">
                                        <BsFillCheckCircleFill color="green" size={18} />
                                    </td>
                                    <td>Đăng ký mới</td>
                                    <td>2/2/2022</td>
                                    <td>Đã khóa</td>
                                    <td className="p-2">
                                        <Button variant="contained" size="small">
                                            Xem
                                        </Button>
                                    </td>
                                    <td className="p-2">
                                        <Button variant="outlined" color="error" size="small">
                                            Hủy
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>6336565433</td>
                                    <td>Những nguyên lý cơ bản của chủ nghĩa Mac-Lenin</td>
                                    <td>DHKTPM15A</td>
                                    <td>3</td>
                                    <td>1</td>
                                    <td>1,800,000</td>
                                    <td>2/3/2022</td>
                                    <td align="center">
                                        <BsFillCheckCircleFill color="green" size={18} />
                                    </td>
                                    <td>Đăng ký mới</td>
                                    <td>2/2/2022</td>
                                    <td>Đã khóa</td>
                                    <td className="p-2">
                                        <Button variant="contained" size="small">
                                            Xem
                                        </Button>
                                    </td>
                                    <td className="p-2">
                                        <Button variant="outlined" color="error" size="small">
                                            Hủy
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-1/12"></div>
        </div>
    );
}

export default DangKyHocPhan;
