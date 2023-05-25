package com.kltn.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocPhan;

public interface ChiTietHPRepository extends JpaRepository<ChiTietHocPhan, String>{
//	@Query("SELECT cthp FROM ChiTietHocPhan cthp JOIN cthp.hocKy hk\r\n"
//			+ "WHERE hk.thoiGianKT BETWEEN :startDate AND :endDate\r\n"
//			+ "ORDER BY hk.thoiGianKT ASC")
	@Query(value = "SELECT DISTINCT chi_tiet_hoc_phan.*, hoc_ky.thoi_giankt\r\n"
			+ "FROM     chi_tiet_hoc_phan INNER JOIN\r\n"
			+ "                  hoc_ky ON chi_tiet_hoc_phan.ma_hoc_ky = hoc_ky.ma_hoc_ky INNER JOIN\r\n"
			+ "                  hoc_phan ON chi_tiet_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan CROSS JOIN\r\n"
			+ "                  chuong_trinh_khung\r\n"
			+ "				  WHERE hoc_ky.thoi_giankt BETWEEN :startDate AND :endDate and chi_tiet_hoc_phan.ma_chuong_trinh_khung like :maCTK\r\n"
			+ "			ORDER BY hoc_ky.thoi_giankt ASC", nativeQuery = true)
	public List<ChiTietHocPhan> getChiTietHocPhanTheoKhoaHoc(@Param("startDate") Date startDate, @Param("endDate") Date endDate, @Param("maCTK") String maCTK);
	
	@Query(value = "SELECT chi_tiet_hoc_phan.*\r\n"
			+ "FROM     chi_tiet_hoc_ky INNER JOIN\r\n"
			+ "                  chi_tiet_hoc_phan ON chi_tiet_hoc_ky.ma_chuong_trinh_khung = chi_tiet_hoc_phan.ma_chuong_trinh_khung INNER JOIN\r\n"
			+ "                  chuong_trinh_khung ON chi_tiet_hoc_ky.ma_chuong_trinh_khung = chuong_trinh_khung.ma_chuong_trinh_khung AND chi_tiet_hoc_phan.ma_chuong_trinh_khung = chuong_trinh_khung.ma_chuong_trinh_khung INNER JOIN\r\n"
			+ "                  hoc_ky ON chi_tiet_hoc_ky.ma_hoc_ky = hoc_ky.ma_hoc_ky AND chi_tiet_hoc_phan.ma_hoc_ky = hoc_ky.ma_hoc_ky INNER JOIN\r\n"
			+ "                  hoc_phan ON chi_tiet_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  khoa_hoc ON chuong_trinh_khung.ma_khoa_hoc = khoa_hoc.ma_khoa_hoc INNER JOIN\r\n"
			+ "                  nganh_hoc ON chuong_trinh_khung.id_nganh = nganh_hoc.ma_nganh INNER JOIN\r\n"
			+ "                  lop_hoc ON nganh_hoc.ma_nganh = lop_hoc.id_nganh INNER JOIN\r\n"
			+ "                  sinh_vien ON khoa_hoc.ma_khoa_hoc = sinh_vien.ma_khoa_hoc AND lop_hoc.ma_lop = sinh_vien.ma_lop_hoc where ma_sinh_vien like :maSinhVien AND ma_nganh LIKE :maNganh", nativeQuery = true)
	    List<ChiTietHocPhan> findHocPhanByMaSinhVienAndMaNganh(@Param("maSinhVien") String maSinhVien, @Param("maNganh") String maNganh);
	
	@Query(value = "delete [dbo].[chi_tiet_hoc_phan] where [ma_chuong_trinh_khung] like :maCTK and [ma_hoc_ky] like :maHK and [ma_hoc_phan] like :maHP", nativeQuery = true)
	@Modifying
	public void removeMonHocOfChuongTrinhKhung(@Param("maCTK") String maCTK,@Param("maHK") String maHK,@Param("maHP") String maHP);
	
	@Query(value = "SELECT distinct chi_tiet_hoc_phan.*\r\n"
			+ "FROM     chi_tiet_hoc_phan where ma_chuong_trinh_khung in\r\n"
			+ "(SELECT chuong_trinh_khung.ma_chuong_trinh_khung\r\n"
			+ "FROM     sinh_vien INNER JOIN\r\n"
			+ "                  lop_hoc ON sinh_vien.ma_lop_hoc = lop_hoc.ma_lop INNER JOIN\r\n"
			+ "                  nganh_hoc ON lop_hoc.id_nganh = nganh_hoc.ma_nganh INNER JOIN\r\n"
			+ "                  chuong_trinh_khung ON nganh_hoc.ma_nganh = chuong_trinh_khung.id_nganh\r\n"
			+ "				  where sinh_vien.ma_sinh_vien like :maSV)", nativeQuery = true)
	public List<ChiTietHocPhan> getChuongTrinhKhungTheoMaSV(@Param("maSV") String maSV);
	
}
