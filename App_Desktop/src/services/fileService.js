export const uploadFile = async (formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('file/', formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteFile = async (fileName, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete('file/', fileName, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};
