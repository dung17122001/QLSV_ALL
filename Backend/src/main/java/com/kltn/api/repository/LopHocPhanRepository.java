package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.LopHocPhan;
import com.kltn.api.entity.MonHoc;

public interface LopHocPhanRepository extends JpaRepository<LopHocPhan, String>{
	@Query("SELECT MAX(lhp.maLopHocPhan) FROM LopHocPhan lhp")
	public String getMaxId();
	
	@Query(value = "SELECT DISTINCT lop_hoc_phan.*\r\n"
			+ "FROM     lop_hoc_phan INNER JOIN\r\n"
			+ "                  hoc_phan ON lop_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  chi_tiet_hoc_phan ON hoc_phan.ma_hoc_phan = chi_tiet_hoc_phan.ma_hoc_phan\r\n"
			+ "				  where chi_tiet_hoc_phan.ma_hoc_phan like :maHP and lop_hoc_phan.ma_hoc_ky like :maHK", nativeQuery = true)
	public List<LopHocPhan> getLopHocPhanTheoMaHocPhan(@Param("maHP") String maHP, @Param("maHK") String maHK);
	
	@Query(value = "SELECT lop_hoc_phan.*\r\n"
			+ "FROM     sinh_vien INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON sinh_vien.ma_sinh_vien = phieu_dang_ky_hoc_phan.id_sinh_vien INNER JOIN\r\n"
			+ "                  chi_tiet_phieu_dang_ky ON phieu_dang_ky_hoc_phan.ma_phieu_dang_ky = chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp INNER JOIN\r\n"
			+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan where sinh_vien.ma_sinh_vien like :maSinhVien AND phieu_dang_ky_hoc_phan.ma_hoc_ky like :maHK", nativeQuery = true)
	public List<LopHocPhan> getLopHocPhanTheoMaSVAndHK(@Param("maSinhVien") String maSinhVien, @Param("maHK") String maHK);
	
	@Query(value = "SELECT DISTINCT lop_hoc_phan.*\r\n"
			+ "FROM     lop_hoc_phan INNER JOIN\r\n"
			+ "                  hoc_phan ON lop_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  chi_tiet_hoc_phan ON hoc_phan.ma_hoc_phan = chi_tiet_hoc_phan.ma_hoc_phan\r\n"
			+ "				  where chi_tiet_hoc_phan.ma_hoc_phan like :maHP", nativeQuery = true)
	public List<LopHocPhan> getLopHocPhanTheoMaHP(@Param("maHP") String maHP);

	@Query(value = " SELECT DISTINCT \r\n"
			+ "                  lop_hoc_phan.*\r\n"
			+ "FROM     nhan_vien INNER JOIN\r\n"
			+ "                  lich ON nhan_vien.ma_nhan_vien = lich.id_nhan_vien INNER JOIN\r\n"
			+ "                  nhom_thuc_hanh ON lich.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan INNER JOIN\r\n"
			+ "                  hoc_phan ON lop_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  chi_tiet_phieu_dang_ky ON nhom_thuc_hanh.ma_nhom = chi_tiet_phieu_dang_ky.ma_nhomth INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky\r\n"
			+ "						  where nhan_vien.ma_nhan_vien like :maGV and phieu_dang_ky_hoc_phan.ma_hoc_ky like :maHK and hoc_phan.ma_hoc_phan like :maHP", nativeQuery = true)
	public List<LopHocPhan> getTatCaLHPByHocPhanAndMaGVAndMaHK(@Param("maGV") String maGV, @Param("maHK") String maHK, @Param("maHP") String maHP);
	
	@Query("SELECT lhp FROM LopHocPhan lhp WHERE lower(lhp.tenLopHocPhan) LIKE lower(concat('%', :valueSearch, '%')) "
            + "OR lower(lhp.maLopHocPhan) LIKE lower(concat('%', :valueSearch, '%'))")
	public List<LopHocPhan> getLopHocPhanByTextSearch(@Param("valueSearch") String valueSearch);
	
	
	@Query(value = "select * from lop_hoc_phan where ma_lop_hoc_phan like :maLHP", nativeQuery = true)
	public LopHocPhan getLopHocPhanByMaLHP(@Param("maLHP") String maLHP);
	
	@Query(value = "delete lop_hoc_phan where lop_hoc_phan.ma_lop_hoc_phan like :maLHP", nativeQuery = true)
	@Modifying
	public void xoaLopHocPhanTheoMaLHP(@Param("maLHP") String maLHP);
	
	@Query(value = "SELECT DISTINCT \r\n"
			+ "			                lop_hoc_phan.*\r\n"
			+ "			FROM     nhan_vien INNER JOIN\r\n"
			+ "			                  lich ON nhan_vien.ma_nhan_vien = lich.id_nhan_vien INNER JOIN\r\n"
			+ "			                 nhom_thuc_hanh ON lich.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
			+ "			                 lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan INNER JOIN\r\n"
			+ "			                 hoc_phan ON lop_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "			               chi_tiet_phieu_dang_ky ON nhom_thuc_hanh.ma_nhom = chi_tiet_phieu_dang_ky.ma_nhomth INNER JOIN\r\n"
			+ "			               phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky\r\n"
			+ "								  where nhan_vien.ma_nhan_vien like :maGV and lop_hoc_phan.ma_hoc_ky like :maHK and nhom_thuc_hanh.ten_nhom = N'Nhóm 0'", nativeQuery = true)
	public List<LopHocPhan> getLopHocPhanByMaGVAndMaHK(@Param("maGV") String maGV, @Param("maHK") String maHK);
}
