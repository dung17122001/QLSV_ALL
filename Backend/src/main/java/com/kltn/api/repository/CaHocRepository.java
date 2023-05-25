package com.kltn.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.CaHoc;

public interface CaHocRepository extends JpaRepository<CaHoc, String>{
	@Query("SELECT COUNT(*) val_count FROM CaHoc")
	public int autoId();
	
	@Query(value = "			  SELECT ca_hoc.*\r\n"
			+ "FROM ca_hoc\r\n"
			+ "WHERE NOT EXISTS (\r\n"
			+ "    SELECT 1\r\n"
			+ "    FROM lich\r\n"
			+ "    WHERE lich.ngay_hoc = :ngayDay AND lich.id_nhan_vien = :maGV AND lich.ma_ca_hoc = ca_hoc.ma_ca_hoc\r\n"
			+ ")\r\n"
			+ "", nativeQuery = true)
	public List<CaHoc> getTatCaCaHocKhongTrungLichDayCuaGV(@Param("maGV") String maGV, @Param("ngayDay") Date ngayDay);
}
