export const countSinhVienByNTH = async (maNTH, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/sinhvien/countsvbynth', {
            params: {
                maNTH: maNTH,
            },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
