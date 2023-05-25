package com.kltn.api.entity;

import java.util.List;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoaiDangKyHP{
	@Id
	private String maLoaiDKHP;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenLoaiDKHP;
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	public LoaiDangKyHP(String maLoaiDKHP) {
		super();
		this.maLoaiDKHP = maLoaiDKHP;
	}
	
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "loaiDangKyHP")
//	private List<ChiTietPhieuDangKy> dsChiTietPhieuDangKi;
		
}
