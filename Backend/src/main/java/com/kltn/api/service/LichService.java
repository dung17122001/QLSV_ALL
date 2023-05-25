package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.Lich;

public interface LichService {
	public void saveOrUpdateLich(Lich lich);
	public List<Lich> getAllLich();
	public Lich getLichById(String id);
	public String autoId();
	public List<Lich> getTatCaLichTheoMaLHP( String maLHP);
	public List<Lich> getLichTheoNgayCuaSinhVien(String maSV,String ngayBD,  String ngayKT);
	
	public List<Lich> getChiTietLopHPByMaLopHocPhan(String maLopHocPhan);
	public List<Lich> getLichByTextSearch(String valueSearch);
	public List<Lich> getListChiTietPDKByMaSinhVienAndLopHP(String maSinhVien,String maLHP);
	public List<Lich> getLichTheoNgayCuaGiangVien(String maGV,String ngayBD,  String ngayKT);
	
	public List<Lich> getALLLichByMaSinhVienAndHK(String maSinhVien,String maHK);
	
	public void xoaTatCaLichTheoMaLHP( String maLHP);
	public List<Lich> getTatCaLichTheoMaLHPAndNhomTH( String maLHP, String maNhomTH);
}
