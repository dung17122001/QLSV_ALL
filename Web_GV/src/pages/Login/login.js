import React, { useState } from 'react';
import classNames from 'classnames';

import mot from '../../images/iuh.jpg';
import hai from '../../images/mat_tien_nha_E_2021.jpg';

import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import styles from '../Login/login.css';
// import { loginUser, findBanAccount } from '~/service/authService';
import { loginUser, findBanAccount } from '../../services/authService';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const dispatch = useDispatch();

    const spanStyle = {
        padding: '20px',

        color: '#000000',
    };

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '675px',
    };

    const slideImages = [
        {
            url: mot,
            caption: '',
        },
        {
            url: hai,
            caption: '',
        },
    ];

    const handleLogin = async () => {
        let user = { username: userName.trim(), password: password };

        var login = await loginUser(user, dispatch, navigate);

        if (login === false) {
            alert('Mã nhân viên hoặc mật khẩu sai');
            return;
        } else navigate(config.routeConfig.home);
        //navigate(config.routeConfig.home);
    };
    return (
        <>
            <div className="h-full flex w-full">
                <div className={cx(' slide w-9/12 containerSlide')}>
                    <Slide>
                        {slideImages.map((slideImage, index) => (
                            <div key={index}>
                                <div style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}>
                                    <span style={spanStyle}>{slideImage.caption}</span>
                                </div>
                            </div>
                        ))}
                    </Slide>
                </div>
                <div className=" max-w-max w-3/12">
                    <div className=" flex w-full rounded-xl justify-center items-center h-full bg-gradient-layout">
                        <div className="h-5/6 w-5/6 justify-center items-center rounded-xl">
                            <div className="mt-10 flex justify-center items-center">
                                <b className="text-blue-400 uppercase text-2xl solid text-center">
                                    Cổng thông tin giảng viên
                                </b>
                            </div>
                            <div className="text-blue-700 flex justify-center mt-4 uppercase text-center">
                                {' '}
                                <b>Đăng nhập vào hệ thống</b>
                            </div>
                            <div>
                                <div className="flex justify-center p-7">
                                    <input
                                        type="text"
                                        className={cx(
                                            'block p-2 pl-4 caret-sv-blue-4 text-sm w-full rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic ',
                                        )}
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Nhập mã giảng viên"
                                    />
                                </div>
                                <div className="flex justify-center p-7">
                                    <input
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-4 caret-sv-blue-4 text-sm w-full rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic ',
                                        )}
                                        value={password}
                                        onChange={(e) => setPassWord(e.target.value)}
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                                <div className=" w-full h-24 p-7">
                                    <Button
                                        className={cx(
                                            'w-full h-full  ',
                                            'border border-opacity-100 border-sv-blue-4 outline-none text-sv-blue-4',
                                            'bg-sv-blue-3 justify-center ',
                                        )}
                                        onClick={handleLogin}
                                    >
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
