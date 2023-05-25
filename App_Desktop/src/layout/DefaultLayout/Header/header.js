import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import logo from '~/images/logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Menu1 from '../Menu/menu';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../../services/authService';

import { currentNhanVien } from '../../../redux/Slice/nhanVienSlice';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AiFillSave } from 'react-icons/ai';

import { checkPassOld, updatePassword } from '~/services/authService';

import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';

const cx = classNames;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
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

function Header({ userLoginData }) {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.persistedReducer.auth.currentUser);
    const curNhanVien = useSelector((state) => state.persistedReducer.nhanVienSlice.currentNhanVien);
    //console.log(curNhanVien);
    var accessToken = userLogin.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLogin);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [openModal, setOpenModal] = useState(false);
    const [matKhauCu, setMatKhauCu] = useState();
    const [matKhauMoi, setMatKhauMoi] = useState();
    const [xacNhanMK, setXacNhanMK] = useState();

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDoiMatKhau = () => {
        handleClickOpenModal();
    };
    const handleUpdatePassword = async () => {
        let checkOld = await checkPassOld(curNhanVien.maNhanVien, matKhauCu, accessToken, axiosJWT);
        if (checkOld) {
            if (matKhauMoi === xacNhanMK) {
                await updatePassword(curNhanVien.maNhanVien, matKhauMoi, accessToken, axiosJWT);
                alert('Cập nhật mật khẩu thành công');

                handleCloseModal();
            } else alert('Mật khẩu mới và ô xác nhận mật khẩu mới không giống nhau');
        } else alert('Mật khẩu cũ không chính xác');
    };

    const handleLogout = () => {
        handleCloseModal();
        dispatch(loginSuccess(null));
    };
    return (
        <div>
            <div>
                <div className="flex flex-row items-center ">
                    <div className={cx(' flex justify-center items-center ml-2')}>
                        <img src={logo} alt="logo" className={cx('')} />
                    </div>
                    <div className={cx('w-full bg-white flex p-3 justify-end items-center pr-4 ')}>
                        <div
                            className="flex flex-row items-center cursor-pointer"
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <div className="border rounded-full border-blue-500">
                                <Avatar src={userLoginData?.linkAnh}></Avatar>
                            </div>

                            <div className="flex flex-col items-start ml-4">
                                <div>
                                    <div className="text-sv-blue-4 font-bold">{userLoginData?.tenNhanVien}</div>
                                </div>

                                <div className={cx('text-sm text-red-500')}>{userLoginData?.chucVu.tenChucVu}</div>
                            </div>
                        </div>
                        <Menu
                            className="mt-4"
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleDoiMatKhau}>Đổi mật khẩu</MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <div className="text-red-500">Đăng xuất</div>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className=" w-full flex items-center justify-end">
                    <div className="border-t border-gray-500 w-[100%]"></div>
                </div>
            </div>
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
                    <Button variant="contained" size="small" startIcon={<AiFillSave />} onClick={handleUpdatePassword}>
                        Cập nhật
                    </Button>
                </div>
            </BootstrapDialog>
        </div>
    );
}

export default Header;
