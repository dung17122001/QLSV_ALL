export const addHocPhan = async (hocphan, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/hocphan`, hocphan, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getHocPhanTheoHocKy = async (maHocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocphan/hocky', {
            params: {
                maHocKy: maHocKy,
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

export const getHocPhanTheoKhoaHoc = async (startDate, endDate, maCTK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocphan/chitiet', {
            params: {
                startDate: startDate,
                endDate: endDate,
                maCTK: maCTK,
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

export const getHocPhanTheoMaMH = async (maMH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocphan/monhoc', {
            params: {
                maMH: maMH,
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

export const findHocPhanByMaSinhVienAndMaNganh = async (maSinhVien, maNganh, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocphan/sinhvien_nganh', {
            params: {
                maSinhVien: maSinhVien,
                maNganh: maNganh,
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

export const getChuongTrinhKhungByMaSV = async (maSV, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chuongtrinhkhung/sv', {
            params: {
                maSV: maSV,
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

export const getCTKByMaSV = async (maSV, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('chuongtrinhkhung/masv', {
            params: {
                maSV: maSV,
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
