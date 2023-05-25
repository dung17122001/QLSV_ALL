package com.kltn.api.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChucVu {
	
	@Id
	private String maChucVu;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenChucVu;
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	public ChucVu(String maChucVu) {
		super();
		this.maChucVu = maChucVu;
	}
	
	
	
}
