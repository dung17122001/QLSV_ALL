package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;


import com.kltn.api.entity.Lich;
import com.kltn.api.entity.BangDiem;
import com.kltn.api.entity.ChiTietPhieuDangKy;

import com.kltn.api.entity.LopHocPhan;

public interface LopHocPhanService {
	public void saveOrUpdate(LopHocPhan lopHocPhan);
	public List<LopHocPhan> getAllLopHocPhan();
	public LopHocPhan getLopHocPhanById(String id);
	public String autoId();
	public List<LopHocPhan> getLopHocPhanTheoMaHocPhan(String maHP,String maHK);

	public List<LopHocPhan> getLopHocPhanTheoMaHP(String maHP);
	
	public List<LopHocPhan> getTatCaLHPByHocPhanAndMaGVAndMaHK(String maGV, String maHK, String maHP);
	public List<BangDiem> getBangDiemTheoLHPAndMaGV(String maLHP,String maGV);
	public void addBangDiem(BangDiem bangDiem);
	public List<LopHocPhan> getLopHocPhanByTextSearch( String valueSearch);
	public LopHocPhan getLopHocPhanByMaLHP(String maLHP);
	public List<BangDiem> getBangDiemTheoSVAndMH(String maSinhVien, String maMH);
	public List<BangDiem> getBangDiemBySVAndHK(String maSinhVien,String maHK);
	public List<BangDiem> getBangDiemKhongDat(String maSinhVien);
	public List<BangDiem> getBangDiemDat(String maSinhVien);
	
	public List<LopHocPhan> getLopHocPhanTheoMaSVAndHK(String maSinhVien, String maHK);
	
	public float diemTBTheoHK(String maSinhVien,String maHK);
	
	public float diemTBLHP(String maLHP);
	public List<BangDiem> getDiemTongKet(String maSinhVien, String maLHP);
	public String autoIdBangDiem();
	
	public void xoaLopHocPhanTheoMaLHP(String maLHP);
	public List<LopHocPhan> getLopHocPhanByMaGVAndMaHK( String maGV, String maHK);
	
	public void updateTrangThaiBangDiem(String trangThai, String maSinhVien, String maHP);
	public List<BangDiem> getBangDiemByMaSV (String maSinhVien);

	
}
