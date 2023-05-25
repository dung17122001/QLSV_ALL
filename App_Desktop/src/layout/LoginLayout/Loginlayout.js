import classNames from "classnames";
import logo from "./../../images/logo.png"
import PropTypes from 'prop-types';
const cx = classNames.bind();
function LoginLayout({children}) {
    return ( 
        <div className={cx('h-screen flex flex-col w-full')}>
            <div  className={cx('bg-white h-1/7 w-full drop-shadow-2xl flex justify-center ')}>
                    <div><img src={logo} alt="avartar" className={cx('w-full h-full rounded')} /></div>
            </div>
            <div className={cx(' h-5/6 flex justify-center items-center')}>{children}</div>
        </div>
     );
}
LoginLayout.propTypes = {
    children: PropTypes.node,
}

export default LoginLayout;