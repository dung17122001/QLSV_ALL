export const getLichTheoThoiGian = async (maGV, ngayBD, ngayKT, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/lich/gv', {
            params: {
                maGV: maGV,
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
