// eslint-disable-next-line no-unused-expressions
import React from 'react';
import MenuItem from '../../components/ItemMenu';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { SlScreenDesktop } from 'react-icons/sl';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import { useDispatch, useSelector } from 'react-redux';
function ThongTinSinhVien() {
    // const cx = classNames.bind(style);
    let userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    //console.log(userLogin);
    // const ngaySinhFormat = () => {
    //     if (userLogin.ngaySinh !== null) {
    //         let dateString = userLogin?.ngaySinh;
    //         let dateParts = dateString?.split('-');

    //         // Tạo đối tượng Date mới từ chuỗi ban đầu
    //         let dateObject = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    //         // Lấy ngày, tháng, năm từ đối tượng Date
    //         let day = dateObject.getDate().toString().padStart(2, '0');
    //         let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    //         let year = dateObject.getFullYear();

    //         // Ghép lại thành chuỗi với định dạng "dd-mm-yyyy"
    //         let formattedDate = `${day}-${month}-${year}`;
    //         // console.log(formattedDate);
    //         return formattedDate;
    //     }
    // };
    // ngaySinhFormat();
    function convertDateFormat(dateString) {
        let date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    return (
        <>
            <div className="flex flex-row w-full h-max bg-gray-200 pt-3">
                <div className="w-1/12 h-full"></div>
                <div className="w-10/12 h-full flex flex-row">
                    <div className="w-1/6 h-min bg-white">
                        <div className={'menu'}>
                            <div className={'flex flex-row items-center p-2'}>
                                <div className="text-xl">
                                    <FaHome color="gray" />
                                </div>
                                <div className="ml-2 text-gray-500">Trang chủ</div>
                            </div>
                        </div>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Thông tin chung',
                                    subItems: [
                                        { name: 'Thông tin sinh viên', to: '' },
                                        { name: 'Thông tin học tập', to: 'login' },
                                    ],
                                },
                            ]}
                            icon={<SlScreenDesktop />}
                        ></MenuItem>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Học tập',
                                    subItems: [
                                        { name: 'Kết quả học tập', to: '' },
                                        { name: 'Lịch theo tuần', to: 'login' },
                                    ],
                                },
                            ]}
                            icon={<FaGraduationCap />}
                        ></MenuItem>
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Đăng ký học phần',
                                    subItems: [
                                        { name: 'Chương trình khung', to: '' },
                                        { name: 'Đăng ký học phần', to: 'login' },
                                    ],
                                },
                            ]}
                            icon={<BsFillCalendar2CheckFill />}
                        ></MenuItem>
                    </div>
                    <div className="w-5/6 h-screen bg-white  border rounded ml-2">
                        <div className="flex">
                            <div className="w-3/12 ml-5">
                                <div className="flex w-full pt-5 pb-5 justify-center items-center">
                                    <div className="w-28 h-28  rounded-full border border-sv-blue-4">
                                        <img
                                            src={(!!userLogin && userLogin?.linkAnh) || logo_iuh}
                                            alt="avatar"
                                            className={'h-28 w-28 rounded-full'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row text-sm">
                                    <p className="mr-2 text-sv-text-1 ">MSSV:</p>
                                    <p className="text-sv-text-2 font-bold">{userLogin?.maSinhVien}</p>
                                </div>

                                <div className="flex flex-row text-sm mt-4 ">
                                    <p className="mr-2  w-auto text-sv-text-1 ">Họ tên:</p>
                                    <p className="text-sv-text-2 font-bold">{userLogin?.tenSinhVien}</p>
                                </div>
                                <div className="flex flex-row text-sm mt-4">
                                    <p className="mr-2 text-sv-text-1 ">Giới tính:</p>
                                    <p className="text-sv-text-2 font-bold">
                                        {userLogin?.gioiTinh === true ? 'Nam' : 'Nữ'}
                                    </p>
                                </div>
                            </div>
                            <div className="w-9/12">
                                <h1 className="text-2xl text-sv-text-2 font-bold  border-b-2   h-10">
                                    Thông tin học vấn
                                </h1>
                                <div className="w-full flex">
                                    <div className="w-1/2 mt-3">
                                        <div className="w-full ml-0 m-5 flex">
                                            <div className="w-1/2">
                                                <div className="flex text-sm">
                                                    <p className="mr-2 text-sv-text-1 ">Trạng thái:</p>
                                                    <p className="text-sv-text-2 font-bold">Đang học</p>
                                                </div>
                                            </div>
                                            <div className="w-1/2">
                                                <div className="flex text-sm">
                                                    <p className="mr-2 text-sv-text-1 ">Mã hồ sơ:</p>
                                                    <p className="text-sv-text-2 font-bold">19466481</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Lớp học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.lopHoc.tenLop}</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Bậc đào tạo:</p>
                                            <p className="text-sv-text-2 font-bold">Đại học</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Khoa:</p>
                                            <p className="text-sv-text-2 font-bold">
                                                {userLogin?.lopHoc.nganhHoc.khoa.tenKhoa}
                                            </p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Chuyên ngành:</p>
                                            <p className="text-sv-text-2 font-bold">
                                                {userLogin?.lopHoc.nganhHoc.tenNganh}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mt-3 ">
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Ngày vào trường:</p>
                                            <p className="text-sv-text-2 font-bold">19/08/2019</p>
                                        </div>

                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Ngành:</p>
                                            <p className="text-sv-text-2 font-bold">
                                                {userLogin?.lopHoc.nganhHoc.tenNganh}
                                            </p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-5 ">
                                            <p className="mr-2 text-sv-text-1 ">Khóa học:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.khoaHoc.tenKhoaHoc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 ml-5 w-full">
                            <h1 className="text-2xl text-sv-text-2 font-bold  border-b-2   h-10">Thông tin cá nhân</h1>
                            <div className="w-full flex">
                                <div className="w-4/12">
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Ngày sinh:</p>
                                        <p className="text-sv-text-2 font-bold">
                                            {convertDateFormat(userLogin?.ngaySinh)}
                                        </p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Số CCCD:</p>
                                        <p className="text-sv-text-2 font-bold">{userLogin?.soCCCD}</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Đối tượng:</p>
                                        <p className="text-sv-text-2 font-bold">{userLogin?.doiTuong}</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5">
                                        <p className="mr-2 text-sv-text-1 ">Ngày vào đoàn:</p>
                                        <p className="text-sv-text-2 font-bold">{userLogin?.ngayVaoDoan}</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Điện thoại:</p>
                                        <p className="text-sv-text-2 font-bold">{userLogin?.soDienThoai}</p>
                                    </div>
                                </div>
                                <div className="w-4/12">
                                    <div className="w-full flex">
                                        <div className="w-1/2">
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Dân tộc:</p>
                                                <p className="text-sv-text-2 font-bold">Kinh</p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Ngày cấp:</p>
                                                <p className="text-sv-text-2 font-bold">
                                                    {convertDateFormat(userLogin?.ngayCapCCCD)}
                                                </p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Diện chính sách:</p>
                                                <p className="text-sv-text-2 font-bold"></p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Ngày vào Đảng:</p>
                                                <p className="text-sv-text-2 font-bold">
                                                    {convertDateFormat(userLogin?.ngayVaoDang)}
                                                </p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Email:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.email}</p>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Tôn giáo:</p>
                                                <p className="text-sv-text-2 font-bold">Không</p>
                                            </div>
                                            <div className="flex text-sm ml-0 m-5">
                                                <p className="mr-2 text-sv-text-1 ">Nơi cấp:</p>
                                                <p className="text-sv-text-2 font-bold">{userLogin?.noiCap}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-sm ml-0  ">
                                    <p className="mr-2 text-sv-text-1 ">Địa chỉ liên hệ:</p>
                                    <p className="text-sv-text-2 font-bold">{userLogin?.diaChi}</p>
                                </div>
                                <div className="flex text-sm ml-0 m-5 ">
                                    <p className="mr-2 text-sv-text-1 ">Nơi sinh:</p>
                                    <p className="text-sv-text-2 font-bold">{userLogin?.noiSinh}</p>
                                </div>
                                <div className="flex text-sm ml-0 m-5 ">
                                    <p className="mr-2 text-sv-text-1 ">Hộ khẩu thường trú:</p>
                                    <p className="text-sv-text-2 font-bold">{userLogin?.diaChi}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    );
}

export default ThongTinSinhVien;
