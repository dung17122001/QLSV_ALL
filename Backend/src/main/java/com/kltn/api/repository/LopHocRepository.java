package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.LopHoc;
import com.kltn.api.entity.NganhHoc;

//@RepositoryRestResource(path = "lophoc")
public interface LopHocRepository extends JpaRepository<LopHoc, String>{
	@Query("SELECT COUNT(*) val_count FROM LopHoc")
	public int autoId();
	
	public List<LopHoc> findByNganhHoc(NganhHoc nganhHoc);
	
	@Query(value = " select COUNT(ma_lop) from lop_hoc where ten_lop like :tenLop", nativeQuery = true)
	public int countLopHocByTenLopHoc(String tenLop);
}
