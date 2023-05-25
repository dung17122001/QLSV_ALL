package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.MonHoc;

public interface MonHocRepository extends JpaRepository<MonHoc, String>{
	@Query("SELECT COUNT(*) val_count FROM MonHoc")
	public int autoId();
	
	@Query("SELECT mh FROM MonHoc mh WHERE lower(mh.tenMonHoc) LIKE lower(concat('%', :valueSearch, '%')) "
             + "OR lower(mh.maMonHoc) LIKE lower(concat('%', :valueSearch, '%'))")
	public List<MonHoc> getMonHocByTextSearch(@Param("valueSearch") String valueSearch);
}
