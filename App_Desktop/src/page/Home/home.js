import { Button } from '@mui/material';
import backgroundIUH from '~/images/backgroundIUH.jpg';
import logo_iuh from '~/images/logo_iuh.png';
function Home() {
    return (
        <>
            <div className="mt-20 flex justify-center items-center">
                <b className="text-blue-400 uppercase text-2xl solid text-center">Hệ thống quản lý đào tạo sinh viên</b>
            </div>
            <div className="text-blue-700 flex justify-center mt-10 uppercase text-center text-3xl">
                <b>Trường Đại Học Công nghiệp Thành Phố Hồ Chí Minh</b>
            </div>
            <div className="mt-10 flex justify-center items-center">
                <img src={logo_iuh} alt="Background" />
            </div>
        </>
    );
}

export default Home;
