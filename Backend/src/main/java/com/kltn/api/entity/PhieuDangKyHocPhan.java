package com.kltn.api.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PhieuDangKyHocPhan{
	@Id
	private String maPhieuDangKy;

	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne
	@JoinColumn(name = "idSinhVien")
	private SinhVien sinhVien;
		
		@ManyToOne
	@JoinColumn(name = "maHocKy")
	private HocKy hocKy;

	public PhieuDangKyHocPhan(String maPhieuDangKy) {
		super();
		this.maPhieuDangKy = maPhieuDangKy;
	}
	
	
}
