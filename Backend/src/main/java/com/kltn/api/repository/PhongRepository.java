package com.kltn.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.Phong;

public interface PhongRepository extends JpaRepository<Phong, String> {
	@Query("SELECT COUNT(*) val_count FROM Phong")
	public int autoId();
	
	@Query(value = "SELECT phong.*\r\n"
			+ "FROM loai_phong\r\n"
			+ "INNER JOIN phong ON loai_phong.ma_loai_phong = phong.ma_loai_phong\r\n"
			+ "INNER JOIN day_nha ON phong.ma_day_nha = day_nha.ma_day_nha\r\n"
			+ "WHERE loai_phong.ma_loai_phong = :maLoai\r\n"
			+ "  AND day_nha.ma_day_nha = :maDay\r\n"
			+ "  AND NOT EXISTS (\r\n"
			+ "    SELECT lich.ma_phong\r\n"
			+ "    FROM lich\r\n"
			+ "    INNER JOIN ca_hoc ON lich.ma_ca_hoc = ca_hoc.ma_ca_hoc\r\n"
			+ "    WHERE lich.ma_phong = phong.ma_phong\r\n"
			+ "      AND ca_hoc.ma_ca_hoc = :maCa\r\n"
			+ "      AND lich.ngay_hoc = :ngayHoc\r\n"
			+ "  )", nativeQuery = true)
	public List<Phong> getPhongHocConTrong(@Param("maLoai") String maLoai, @Param("maDay") String maDay, @Param("ngayHoc") Date ngayHoc, 
			@Param("maCa") String maCa);

}
