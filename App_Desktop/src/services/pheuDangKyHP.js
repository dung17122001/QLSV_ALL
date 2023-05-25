export const getChiTietPhieuTheoMaLHP = async (maLHP, maNhom, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/lhp', {
            params: {
                maLHP: maLHP,
                maNhom: maNhom,
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

export const getChiTietPhieuDKByTextSearch = async (valueSearch, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('phieudkhp/chitietpdk/search', {
            params: {
                valueSearch: valueSearch,
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

export const xoaChiTietPDKTheoMaLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete('phieudkhp/chitietpdk/delete', {
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
