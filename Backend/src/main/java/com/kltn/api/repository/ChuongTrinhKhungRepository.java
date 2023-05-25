package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChuongTrinhKhung;
import com.kltn.api.entity.MonHoc;

public interface ChuongTrinhKhungRepository extends JpaRepository<ChuongTrinhKhung, String>{
	@Query("SELECT COUNT(*) val_count FROM ChuongTrinhKhung")
	public int autoId();
	
	@Query("SELECT ctk FROM ChuongTrinhKhung ctk WHERE lower(ctk.nganhHoc.tenNganh) LIKE lower(concat('%', :valueSearch, '%')) "
			+"OR lower(ctk.nganhHoc.maNganh) LIKE lower(concat('%', :valueSearch, '%')) "
            + "OR lower(ctk.maChuongTrinhKhung) LIKE lower(concat('%', :valueSearch, '%'))")
	public List<ChuongTrinhKhung> getCTKByTextSearch(@Param("valueSearch") String valueSearch);
	
	@Query(value = 
			"SELECT chuong_trinh_khung.*\r\n"
			+ "FROM     sinh_vien INNER JOIN\r\n"
			+ "                  khoa_hoc ON sinh_vien.ma_khoa_hoc = khoa_hoc.ma_khoa_hoc INNER JOIN\r\n"
			+ "                  chuong_trinh_khung ON khoa_hoc.ma_khoa_hoc = chuong_trinh_khung.ma_khoa_hoc where ma_sinh_vien like :maSinhVien", nativeQuery = true)
	public List<ChuongTrinhKhung> getCTKByMaSV(@Param("maSinhVien") String maSinhVien);
}
