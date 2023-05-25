package com.kltn.api.entity;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Khoa {
	@Id
	private String maKhoa;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenKhoa;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "khoa")
//	private List<NhanVien> dsNhanVien;
	
//	@OneToMany(cascade = CascadeType.ALL, mappedBy = "khoa")
//	private List<NganhHoc> dsNganhHoc;
	


	public Khoa(String maKhoa) {
		super();
		this.maKhoa = maKhoa;
	}

	public void setId(String khoaId) {
		// TODO Auto-generated method stub
		
	}

	

	



	
}
