import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import classNames from 'classnames';
import style from './lichTheoTienDo.scss';
function LichTheoTienDo() {
    const cx = classNames.bind(style);
    const [selectedValue, setSelectedValue] = useState('all');
    const options = ['HK1 (2021-2022)', 'HK1 (2021-2022)', 'HK1 (2021-2022)'];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleRadioButtonChange = (event) => {
        setSelectedValue(event.target.value);
    };
    function handleChange(event) {
        setSelectedOption(event.target.value);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //Tháng trong javascript bắt đầu từ 0
    var yyyy = today.getFullYear();

    today = yyyy + '-' + dd + '-' + mm;

    const [date, setDate] = useState(today);

    console.log(date);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <>
            <div className="flex flex-row w-full h-full bg-gray-200 pt-3 ">
                <div className="w-1/12 h-full"></div>
                <div className="w-10/12 h-full flex flex-row">
                    <div className="w-full bg-white h-auto border rounded ">
                        <div className="w-full h-12 border-b-2">
                            <div className="flex justify-between p-2">
                                <div className="text-xl font-bold text-sv-text-2 ">Lịch học, lịch thi theo tiến độ</div>

                                <div className="flex flex-row text-sm">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="all"
                                            checked={selectedValue === 'all'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Tất cả</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="lichHoc"
                                            checked={selectedValue === 'lichHoc'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Lịch học</span>
                                    </label>
                                    <label className="inline-flex items-center ml-4">
                                        <input
                                            type="radio"
                                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                            name="radio-group"
                                            value="lichThi"
                                            checked={selectedValue === 'lichThi'}
                                            onChange={handleRadioButtonChange}
                                        />
                                        <span className="ml-1">Lịch thi</span>
                                    </label>
                                    <div className="relative border border-gray-400 ml-2">
                                        <select
                                            className="text-sv-text-2 border h-full border-sv-blue-4 "
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
                                    <div className="ml-4 flex items-center">
                                        <Button variant="contained" size="small">
                                            Xem lịch
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <table className={cx('table-lttd')}>
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>STT</th>
                                        <th rowSpan={2}>Mã học phần</th>
                                        <th rowSpan={2}>Tên môn học/học phần</th>
                                        <th rowSpan={2}>Số tín chỉ</th>
                                        <th rowSpan={1} colSpan={6}>
                                            Thông tin lịch
                                        </th>
                                        <th rowSpan={1} colSpan={2}>
                                            Thời gian
                                        </th>
                                        <th rowSpan={2}>Mã giảng viên</th>
                                        <th rowSpan={2}>Giảng viên</th>
                                    </tr>
                                    <tr>
                                        <th>Thứ</th>
                                        <th>Tiết</th>
                                        <th>Loại lịch</th>
                                        <th>Phòng</th>
                                        <th>Nhóm</th>
                                        <th>Giờ</th>
                                        <th>Bắt đầu</th>
                                        <th>Kết thúc</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>4203002790</td>
                                        <td>Khóa luận tốt nghiệp</td>
                                        <td>5</td>
                                        <td>7</td>
                                        <td>16</td>
                                        <td>Thực hành</td>
                                        <td>Khóa luận</td>
                                        <td></td>
                                        <td></td>
                                        <td>31/12/2022</td>
                                        <td>31/12/2022 </td>
                                        <td>TA00120118</td>
                                        <td> Giảng viên tạm CNTT 3</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                </tbody>
                            </table>
                        </div>
                        <div className="ghichu flex flex-row p-2 item-center">
                            <div className="ml-2 h-4 flex items-center">
                                <b>Ghi chú</b>
                            </div>
                            <div className="h-4 w-10 bg-white ml-4 border"></div>
                            <div className="ml-2 h-4 flex items-center">
                                <p>Lịch học</p>
                            </div>
                            <div className="h-4 w-10 bg-orange-300 ml-4"></div>
                            <div className="ml-2 h-4 flex items-center">
                                <p>Lịch thi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LichTheoTienDo;
