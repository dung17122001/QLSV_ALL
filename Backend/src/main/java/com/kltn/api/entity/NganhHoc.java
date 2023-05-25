package com.kltn.api.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class NganhHoc{
	@Id
	private String maNganh;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenNganh;
	//private Integer tongTinChi;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne()
	@JoinColumn(name = "idKhoa")
	private Khoa khoa;

	public NganhHoc(String maNganh) {
		super();
		this.maNganh = maNganh;
	}

	public void setId(String nganhId) {
		// TODO Auto-generated method stub
		
	}

	
	
}
