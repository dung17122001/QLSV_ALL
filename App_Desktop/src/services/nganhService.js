export const getNganhHocByKhoa = async (khoa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('nganh/khoa', {
            params: {
                khoaId: khoa,
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
export const getTatCaNganh = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/nganh', {
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

export const addNganh = async (nganh, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/nganh`, nganh, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const capNhatNganh = async (nganh, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/nganh`, nganh, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const themNganh = async (nganh, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/nganh`, nganh, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
