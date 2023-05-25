export const getTatCaChuongTrinhKhung = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chuongtrinhkhung', {
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

export const addChuongTrinhKhung = async (ctk, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/chuongtrinhkhung`, ctk, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const capNhatChuongTrinhKhung = async (ctk, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/chuongtrinhkhung`, ctk, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const addChiTietHK = async (ctHocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/chuongtrinhkhung/addCTK`, ctHocKy, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCTKByTextSearch = async (valueSearch, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('chuongtrinhkhung/search', {
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
