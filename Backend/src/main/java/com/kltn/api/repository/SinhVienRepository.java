package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.NhanVien;
import com.kltn.api.entity.SinhVien;

public interface SinhVienRepository extends JpaRepository<SinhVien, String>{
	 @Query(value = "SELECT top(1) ma_sinh_vien  FROM sinh_vien ORDER BY ma_sinh_vien DESC ", nativeQuery = true)
	 public String findTopByOrderBymaSinhVienDesc();
	 
	 @Query("SELECT COUNT(sv.maSinhVien) FROM SinhVien sv WHERE sv.lopHoc LIKE CONCAT('%', :classID, '%')")
	  public  Long countStudentsByClass(@Param("classID") String classID);
	 
	 @Query("SELECT sv FROM SinhVien sv WHERE lower(sv.tenSinhVien) LIKE lower(concat('%', :textSearch, '%')) "
	            + "OR lower(sv.soCCCD) LIKE lower(concat('%', :textSearch, '%')) " + "OR lower(sv.maSinhVien) LIKE lower(concat('%', :textSearch, '%'))")
	  public List<SinhVien> timKiemSinhVien(@Param("textSearch") String textSearch);
	 
	 @Query(value = "SELECT COUNT (sinh_vien.ma_sinh_vien)\r\n"
	 		+ "FROM     sinh_vien INNER JOIN\r\n"
	 		+ "                  phieu_dang_ky_hoc_phan ON sinh_vien.ma_sinh_vien = phieu_dang_ky_hoc_phan.id_sinh_vien INNER JOIN\r\n"
	 		+ "                  chi_tiet_phieu_dang_ky ON phieu_dang_ky_hoc_phan.ma_phieu_dang_ky = chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp INNER JOIN\r\n"
	 		+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
	 		+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan where lop_hoc_phan.ma_lop_hoc_phan like :maLHP", nativeQuery = true)
	 public int countSinhVienByLHP(@Param("maLHP") String maLHP);
	 
	 @Query(value = "SELECT COUNT (sinh_vien.ma_sinh_vien)\r\n"
	 		+ "FROM     sinh_vien INNER JOIN\r\n"
	 		+ "                  phieu_dang_ky_hoc_phan ON sinh_vien.ma_sinh_vien = phieu_dang_ky_hoc_phan.id_sinh_vien INNER JOIN\r\n"
	 		+ "                  chi_tiet_phieu_dang_ky ON phieu_dang_ky_hoc_phan.ma_phieu_dang_ky = chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp INNER JOIN\r\n"
	 		+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom where nhom_thuc_hanh.ma_nhom like :maNTH", nativeQuery = true)
	 public int countSinhVienByNTH(@Param("maNTH") String maNTH);
	 
	 @Query(value = "select COUNT(ma_sinh_vien) from sinh_vien where so_dien_thoai like :soDT", nativeQuery = true)
	 public int countSinhVienBySDT(@Param("soDT") String soDT);
	 
	 @Query(value = "select COUNT(ma_sinh_vien) from sinh_vien where email like :email", nativeQuery = true)
	 public int countSinhVienByEmail(@Param("email") String email);
	 
	 @Query(value = "select COUNT(ma_sinh_vien) from sinh_vien where socccd like :soCCCD", nativeQuery = true)
	 public int countSinhVienBySoCCCD(@Param("soCCCD") String soCCCD);
	 
	 @Query(value = "SELECT distinct sinh_vien.*\r\n"
	 		+ "FROM     sinh_vien INNER JOIN\r\n"
	 		+ "                  phieu_dang_ky_hoc_phan ON sinh_vien.ma_sinh_vien = phieu_dang_ky_hoc_phan.id_sinh_vien INNER JOIN\r\n"
	 		+ "                  chi_tiet_phieu_dang_ky ON phieu_dang_ky_hoc_phan.ma_phieu_dang_ky = chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp INNER JOIN\r\n"
	 		+ "                  nhom_thuc_hanh ON chi_tiet_phieu_dang_ky.ma_nhomth = nhom_thuc_hanh.ma_nhom INNER JOIN\r\n"
	 		+ "                  lich ON nhom_thuc_hanh.ma_nhom = lich.ma_nhomth where nhom_thuc_hanh.ma_lop_hoc_phan =:maLHP and nhom_thuc_hanh.ten_nhom = N'Nhóm 0'", nativeQuery = true)
	 public List<SinhVien> getSinhVienByMaLHP(@Param("maLHP") String maLHP);
	 	 
}
