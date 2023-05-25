export const getLHPCuaGVTheoMaHK = async (maGV, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/gv-hk', {
            params: {
                maGV: maGV,
                maHK: maHK,
            },

            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getThongTinSVByMaLHP = async (maLHP, maGV, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiem', {
            params: {
                maLHP: maLHP,
                maGV: maGV,
            },

            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
