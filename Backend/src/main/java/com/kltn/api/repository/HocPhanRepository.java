package com.kltn.api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.HocPhan;

public interface HocPhanRepository extends JpaRepository<HocPhan, String>{
	@Query("SELECT COUNT(*) val_count FROM HocPhan")
	public int autoId();
	
	@Query(value = "SELECT DISTINCT hoc_phan.*"
			+ "FROM     chi_tiet_hoc_phan INNER JOIN\r\n"
			+ "                  hoc_ky ON chi_tiet_hoc_phan.ma_hoc_ky = hoc_ky.ma_hoc_ky INNER JOIN\r\n"
			+ "                  hoc_phan ON chi_tiet_hoc_phan.ma_hoc_phan = hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  mon_hoc ON hoc_phan.ma_mon_hoc = mon_hoc.ma_mon_hoc\r\n"
			+ "				  where hoc_ky.ma_hoc_ky like :maHocKy ", nativeQuery = true)
	public List<HocPhan> getHocPhanTheoHocKy(@Param("maHocKy") String maHocKy);
	
	@Query(value = "SELECT hoc_phan.*\r\n"
			+ "FROM     hoc_phan INNER JOIN\r\n"
			+ "                  mon_hoc ON hoc_phan.ma_mon_hoc = mon_hoc.ma_mon_hoc\r\n"
			+ "				  where mon_hoc.ma_mon_hoc like :maMH", nativeQuery = true)
	public HocPhan getHocPhanTheoMaMH(@Param("maMH") String maMH);
	
	@Query(value = "SELECT DISTINCT hoc_phan.ma_hoc_phan, hoc_phan.ten_hoc_phan, hoc_phan.trang_thai, hoc_phan.ma_mon_hoc\r\n"
			+ "FROM     hoc_phan INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON hoc_phan.ma_hoc_phan = lop_hoc_phan.ma_hoc_phan INNER JOIN\r\n"
			+ "                  nhom_thuc_hanh ON lop_hoc_phan.ma_lop_hoc_phan = nhom_thuc_hanh.ma_lop_hoc_phan INNER JOIN\r\n"
			+ "                  nhan_vien INNER JOIN\r\n"
			+ "                  lich ON nhan_vien.ma_nhan_vien = lich.id_nhan_vien ON nhom_thuc_hanh.ma_nhom = lich.ma_nhomth INNER JOIN\r\n"
			+ "                  chi_tiet_phieu_dang_ky ON nhom_thuc_hanh.ma_nhom = chi_tiet_phieu_dang_ky.ma_nhomth INNER JOIN\r\n"
			+ "                  phieu_dang_ky_hoc_phan ON chi_tiet_phieu_dang_ky.ma_phieu_dang_kyhp = phieu_dang_ky_hoc_phan.ma_phieu_dang_ky where  nhan_vien.ma_nhan_vien like :maGV and phieu_dang_ky_hoc_phan.ma_hoc_ky like :maHK", nativeQuery = true)
	public List<HocPhan> getHocPhanTheoKyVaMaGV(@Param("maGV") String maGV, @Param("maHK") String maHK);
	

}
