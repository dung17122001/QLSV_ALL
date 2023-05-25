package com.kltn.api.entity;

import java.sql.Time;
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
public class CaHoc{
	@Id
	private String maCaHoc;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenCaHoc;
	private Time gioBD;
	private Time gioKT;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "caHoc")
//	private List<Lich> dsLich;

	public CaHoc(String maCaHoc) {
		super();
		this.maCaHoc = maCaHoc;
	}

	
	
	
}
