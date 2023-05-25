package com.kltn.api.service;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietHocKy;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.Khoa;

public interface HocKyService {
	public List<HocKy> getAllKhoa();
	public HocKy getHocKyById(String id);
	public void addOrUpdateHocKy(HocKy hocKy);
	public String autoId();
	public void addChiTietMonHoc(ChiTietHocPhan chiTietMonHoc);
	public List<HocKy> timKiemHocKy(String textSearch);
	public List<HocKy> getHocKyTheoKhoaHoc(Date startDate, Date endDate);
	public List<HocKy> getHocKyTheoMaCTK(String maCTK);
	public void removeMonHocOfChuongTrinhKhung(String maCTK, String maHK, String maHP);
	
	public List<HocKy> getHocKyByKhoaHoc(String maKhoaHoc);
	
	public List<HocKy> getHocKyTheoTen(String tenHocKy);
}
