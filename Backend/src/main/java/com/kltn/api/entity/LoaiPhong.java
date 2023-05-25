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
public class LoaiPhong {
	@Id
	private String maLoaiPhong;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenLoaiPhong;
	public LoaiPhong(String maLoaiPhong) {
		super();
		this.maLoaiPhong = maLoaiPhong;
	}
	
	
	
}
