import React, { useState, useEffect } from 'react';
import { Bar, Line, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useDispatch } from 'react-redux';
import { getHocKyTheoKhoaHoc } from '../../service/hocKyService';
import {
    getBangDiemTheoHK,
    getLopHocPhanTheoMaSVAndHK,
    diemTBLHP,
    getDiemTongKet,
} from '../../service/lopHocPhanService';
import tkkqht from '~/images/tkkqht.png';

const BieuDo = ({ hocKy }) => {
    const dispatch = useDispatch();
    const userLoginData = useSelector((state) => state.persistedReducer.auth.currentUser);
    let userLogin = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var accessToken = userLoginData.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, userLoginData);
    const [listHK, setListHK] = useState([]);
    const [listDiemTB, setListDiemTB] = useState([]);
    const [listDiemTK, setListDiemTK] = useState([]);
    const [data, setData] = useState([]);
    const [listLHP, setListLHP] = useState([]);

    useEffect(() => {
        const getHocKyByKhoaHoc = async () => {
            try {
                if (!!userLogin.khoaHoc) {
                    const startYear = userLogin.khoaHoc?.tenKhoaHoc.substring(0, 4);
                    const endYear = userLogin.khoaHoc?.tenKhoaHoc.substring(5) * 1 + 2;
                    var list = await getHocKyTheoKhoaHoc(
                        `${startYear}-08-01`,
                        `${endYear}-06-01`,
                        accessToken,
                        axiosJWT,
                    );
                    setListHK(list);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getHocKyByKhoaHoc();
    }, [userLogin]);

    useEffect(() => {
        const DSlopHocPhan = async () => {
            const getLHP = await getLopHocPhanTheoMaSVAndHK(userLogin?.maSinhVien, hocKy, accessToken, axiosJWT);
            setListLHP(getLHP);
        };
        DSlopHocPhan();
    }, [userLogin, hocKy]);

    useEffect(() => {
        const list = async () => {
            if (listLHP?.length > 0) {
                const newListDiemTB = [];
                const newListDiemTK = [];

                for (let i = 0; i < listLHP?.length; i++) {
                    const diemTB = await diemTBLHP(listLHP[i].maLopHocPhan, accessToken, axiosJWT);
                    const diemTK = await getDiemTongKet(
                        userLogin.maSinhVien,
                        listLHP[i].maLopHocPhan,
                        accessToken,
                        axiosJWT,
                    );

                    newListDiemTB.push(diemTB);
                    newListDiemTK.push(diemTK[0].diemTongKet);
                }

                setListDiemTB(newListDiemTB);
                setListDiemTK(newListDiemTK);
            } else {
                setListDiemTB('');
                setListDiemTK('');
            }
        };

        list();
    }, [userLogin, hocKy, listLHP]);

    useEffect(() => {
        if (listLHP.length > 0) {
            if (listDiemTK.length > 0 && listDiemTB.length > 0) {
                const dt = [];
                for (let i = 0; i < listDiemTK.length; i++) {
                    dt.push({
                        lopHocPhan: listLHP[i]?.hocPhan.monHoc.tenMonHoc,
                        diem: listDiemTK[i],
                        diemTB: listDiemTB[i],
                    });
                }
                setData(dt);
            } else {
                setData();
            }
        } else {
            setData();
        }
    }, [listDiemTK, listDiemTB, hocKy]);

    return (
        <>
            {!!data ? (
                <ComposedChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 100,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="lopHocPhan" label={{ value: '', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis tickCount={6} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ fontSize: '10px' }} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        payload={[
                            { value: 'Điểm', type: 'square', color: '#413ea0' },
                            { value: 'Điểm trung bình', type: 'line', color: '#ff7300' },
                        ]}
                    />
                    <Bar dataKey="diem" barSize={20} fill="#413ea0" name="Điểm" />
                    <Line type="monotone" dataKey="diemTB" stroke="#ff7300" name="Điểm trung bình" />
                </ComposedChart>
            ) : (
                <div>
                    <img src={tkkqht} alt="" className="h-64 w-full" />
                </div>
            )}
        </>
    );
};

export default BieuDo;
