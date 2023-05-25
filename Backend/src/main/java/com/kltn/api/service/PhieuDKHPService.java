package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietPhieuDangKy;
import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.Lich;
import com.kltn.api.entity.PhieuDangKyHocPhan;

public interface PhieuDKHPService {
	public List<PhieuDangKyHocPhan> getAllPhieuDKHP();
	public List<ChiTietPhieuDangKy> getAllChiTietPhieuDKHP();
	public PhieuDangKyHocPhan getPhieuDKHPById(String id);
	public PhieuDangKyHocPhan addOrUpdatePhieuDK(PhieuDangKyHocPhan phieuDangKyHocPhan);
	public String autoId();

	public ChiTietPhieuDangKy addChiTietPhieuDKHP(ChiTietPhieuDangKy chiTietPhieuDangKy);
	
	public List<PhieuDangKyHocPhan> findByMaHocKyAndIdSinhVien(String maHocKy, String maSinhVien);
	public List<ChiTietPhieuDangKy> findByMaHocKyAndMaSinhVien(String maSinhVien,String maHocKy);

	
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHP(String maLHP, String maNhom);

	public List<ChiTietPhieuDangKy> getMonHocByTextSearch( String valueSearch);

	
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaSinhVien(String maSinhVien);
	
	public void deleteChiTietPDKByMaPhieuDKAndMaNhomTH(String maPhieuDK, String maNhomTH);
	
	public void xoaTatCaChiTietPhieuTheoMaLHP( String maLHP);
	
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHPDanhChoGV( String maLHP);
}
