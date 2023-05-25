package com.kltn.api.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChuongTrinhKhung{
	@Id
	private String maChuongTrinhKhung;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenChuongTrinhKhung;
	private Integer tongSoTinChi;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "idNganh")
	private NganhHoc nganhHoc;
	
	@ManyToOne
	@JoinColumn(name = "maKhoaHoc")
	private KhoaHoc khoaHoc;

	public ChuongTrinhKhung(String maChuongTrinhKhung) {
		super();
		this.maChuongTrinhKhung = maChuongTrinhKhung;
	}
	
	
}
