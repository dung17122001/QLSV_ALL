export const getLichTheoThoiGian = async (maSV, ngayBD, ngayKT, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/sv', {
            params: {
                maSV: maSV,
                ngayBD: ngayBD,
                ngayKT: ngayKT,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLichDaDKTheoHK = async (maSinhVien, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/lichddk', {
            params: {
                maSinhVien: maSinhVien,
                maHK: maHK,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLichTheoLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/lhp', {
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

export const getLichTheoLHPAndNhomTH = async (maLHP, maNhomTH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/lhp-nhomth', {
            params: {
                maLHP: maLHP,
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
export const themLich = async (lich, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/lich', lich, {
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

export const getChiTietLichByMaSinhVienAndLopHP = async (maSinhVien, maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/chitietlich/sinhvien-lophocphan', {
            params: {
                maSinhVien: maSinhVien,
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
