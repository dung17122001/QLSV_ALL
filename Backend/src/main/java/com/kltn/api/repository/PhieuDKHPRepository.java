package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.PhieuDangKyHocPhan;

public interface PhieuDKHPRepository extends JpaRepository<PhieuDangKyHocPhan, String>{
	@Query("SELECT COUNT(*) val_count FROM PhieuDangKyHocPhan")
	public int autoId();
	
	public List<PhieuDangKyHocPhan> findByHocKyMaHocKyAndSinhVienMaSinhVien(String maHocKy, String maSinhVien);
	
	
}
