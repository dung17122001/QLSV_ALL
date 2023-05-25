package com.kltn.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kltn.api.entity.ChucVu;

public interface ChucVuRepository extends JpaRepository<ChucVu, String> {
	@Query("SELECT COUNT(*) val_count FROM ChucVu")
	public int autoId();

}
