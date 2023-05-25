// eslint-disable-next-line no-unused-expressions
import React from 'react';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import logo_iuh from './../../images/logo_iuh.png';
import config from '../../configRoutes';
import Menu from '../../components/Menu/menu';
import { useDispatch, useSelector } from 'react-redux';

function convertDateFormat(dateString) {
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function ThongTinGiangVien() {
    // const cx = classNames.bind(style);
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    //console.log(userLogin);

    return (
        <>
            <div className="flex flex-row w-full h-max bg-gray-200 pt-3">
                <div className="w-1/12 h-full"></div>
                <div className="w-10/12 h-full flex flex-row">
                    <div className="w-1/6 h-min bg-white">
                        <Menu />
                    </div>
                    <div className="w-5/6 h-screen bg-white  border rounded ml-2">
                        <div className="flex">
                            <div className="w-3/12 ml-5">
                                <div className="flex w-full h-full pt-5 pb-5 justify-center items-center">
                                    <div className="w-40 h-40 flex justify-center items-center rounded-full border border-sv-blue-4">
                                        <img
                                            src={(!!userLogin && userLogin?.linkAnh) || logo_iuh}
                                            alt="avatar"
                                            className={'h-40 w-40 rounded-full'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-9/12">
                                <h1 className="text-2xl text-sv-text-2 font-bold  border-b-2   h-10">
                                    Thông tin học vị
                                </h1>
                                <div className="w-full flex">
                                    <div className="w-1/2 mt-3">
                                        <div className="w-full ml-0 m-5 flex">
                                            <div className="w-1/2">
                                                <div className="flex flex-row text-sm">
                                                    <p className="mr-2 text-sv-text-1 ">MSGV:</p>
                                                    <p className="text-sv-text-2 font-bold">{userLogin?.maNhanVien}</p>
                                                </div>

                                                <div className="flex flex-row text-sm mt-4 ">
                                                    <p className="mr-2  w-auto text-sv-text-1 ">Họ tên:</p>
                                                    <p className="text-sv-text-2 font-bold">{userLogin?.tenNhanVien}</p>
                                                </div>
                                                <div className="flex flex-row text-sm mt-4">
                                                    <p className="mr-2 text-sv-text-1 ">Giới tính:</p>
                                                    <p className="text-sv-text-2 font-bold">
                                                        {userLogin?.gioiTinh === true ? 'Nam' : 'Nữ'}
                                                    </p>
                                                </div>
                                                <div className="flex text-sm mt-4">
                                                    <p className="mr-2 text-sv-text-1">Chức vụ:</p>
                                                    <p className="text-sv-text-2 font-bold">
                                                        {userLogin?.chucVu.tenChucVu}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 mt-3 ">
                                        <div className="flex text-sm ml-0 m-4 ">
                                            <p className="mr-2 text-sv-text-1 ">Học vị:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.hocVi}</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-4 ">
                                            <p className="mr-2 text-sv-text-1 ">Khoa:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.khoa.tenKhoa}</p>
                                        </div>
                                        <div className="flex text-sm ml-0 m-4 ">
                                            <p className="mr-2 text-sv-text-1 ">Trạng thái:</p>
                                            <p className="text-sv-text-2 font-bold">{userLogin?.trangThai}</p>
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
                                        <p className="text-sv-text-2 font-bold">{userLogin?.soCMND}</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Đối tượng:</p>
                                        <p className="text-sv-text-2 font-bold"></p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5">
                                        <p className="mr-2 text-sv-text-1 ">Ngày vào đoàn:</p>
                                        <p className="text-sv-text-2 font-bold">
                                            {convertDateFormat(userLogin?.ngayVaoDoan)}
                                        </p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
                                        <p className="mr-2 text-sv-text-1 ">Điện thoại:</p>
                                        <p className="text-sv-text-2 font-bold">{userLogin?.soDienThoai}</p>
                                    </div>
                                    <div className="flex text-sm ml-0 m-5 ">
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
                                <div className="w-8/12">
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
                                                <p className="text-sv-text-2 font-bold">{userLogin?.noiCapCCCD}</p>
                                            </div>
                                        </div>
                                    </div>
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

export default ThongTinGiangVien;
