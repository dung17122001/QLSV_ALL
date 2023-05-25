package com.kltn.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NhanVien;

//@RepositoryRestResource(path = "khoa")
public interface KhoaRepository extends JpaRepository<Khoa, String>{
	@Query("SELECT COUNT(*) val_count FROM Khoa")
	public int autoId();

	 @Query("SELECT k FROM Khoa k WHERE lower(k.tenKhoa) LIKE lower(concat('%', :textSearch, '%')) "
	            + "OR lower(k.maKhoa) LIKE lower(concat('%', :textSearch, '%'))")
	  public List<Khoa> timKiemKhoa(@Param("textSearch") String textSearch);
	 
	 @Query(value = "SELECT * FROM Khoa k WHERE k.ten_khoa like :tenKhoa", nativeQuery = true)
	 public List<Khoa> getKhoaTheoTen(@Param("tenKhoa") String tenKhoa);


}
