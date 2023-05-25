package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.ChiTietPhieuDangKy;

import com.kltn.api.entity.MonHoc;
import com.kltn.api.entity.Lich;

public interface ChiTietPhieuDKHPRepository extends JpaRepository<ChiTietPhieuDangKy, String>{

	
	 @Query(value = " SELECT chi_tiet_phieu_dang_ky.*\r\n"
	 		+ "FROM     chi_tiet_hoc_phan INNER JOIN\r\n"
	 		+ "                  hoc_phan ON chi_tiet_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
	 		+ "                  lop_hoc_phan ON hoc_phan.ma_hoc_phan = lop_hoc_phan.ma_hoc_phan INNER JOIN\r\n"
	 		+ "                  nhom_thuc_hanh ON lop_hoc_phan.ma_lop_hoc_phan = nhom_thuc_hanh.ma_lop_hoc_phan INNER JOIN\r\n"
	 		+ "                  chi_tiet_phieu_dang_ky ON nhom_thuc_hanh.ma_nhom = chi_tiet_phieu_dang_ky.ma_nhomth INNER JOIN\r\n"
	 		+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky INNER JOIN\r\n"
	 		+ "                  sinh_vien ON phieu_dang_ky_hoc_phan.id_sinh_vien = sinh_vien.ma_sinh_vien where ma_sinh_vien like :maSinhVien and phieu_dang_ky_hoc_phan.ma_hoc_ky like :maHocKy",nativeQuery = true)
	  public  List<ChiTietPhieuDangKy> findByMaHocKyAndMaSinhVien(@Param("maSinhVien") String maSinhVien,@Param("maHocKy") String maHocKy);

	@Query(value = "SELECT chi_tiet_phieu_dang_ky.*\r\n"
			+ "FROM     chi_tiet_phieu_dang_ky INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky INNER JOIN\r\n"
			+ "                  sinh_vien ON phieu_dang_ky_hoc_phan.id_sinh_vien = sinh_vien.ma_sinh_vien INNER JOIN\r\n"
			+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan\r\n"
			+ "				  where lop_hoc_phan.ma_lop_hoc_phan like :maLHP and chi_tiet_phieu_dang_ky.ma_nhomth like :maNhom\r\n"
			+ "				  ORDER BY RIGHT(sinh_vien.ten_sinh_vien, 1) ASC", nativeQuery = true)
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHP(@Param("maLHP") String maLHP, @Param("maNhom") String maNhom);
	
	@Query("SELECT distinct pdk FROM ChiTietPhieuDangKy pdk WHERE lower(pdk.nhomThucHanh.lopHocPhan.maLopHocPhan) LIKE lower(concat('%', :valueSearch, '%')) "
            + "OR lower(pdk.nhomThucHanh.lopHocPhan.tenLopHocPhan) LIKE lower(concat('%', :valueSearch, '%'))")
	public List<ChiTietPhieuDangKy> getMonHocByTextSearch(@Param("valueSearch") String valueSearch);
	
	@Query(value = "\r\n"
			+ "SELECT chi_tiet_phieu_dang_ky.*\r\n"
			+ "FROM     chi_tiet_phieu_dang_ky INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky INNER JOIN\r\n"
			+ "                  sinh_vien ON phieu_dang_ky_hoc_phan.id_sinh_vien = sinh_vien.ma_sinh_vien where ma_sinh_vien like :maSinhVien", nativeQuery = true)
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaSinhVien(@Param("maSinhVien") String maSinhVien);
	

	
	@Query(value = 
			"delete chi_tiet_phieu_dang_ky where ma_phieu_dang_kyhp like :maPhieuDK AND ma_nhomth like :maNhomTH", nativeQuery = true)
	@Modifying
	public void deleteChiTietPDKByMaPhieuDKAndMaNhomTH(@Param("maPhieuDK") String maPhieuDK,@Param("maNhomTH") String maNhomTH);
	
	@Query(value = "DELETE FROM chi_tiet_phieu_dang_ky\r\n"
			+ "WHERE EXISTS (\r\n"
			+ "    SELECT 1\r\n"
			+ "    FROM nhom_thuc_hanh\r\n"
			+ "    WHERE nhom_thuc_hanh.ma_nhom = chi_tiet_phieu_dang_ky.ma_nhomth\r\n"
			+ "    AND nhom_thuc_hanh.ma_lop_hoc_phan = :maLHP)", nativeQuery = true)
	@Modifying
	public void xoaTatCaChiTietPhieuTheoMaLHP(@Param("maLHP") String maLHP);
	
	@Query(value = "SELECT chi_tiet_phieu_dang_ky.*\r\n"
			+ "FROM     chi_tiet_phieu_dang_ky INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky INNER JOIN\r\n"
			+ "                  sinh_vien ON phieu_dang_ky_hoc_phan.id_sinh_vien = sinh_vien.ma_sinh_vien INNER JOIN\r\n"
			+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan\r\n"
			+ "				  where lop_hoc_phan.ma_lop_hoc_phan like :maLHP and nhom_thuc_hanh.ten_nhom like N'Nhóm 0'\r\n"
			+ "				  ORDER BY RIGHT(sinh_vien.ten_sinh_vien, 1) ASC", nativeQuery = true)
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHPDanhChoGV(@Param("maLHP") String maLHP);

}
