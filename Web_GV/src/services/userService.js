import * as httpRequest from '../utils/httpRequest';
import { userLogin } from '../redux/Slice/signInSlice';

export const getUserByUserName = async (userName, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('nhanvien/' + userName, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};
