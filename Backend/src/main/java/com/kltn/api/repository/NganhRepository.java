package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NganhHoc;

//@RepositoryRestResource(path = "nganh")
@Repository
public interface NganhRepository extends JpaRepository<NganhHoc, String>{
	@Query("SELECT COUNT(*) val_count FROM NganhHoc")
	public int autoId();
	
	public List<NganhHoc> findByKhoa(Khoa khoa);
}


