package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NhanVien;

public interface KhoaService {
	public List<Khoa> getAllKhoa();
	public Khoa getKhoaById(String id);
	public void addOrUpdateKhoa(Khoa khoa);
	public String autoId();
	public List<Khoa> timKiemKhoa(String textSearch);
	
	public List<Khoa> getKhoaTheoTen(String tenKhoa);
}
