import { memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { getNhanVienById } from '~/services/nhanVienService';
import { currentNhanVien } from '../../redux/Slice/nhanVienSlice';

const cx = classNames;

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const [curNhanVien, setCurNhanVien] = useState();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    var accessToken = userLoginData?.accessToken;
    if (!!userLoginData) {
        var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    }
    useEffect(() => {
        const getNhanVien = async () => {
            const getNV = await getNhanVienById(userLoginData?.username, accessToken, axiosJWT);
            setCurNhanVien(getNV);
        };
        getNhanVien();
    }, [userLoginData]);
    dispatch(currentNhanVien(curNhanVien)); // lưu lại user trong redux

    if (userLoginData === null) {
        return <Navigate replace to="/dang-nhap" />;
    } else {
        return (
            <div className={cx('w-full  flex flex-row')}>
                <div className={cx('w-full h-full relative')}>
                    <Header userLoginData={curNhanVien} />
                    <div className="w-full flex">
                        <div className="h-screen w-1/12 mr-10 mt-5 ">
                            <Menu />
                        </div>
                        <div className=" w-11/12"> {children}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default memo(DefaultLayout);
