package com.kltn.api.service;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocPhan;
import com.kltn.api.entity.LopHoc;

public interface HocPhanService {
	public void saveOrUpdateHocPhan(HocPhan hocPhan);
	public List<HocPhan> getAllHocPhan();
	public HocPhan getHocPhanById(String id);
	public String autoId();
	public List<HocPhan> getHocPhanTheoHocKy(String maHocKy);
	public List<ChiTietHocPhan> findHocPhanByMaSinhVienAndMaNganh(String maSinhVien, String maNganh);
	public List<ChiTietHocPhan> getChiTietHocPhan(Date startDate, Date endDate,String maCTK);
	public HocPhan getHocPhanTheoMaMH(String maMH);
	public List<HocPhan> getHocPhanTheoKyVaMaGV(String maGV, String maHK);
}
