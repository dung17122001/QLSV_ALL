import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import classNames from 'classnames';
import style from './ketQuaHocTap.scss';
function KetQuaHocTap() {
    const cx = classNames.bind(style);
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
                        <table className={cx('table-kqht mt-2')}>
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
                                    <th rowSpan={3} className=" border border-sv-blue-4">
                                        Tên môn học/Học phần
                                    </th>
                                    <th rowSpan={3} className="w-14 border border-sv-blue-4">
                                        Số tín chỉ
                                    </th>
                                    <th colSpan={2} className="px-4 py-1 border border-sv-blue-4">
                                        Giữa kỳ
                                    </th>
                                    <th colSpan={9} className="px-4 py-1 border border-sv-blue-4">
                                        Thường xuyên
                                    </th>
                                    <th colSpan={5} className="px-4 py-1 border border-sv-blue-4">
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
                                    <th rowSpan={1} colSpan={9} className=" border border-sv-blue-4">
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
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        4
                                    </th>
                                    <th rowSpan={2} className="px-4 py-2 border border-sv-blue-4">
                                        5
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
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        6
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        7
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        8
                                    </th>
                                    <th rowSpan={1} className="px-4 py-2 border border-sv-blue-4">
                                        9
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-300">
                                    <td colSpan={28} className="font-bold text-sv-blue-5 ">
                                        Học kỳ (2019-2020)
                                    </td>
                                </tr>
                                {listDiem.map((item, index) => (
                                    <tr className="bg-white">
                                        <td className="text-center">1</td>
                                        <td className="text-center">420300068520</td>
                                        <td className=" border max-w-md whitespace-nowrap text-ellipsis">
                                            Những nguyên lý cơ bản của chủ nghĩa Mác- Lenin
                                        </td>
                                        <td className=" text-center px-4">3</td>

                                        <td
                                            className={`${item.TK1} > 5 ` ? 'text-red-500  text-center' : 'text-center'}
                                        >
                                            {item.TK1}
                                        </td>
                                        <td className="text-center"></td>
                                        <td className="text-center">7,0</td>
                                        <td className="text-center">7,5</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center">9.0</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center">3.2</td>
                                        <td className="text-center">A+</td>
                                        <td className="text-center">Khá</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Điểm trung bình học kỳ hệ 10: 7,10</td>
                                    <td>Điểm trung bình học kỳ hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Điểm trung bình tích lũy: 7,10</td>
                                    <td>Điểm trung bình tích lũy hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín chỉ đã đăng ký: 7,10</td>
                                    <td>Tổng số tín chỉ tích lũy: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín đạt: 7,10</td>
                                    <td>Tổng số tín chỉ nợ tính đến hiện tại: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Xếp loại học lực tích lũy: 7,10</td>
                                    <td>Xếp loại học lực học kỳ: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>

                                <tr className="bg-slate-300">
                                    <td colSpan={28} className="font-bold text-sv-blue-5 ">
                                        Học kỳ (2019-2020)
                                    </td>
                                </tr>
                                {listDiem.map((item, index) => (
                                    <tr className="bg-white">
                                        <td className="text-center">1</td>
                                        <td className="text-center">420300068520</td>
                                        <td className=" border max-w-md whitespace-nowrap text-ellipsis">
                                            Những nguyên lý cơ bản của chủ nghĩa Mác- Lenin
                                        </td>
                                        <td className=" text-center px-4">3</td>

                                        <td
                                            className={`${item.TK1} > 5 ` ? 'text-red-500  text-center' : 'text-center'}
                                        >
                                            {item.TK1}
                                        </td>
                                        <td className="text-center"></td>
                                        <td className="text-center">7,0</td>
                                        <td className="text-center">7,5</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center">9.0</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center">3.2</td>
                                        <td className="text-center">A+</td>
                                        <td className="text-center">Khá</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Điểm trung bình học kỳ hệ 10: 7,10</td>
                                    <td>Điểm trung bình học kỳ hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Điểm trung bình tích lũy: 7,10</td>
                                    <td>Điểm trung bình tích lũy hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín chỉ đã đăng ký: 7,10</td>
                                    <td>Tổng số tín chỉ tích lũy: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín đạt: 7,10</td>
                                    <td>Tổng số tín chỉ nợ tính đến hiện tại: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Xếp loại học lực tích lũy: 7,10</td>
                                    <td>Xếp loại học lực học kỳ: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>

                                <tr className="bg-slate-300">
                                    <td colSpan={28} className="font-bold text-sv-blue-5 ">
                                        Học kỳ (2019-2020)
                                    </td>
                                </tr>
                                {listDiem.map((item, index) => (
                                    <tr className="bg-white">
                                        <td className="text-center">1</td>
                                        <td className="text-center">420300068520</td>
                                        <td className=" border max-w-md whitespace-nowrap text-ellipsis">
                                            Những nguyên lý cơ bản của chủ nghĩa Mác- Lenin
                                        </td>
                                        <td className=" text-center px-4">3</td>

                                        <td
                                            className={`${item.TK1} > 5 ` ? 'text-red-500  text-center' : 'text-center'}
                                        >
                                            {item.TK1}
                                        </td>
                                        <td className="text-center"></td>
                                        <td className="text-center">7,0</td>
                                        <td className="text-center">7,5</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                        <td className="text-center">9.0</td>
                                        <td className="text-center">7.0</td>
                                        <td className="text-center">3.2</td>
                                        <td className="text-center">A+</td>
                                        <td className="text-center">Khá</td>
                                        <td className="text-center"></td>
                                        <td className="text-center"></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan={2}>Điểm trung bình học kỳ hệ 10: 7,10</td>
                                    <td>Điểm trung bình học kỳ hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Điểm trung bình tích lũy: 7,10</td>
                                    <td>Điểm trung bình tích lũy hệ 4: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín chỉ đã đăng ký: 7,10</td>
                                    <td>Tổng số tín chỉ tích lũy: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Tổng số tín đạt: 7,10</td>
                                    <td>Tổng số tín chỉ nợ tính đến hiện tại: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Xếp loại học lực tích lũy: 7,10</td>
                                    <td>Xếp loại học lực học kỳ: 3,10</td>
                                    <td colSpan={25}></td>
                                </tr>
                            </tbody>
                        </table>
                    </Scrollbar>
                </div>
            </div>
        </>
    );
}

export default KetQuaHocTap;
