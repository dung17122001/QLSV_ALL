export const getTatCaKhoa = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/khoa', {
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
export const themKhoa = async (khoa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/khoa', khoa, {
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
export const timKiemKhoa = async (text, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('khoa/timkiem', {
            params: {
                value: text,
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
export const capNhatKhoa = async (khoa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/khoa', khoa, {
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

export const getKhoaTheoTen = async (tenKhoa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('khoa/tenkhoa', {
            params: {
                tenKhoa: tenKhoa,
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
