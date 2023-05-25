package com.kltn.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kltn.api.entity.LoaiDangKyHP;

public interface LoaiDKHPRepository extends JpaRepository<LoaiDangKyHP, String>{
	@Query("SELECT COUNT(*) val_count FROM LoaiDangKyHP")
	public int autoId();
}
