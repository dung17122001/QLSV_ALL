package com.kltn.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kltn.api.entity.LoaiPhong;

public interface LoaiPhongRepository extends JpaRepository<LoaiPhong, String> {
	@Query("SELECT COUNT(*) val_count FROM LoaiPhong")
	public int autoId();
}
