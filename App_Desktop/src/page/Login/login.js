import classNames from 'classnames';

import mot from '../../images/iuh.jpg';
import hai from '../../images/mat_tien_nha_E_2021.jpg';

import Button from '../../components/Button';

import { useNavigate } from 'react-router-dom';
import config from '../../routes/configRoutes';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import styles from '../Login/login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/authService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

const cx = classNames.bind(styles);
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const route = config.routeConfig;

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
        let user = { username: username.trim(), password: password };
        //window.open('../../../../bankehoach.docx');
        var login = await loginUser(user, dispatch, navigate);

        if (login === false) {
            //alert('Mã nhân viên hoặc mật khẩu sai');
            toastr.options = {
                positionClass: 'toast-top-center',
                closeButton: true,
                timeOut: 5000,
                // extendedTimeOut: 0,
                tapToDismiss: false,
            };
            toastr.error('Tài khoản hoặc mật khẩu không chính xác!', 'Thông báo');
            return;
        } else navigate(route.home);
        //navigate(config.routeConfig.home);
    };
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }
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
                                    Hệ thống quản lý đào tạo sinh viên
                                </b>
                            </div>
                            <div className="text-blue-700 flex justify-center mt-4 uppercase text-center">
                                <b>Đăng nhập vào hệ thống</b>
                            </div>
                            <div>
                                <div className="flex justify-center p-7">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={cx(
                                            'block p-2 pl-4 caret-sv-blue-4 text-sm w-full rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic ',
                                        )}
                                        placeholder="Nhập mã nhân viên"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className="flex justify-center p-7">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={cx(
                                            'block p-2 pl-4 caret-sv-blue-4 text-sm w-full rounded-md bg-transparent border border-sv-blue-4 outline-none placeholder:text-sv-placeholder placeholder:italic ',
                                        )}
                                        placeholder="Nhập mật khẩu"
                                        onKeyPress={handleKeyPress}
                                    />
                                </div>
                                <div className=" w-full h-24 p-7">
                                    <Button
                                        className={cx(
                                            'w-full h-full  ',
                                            'border border-opacity-100 border-sv-blue-4 outline-none text-sv-blue-4',
                                            'bg-sv-blue-3 justify-center rounded-md',
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
