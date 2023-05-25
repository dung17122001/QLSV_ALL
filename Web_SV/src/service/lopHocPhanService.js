export const getLopHocPhanTheoMaHP = async (maHP, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/hocphan', {
            params: {
                maHP: maHP,
                maHK: maHK,
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

export const getLopHocPhanTheoMaSVAndHK = async (maSinhVien, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/sinhvien-hocky', {
            params: {
                maSinhVien: maSinhVien,
                maHK: maHK,
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

export const getLopHocPhanMaHP = async (maHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/mahocphan', {
            params: {
                maHP: maHP,
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

export const addLopHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/lophocphan', hp, {
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

export const updateLopHocPhan = async (hp, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/lophocphan', hp, {
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

export const getBangDiemTheoSVAndMH = async (maSinhVien, maMH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiem/sinhvien-monhoc', {
            params: {
                maSinhVien: maSinhVien,
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

export const getLopHocPhanByMaLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('lophocphan/malophocphan', {
            params: {
                maLHP: maLHP,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const getBangDiemTheoHK = async (maSinhVien, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiemsvandhk', {
            params: {
                maSinhVien: maSinhVien,
                maHK: maHK,
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

export const getBangDiemKhongDat = async (maSinhVien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiemkhongdat', {
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

export const getBangDiemDat = async (maSinhVien, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiemdat', {
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

export const diemTBTheoHK = async (maSinhVien, maHK, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/diemtbtheohk', {
            params: {
                maSinhVien: maSinhVien,
                maHK: maHK,
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

export const updateTrangThaiBangDiem = async (trangThai, maSinhVien, maHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/updatetrangthaibangdiem', {
            params: {
                trangThai: trangThai,
                maSinhVien: maSinhVien,
                maHP: maHP,
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

export const diemTBLHP = async (maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/diemtblhp', {
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

export const getDiemTongKet = async (maSinhVien, maLHP, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/diemtongket', {
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

export const getBangDiemCuaSV = async (maSV, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lophocphan/bangdiem/sv', {
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
