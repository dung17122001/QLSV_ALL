package com.kltn.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class KhoaHoc {
	@Id
	private String maKhoaHoc;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenKhoaHoc;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	public KhoaHoc(String maKhoaHoc) {
		super();
		this.maKhoaHoc = maKhoaHoc;
	}
	
	
}
