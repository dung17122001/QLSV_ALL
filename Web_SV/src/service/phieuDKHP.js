export const getPhieuDKByHocKyMaSinhVien = async (maSinhVien, maHocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/hocky-sinhvien', {
            params: {
                maSinhVien: maSinhVien,
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

export const themPhieuDangKy = async (phieuDangKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/phieudkhp', phieuDangKy, {
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

export const themChiTietPhieuDangKy = async (chiTietPhieuDangKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/phieudkhp/add-ctpdk', chiTietPhieuDangKy, {
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

export const getChiTietPhieuDKByHocKyAndSinhVien = async (maSinhVien, maHocKy, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/chitietpdk/byhockyandsinhvien', {
            params: {
                maSinhVien: maSinhVien,
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
export const getTatCaChiTietPhieu = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/chitietpdk', {
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

export const getChiTietPhieuDKByMaSinhVien = async (maSinhVien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/phieudkhp/chitietpdk/sinhvien', {
            params: {
                maSinhVien: maSinhVien,
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

export const deleteChiTietPDKByMaPhieuDKAndMaNhomTH = async (maPhieuDK, maNhomTH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete('/phieudkhp/chitietpdk', {
            params: {
                maPhieuDK: maPhieuDK,
                maNhomTH: maNhomTH,
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
