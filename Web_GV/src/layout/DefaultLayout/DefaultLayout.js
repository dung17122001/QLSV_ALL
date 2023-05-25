import classNames from 'classnames';
import logo_iuh from './../../images/logo_iuh.png';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { FaHome, FaCaretDown } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../redux/Slice/signInSlice';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import config from '../../configRoutes';
import { getUserByUserName } from '../../services/userService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { AiFillSave } from 'react-icons/ai';
import Button from '@mui/material/Button';
import { checkPassOld, updatePassword } from '~/services/authService';
import { loginSuccess } from '~/redux/Slice/authSlice';
import CloseIcon from '@mui/icons-material/Close';
const cx = classNames.bind();

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function DefaultLayout({ children }) {
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState('hidden');
    const dispatch = useDispatch();
    const searchRef = useRef();
    const navigate = useNavigate();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    //console.log(userLoginData);
    var accessToken = userLoginData?.accessToken;
    if (userLoginData) {
        var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    }
    const [matKhauCu, setMatKhauCu] = useState();
    const [matKhauMoi, setMatKhauMoi] = useState();
    const [xacNhanMK, setXacNhanMK] = useState();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    function BootstrapDialogTitle(props) {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }
    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [user, setUser] = useState();

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleUpdatePassword = async () => {
        let checkOld = await checkPassOld(user.maNhanVien, matKhauCu, accessToken, axiosJWT);
        if (checkOld) {
            if (matKhauMoi === xacNhanMK) {
                await updatePassword(user.maNhanVien, matKhauMoi, accessToken, axiosJWT);
                alert('Cập nhật mật khẩu thành công');
                handleCloseModal();
            } else alert('Mật khẩu mới và ô xác nhận mật khẩu không giống nhau');
        } else alert('Mật khẩu cũ không chính xác');
    };

    const handleLogout = () => {
        handleCloseModal();
        dispatch(loginSuccess(null));
    };

    useEffect(() => {
        const getUser = async () => {
            const userLogin = await getUserByUserName(userLoginData?.username, accessToken, axiosJWT);
            setUser(userLogin);
        };

        getUser();
    }, []);

    //console.log(user);
    dispatch(userLogin(user));

    if (userLoginData === null) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <div className={cx('h-screen flex flex-col w-full')}>
                    <div className={cx(' h-14 w-full flex flex-row  shadow-md ')}>
                        <div className="w-1/12"></div>
                        <div className={cx('flex w-6/12  justify-self-start items-center')}>
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    navigate(config.routeConfig.home);
                                }}
                            >
                                <img src={logo_iuh} alt="avartar" className={cx('w-36 h-12 rounded')} />
                            </div>

                            <div
                                className={cx(
                                    ' flex flex-row ml-10 justify-between pr-4 p-2 pl-4 h-8 caret-sv-blue-4 text-sm w-96 rounded-sv-login-input  border border-sv-blue-4  placeholder:text-sv-placeholder placeholder:italic',
                                )}
                            >
                                <input
                                    ref={searchRef}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className={cx(' w-full outline-none')}
                                />
                                <BiSearch color="#C7C7C7" size={16} />
                            </div>
                            <div className={cx('absolute z-10 text-red-500 text-sm ml-40  w-full mt-10', search)}>
                                Tên đăng nhập hoặc mật khẩu không đúng
                            </div>
                        </div>
                        <div className={cx('flex flex-row w-4/12  justify-between items-center ')}>
                            <div
                                className="flex flex-row justify-center items-center text-sv-text-2 cursor-pointer"
                                onClick={() => {
                                    navigate(config.routeConfig.home);
                                }}
                            >
                                <FaHome className="text-center" size={20} />
                                <p className="text-xs ml-2">Trang chủ</p>
                            </div>
                            <div
                                className="flex flex-row justify-center items-center hover:cursor-pointer"
                                onClick={handleClick}
                            >
                                <div className="flex flex-row border rounded-full border-sv-blue-4">
                                    <img
                                        src={(!!user && user?.linkAnh) || logo_iuh}
                                        alt="avatar"
                                        className={cx('h-10 w-10 rounded-full')}
                                    />
                                </div>
                                <div className=" flex flex-row ml-3 justify-center items-center">
                                    <p className="text-sv-blue-4 mr-2">{user?.tenNhanVien}</p>
                                    <FaCaretDown size={15} />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/12"></div>
                    </div>

                    <div className={cx(' h-full flex ')}>{children}</div>
                </div>

                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClickOpenModal}>Đổi mật khẩu</MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <div className="text-red-500">Đăng xuất</div>
                    </MenuItem>
                </Menu>
                <BootstrapDialog onClose={handleCloseModal} aria-labelledby="customized-dialog-title" open={openModal}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                        Đổi mật khẩu
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <div className="">
                            <div className="p-2 flex flex-row justify-center items-center">
                                <label htmlFor="Password" className="w-36">
                                    Mật khẩu hiện tại:
                                </label>
                                <div className="h-8 ml-4">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Mật khẩu cũ"
                                        type="password"
                                        autoComplete="current-password"
                                        size="small"
                                        value={matKhauCu}
                                        onChange={(e) => setMatKhauCu(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="p-2 flex flex-row justify-center items-center">
                                <label htmlFor="Password" className="w-36">
                                    Mật khẩu mới:
                                </label>
                                <div className="h-8 ml-4">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Mật khẩu mới"
                                        type="password"
                                        autoComplete="current-password"
                                        size="small"
                                        value={matKhauMoi}
                                        onChange={(e) => setMatKhauMoi(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="p-2 flex flex-row justify-center items-center">
                                <label htmlFor="Password" className="w-36">
                                    Xác nhận mật khẩu:
                                </label>
                                <div className="h-8 ml-4">
                                    <TextField
                                        id="outlined-password-input"
                                        label="Xác nhận mật khẩu"
                                        type="password"
                                        autoComplete="current-password"
                                        size="small"
                                        value={xacNhanMK}
                                        onChange={(e) => setXacNhanMK(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <div className="w-full flex justify-center items-center p-4">
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<AiFillSave />}
                            onClick={handleUpdatePassword}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </BootstrapDialog>
            </div>
        );
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
