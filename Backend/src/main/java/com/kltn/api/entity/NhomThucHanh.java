package com.kltn.api.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NhomThucHanh {
	@Id
	private String maNhom;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenNhom;
	private Integer soLuongSV;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne
	@JoinColumn(name = "maLopHocPhan")
	private LopHocPhan lopHocPhan;
	
	public NhomThucHanh(String maNhom) {
		super();
		this.maNhom = maNhom;
	}
	
	
}
