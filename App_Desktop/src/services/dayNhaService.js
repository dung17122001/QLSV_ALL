export const getTatCaDayNha = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/daynha', {
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
export const themDayNha = async (daynha, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/daynha', daynha, {
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
export const capNhatDayNha = async (daynha, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/daynha', daynha, {
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
export const timKiemDayNha = async (text, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('daynha/timkiem', {
            params: {
                value: text,
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

export const getDayNhaTheoTen = async (tenDayNha, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('daynha/tendaynha', {
            params: {
                tenDayNha: tenDayNha,
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
