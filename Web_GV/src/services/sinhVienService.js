export const getSinhVienByMaLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/ctpdk/lhp', {
            params: {
                maLHP: maLHP,
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
