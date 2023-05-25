package com.kltn.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kltn.api.entity.KhoaHoc;

public interface KhoaHocRepository extends JpaRepository<KhoaHoc, String>{
	@Query("SELECT COUNT(*) val_count FROM KhoaHoc")
	public int autoId();
}
