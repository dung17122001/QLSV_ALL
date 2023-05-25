package com.kltn.api.entity;

import java.sql.Date;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HocKy {
	@Id
	private String maHocKy;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenHocKy;
	private Date thoiGianBD;
	private Date thoiGianKT;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	public HocKy(String maHocKy) {
		super();
		this.maHocKy = maHocKy;
	}
	
	
}
