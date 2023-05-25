import classNames from 'classnames';

import Button from '~/components/Button';
import config from '~/routes/configRoutes';
import Dropdown from '~/components/Dropdown';
import { VscGroupByRefType } from 'react-icons/vsc';
import { useState } from 'react';
import { GiTicket, GiTheater, GiPopcorn } from 'react-icons/gi';
import { FaUserGraduate, FaUserTie, FaUniversity, FaAlignJustify, FaBook } from 'react-icons/fa';
import { FaHome, FaGraduationCap } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { BiBuildings } from 'react-icons/bi';
import { SlScreenDesktop } from 'react-icons/sl';
import { RiNumbersFill } from 'react-icons/ri';
import { MdHomeWork } from 'react-icons/md';
import { BsFillDoorOpenFill, BsFillBookFill, BsHouseDoorFill } from 'react-icons/bs';
import MenuItem from '../../../components/ItemMenu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { currentNhanVien } from '../../../redux/Slice/nhanVienSlice';

const cx = classNames;
function Header() {
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    //console.log(userLoginData.role);
    const route = config.routeConfig;
    const [showMenu, setShowMenu] = useState(true);
    function Menu() {
        showMenu ? setShowMenu(false) : setShowMenu(true);
        console.log('hhh');
    }
    return (
        <div className=" w-48">
            <FaAlignJustify size={25} onClick={Menu} />
            <div className={showMenu ? '' : 'hidden'}>
                <div className="border rounded-lg border-gray-500 mt-2  bg-sv-blue-3 ">
                    <div className={userLoginData?.role === 'ROLE_GIANGVIEN' ? 'menu flex items-center' : ' hidden '}>
                        <div className={cx('flex flex-row items-center ')}>
                            <Button to={route.kqht} navLink={true} className={' flex items-center '}>
                                <RiNumbersFill size={20} className={cx('')} /> <div className="ml-2">Điểm</div>
                            </Button>
                        </div>
                    </div>
                    <div className={userLoginData?.role === 'ROLE_GIANGVIEN' ? ' hidden ' : 'menu flex items-center'}>
                        <div className={cx('flex flex-row items-center ')}>
                            <Button to={route.sinhvien} navLink={true} className={' flex items-center '}>
                                <FaUserGraduate size={20} className={cx('')} /> <div className="ml-2">Sinh Viên</div>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('menu flex items-center')}>
                        <div
                            className={
                                userLoginData?.role === 'ROLE_GIANGVIEN' || userLoginData?.role === 'ROLE_PHONGDAOTAO'
                                    ? ' hidden '
                                    : 'menu flex items-center'
                            }
                        >
                            <Button to={route.giangvien} navLink={true} className={cx(' flex items-center ')}>
                                <FaUserTie size={20} className={cx('')} />
                                <div className="ml-2">Nhân viên</div>
                            </Button>
                        </div>
                    </div>
                    <div className={cx('menu flex items-center')}>
                        <div
                            className={
                                userLoginData?.role === 'ROLE_GIANGVIEN' || userLoginData?.role === 'ROLE_PHONGDAOTAO'
                                    ? ' hidden '
                                    : 'menu flex items-center'
                            }
                        >
                            <Button to={route.khoa} navLink={true} className={cx(' flex items-center ')}>
                                <IoLibrary size={20} className={cx('')} />
                                <div className="ml-2">Khoa</div>
                            </Button>
                        </div>
                    </div>
                    <div
                        className={
                            userLoginData?.role === 'ROLE_GIANGVIEN'
                                ? ' hidden '
                                : 'menu flex  items-center active:text-sv-yellow-2'
                        }
                    >
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Đào tạo',
                                    subItems: [
                                        { name: 'Môn học', to: 'dao-tao/mon-hoc', icon: <BsFillBookFill /> },
                                        {
                                            name: 'Lớp học phần',
                                            to: 'dao-tao/lop-hoc-phan',
                                            icon: <BsFillDoorOpenFill />,
                                        },
                                        { name: 'Ngành', to: 'dao-tao/nganh', icon: <FaUniversity /> },
                                        {
                                            name: 'Chương trình khung',
                                            to: 'dao-tao/chuongtrinhkhung',
                                            icon: <FaUniversity />,
                                        },
                                        { name: 'Điểm', to: 'dao-tao/ket-qua-hoc-tap', icon: <RiNumbersFill /> },
                                        { name: 'Học Kỳ', to: 'dao-tao/hoc-ky', icon: <FaUniversity /> },
                                    ],
                                },
                            ]}
                            icon={<FaBook />}
                        ></MenuItem>
                    </div>
                    <div
                        className={
                            userLoginData?.role === 'ROLE_GIANGVIEN' || userLoginData?.role === 'ROLE_PHONGDAOTAO'
                                ? ' hidden '
                                : 'menu flex  items-center active:text-sv-yellow-2'
                        }
                    >
                        <MenuItem
                            menuItems={[
                                {
                                    name: 'Cơ sở vật chất',
                                    subItems: [
                                        { name: 'Dãy nhà', to: 'co-so-vat-chat/day-nha', icon: <BiBuildings /> },
                                        {
                                            name: 'Phòng học',
                                            to: 'co-so-vat-chat/phong-hoc',
                                            icon: <BsHouseDoorFill />,
                                        },
                                    ],
                                },
                            ]}
                            icon={<MdHomeWork />}
                        ></MenuItem>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
