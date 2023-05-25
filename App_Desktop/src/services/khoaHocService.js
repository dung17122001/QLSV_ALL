export const getTatCaKhoaHoc = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/khoahoc', {
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
