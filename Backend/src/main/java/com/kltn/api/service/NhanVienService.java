package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.NhanVien;

public interface NhanVienService {
	public void saveOrUpdateNhanVien(NhanVien nhanVien);
	public List<NhanVien> getAllNhanVien();
	public NhanVien getNhanVienById(String id);
	public String autoId();
	public List<NhanVien> timKiemNhanVien(String textSearch);
	public List<NhanVien> getGiangVienTheoKhoa( String maKhoa);
	public int countNhanVienBySDT(String soDT);
	
	public int countNhanVienByEmail(String email);
	
	public int couNhanVienBySoCCCD(String soCCCD);

}
