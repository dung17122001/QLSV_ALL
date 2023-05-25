export const getTatCaChucVu = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chucvu', {
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
