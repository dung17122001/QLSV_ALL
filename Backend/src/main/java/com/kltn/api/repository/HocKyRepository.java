package com.kltn.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.Khoa;

public interface HocKyRepository extends JpaRepository<HocKy, String>{
	@Query("SELECT COUNT(*) val_count FROM HocKy")
	public int autoId();
	
	 @Query("SELECT hk FROM HocKy hk WHERE lower(hk.tenHocKy) LIKE lower(concat('%', :textSearch, '%')) "
	            + "OR lower(hk.maHocKy) LIKE lower(concat('%', :textSearch, '%'))")
	  public List<HocKy> timKiemHocKy(@Param("textSearch") String textSearch);
	 
	 @Query("SELECT h FROM HocKy h WHERE h.thoiGianKT BETWEEN :startDate AND :endDate ORDER BY h.thoiGianKT ASC")
	    List<HocKy> findHocKyByThoiGianKTBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
	 
	 @Query(value = "SELECT hoc_ky.*\r\n"
	 		+ "FROM     chuong_trinh_khung INNER JOIN\r\n"
	 		+ "                  chi_tiet_hoc_ky ON chuong_trinh_khung.ma_chuong_trinh_khung = chi_tiet_hoc_ky.ma_chuong_trinh_khung INNER JOIN\r\n"
	 		+ "                  hoc_ky ON chi_tiet_hoc_ky.ma_hoc_ky = hoc_ky.ma_hoc_ky\r\n"
	 		+ "				  where chuong_trinh_khung.ma_chuong_trinh_khung like :maCTK", nativeQuery = true)
	 public List<HocKy> getHocKyByMaCTK(@Param("maCTK") String maCTK);
	 
	 
	 
	 @Query(value = "SELECT DISTINCT hoc_ky.*\r\n"
	 		+ "FROM     sinh_vien INNER JOIN\r\n"
	 		+ "                  khoa_hoc ON sinh_vien.ma_khoa_hoc = khoa_hoc.ma_khoa_hoc INNER JOIN\r\n"
	 		+ "                  chuong_trinh_khung ON khoa_hoc.ma_khoa_hoc = chuong_trinh_khung.ma_khoa_hoc INNER JOIN\r\n"
	 		+ "                  chi_tiet_hoc_ky ON chuong_trinh_khung.ma_chuong_trinh_khung = chi_tiet_hoc_ky.ma_chuong_trinh_khung INNER JOIN\r\n"
	 		+ "                  hoc_ky ON chi_tiet_hoc_ky.ma_hoc_ky = hoc_ky.ma_hoc_ky  where khoa_hoc.ma_khoa_hoc like :maKhoaHoc", nativeQuery = true)
	 public List<HocKy> getHocKyByKhoaHoc(@Param("maKhoaHoc") String maKhoaHoc);
	 
	 @Query(value = "select * from hoc_ky where ten_hoc_ky like :tenHocKy", nativeQuery = true)
	 public List<HocKy> getHocKyTheoTen(@Param("tenHocKy") String tenHocKy);
}
