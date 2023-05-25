export const getTatCaDayNha = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/daynha', {
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

export const getPhongHocConTrong = async (maLoai, maDay, ngayHoc, maCa, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phong/phongtrong', {
            params: {
                maLoai: maLoai,
                maDay: maDay,
                ngayHoc: ngayHoc,
                maCa: maCa,
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

export const getTatCaPhongHoc = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phong', {
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

export const getTatLoaiPhong = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/loaiphong', {
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

export const addPhongHoc = async (monHoc, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/phong`, monHoc, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updatePhongHoc = async (monHoc, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/phong`, monHoc, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
