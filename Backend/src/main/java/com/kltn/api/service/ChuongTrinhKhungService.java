package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietHocKy;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.ChuongTrinhKhung;


public interface ChuongTrinhKhungService {
	public List<ChuongTrinhKhung> getAllChuongTrinhKhung();
	public ChuongTrinhKhung getChuongTrinhKhungById(String id);
	public void addOrUpdateChuongTrinhKhung(ChuongTrinhKhung chuongTrinhKhung);
	public String autoId();
	public void addChuongTrinhKhungChoHK(ChiTietHocKy chiTietHocKy);
	public List<ChuongTrinhKhung> getCTKByTextSearch( String valueSearch);
	public List<ChiTietHocPhan> getChuongTrinhKhungTheoMaSV( String maSV);
	
	public List<ChuongTrinhKhung> getCTKByMaSV(String maSV);
}
