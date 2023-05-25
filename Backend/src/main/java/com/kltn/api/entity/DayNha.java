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
public class DayNha{
	@Id
	private String maDayNha;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenDayNha;
	
	private Integer soTang;
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	public DayNha(String maDayNha) {
		super();
		this.maDayNha = maDayNha;
	}
	
	
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "dayNha")
//	private List<Phong> dsPhong;
}
