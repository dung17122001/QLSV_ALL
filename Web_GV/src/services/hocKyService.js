export const getTatCaHocKy = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/hocky', {
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
