export const getTatCaMonHoc = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/monhoc', {
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

export const getTatCaLoaiMonHoc = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/loaimonhoc', {
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

export const addMonHoc = async (monHoc, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/monhoc`, monHoc, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const capNhatMonHoc = async (monHoc, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/monhoc`, monHoc, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMonHocByTextSearch = async (valueSearch, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('monhoc/search', {
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
