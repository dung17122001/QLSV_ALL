package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.NhomThucHanh;

public interface NhomTHRepository extends JpaRepository<NhomThucHanh, String>{
	@Query("SELECT MAX(nth.maNhom) FROM NhomThucHanh nth")
	public String getMaxId();
	
	@Query(value = "SELECT nhom_thuc_hanh.*\r\n"
			+ "FROM     nhom_thuc_hanh INNER JOIN\r\n"
			+ "                  lop_hoc_phan ON nhom_thuc_hanh.ma_lop_hoc_phan = lop_hoc_phan.ma_lop_hoc_phan \r\n"
			+ "				  where lop_hoc_phan.ma_lop_hoc_phan like :maLHP ", nativeQuery = true)
	public List<NhomThucHanh> getNhomTHTheoMaLHP(@Param("maLHP") String maLHP);//bat trung nhưng nhom TH da co
	
	@Query(value = "SELECT nhom_thuc_hanh.*\r\n"
			+ "FROM     nhom_thuc_hanh where ma_lop_hoc_phan like :maLHP", nativeQuery = true)
	public List<NhomThucHanh> getAllNhomTHByMaLHP(@Param("maLHP") String maLHP);//lay tat ca nhom TH
	
	@Query(value = "delete nhom_thuc_hanh where nhom_thuc_hanh.ma_lop_hoc_phan like :maLHP", nativeQuery = true)
	@Modifying
	public void xoaTatCaNhomTHTheoMaLHP(@Param("maLHP") String maLHP);
	
}
