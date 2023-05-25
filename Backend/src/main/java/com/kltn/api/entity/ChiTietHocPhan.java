package com.kltn.api.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@IdClass(ChiTietHocPhanPK.class)
@Table
@Data
public class ChiTietHocPhan implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "maHocPhan")
	private HocPhan hocPhan;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "maHocKy")
	private HocKy hocKy;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "maChuongTrinhKhung")
	private ChuongTrinhKhung chuongTrinhKhung;
	
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
}
