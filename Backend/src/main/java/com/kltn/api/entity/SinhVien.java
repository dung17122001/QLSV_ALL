package com.kltn.api.entity;

import java.sql.Date;
import org.hibernate.annotations.NaturalId;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SinhVien extends Nguoi{
	@Id
	private String maSinhVien;
	@Column(name = "tenSinhVien", columnDefinition = "nvarchar(255)")
	private String tenSinhVien;
	private Boolean gioiTinh;
	@Column( columnDefinition = "nvarchar(255)")
	private Date ngayVaoTruong;
	
	@ManyToOne
	@JoinColumn(name = "maKhoaHoc")
	private KhoaHoc khoaHoc;
	
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne
	@JoinColumn(name = "maLopHoc")
	private LopHoc lopHoc;
	
	
//	@Embedded
//	private HoSo hoSo;


	public SinhVien(String maSinhVien) {
		super();
		this.maSinhVien = maSinhVien;
	}

	


}
