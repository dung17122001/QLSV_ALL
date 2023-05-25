package com.kltn.api.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class HocPhan {
	@Id
	private String maHocPhan;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenHocPhan;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne()
	@JoinColumn(name = "ma_mon_hoc")
	private MonHoc monHoc;

	public HocPhan(String maHocPhan) {
		super();
		this.maHocPhan = maHocPhan;
	}
	
	
}
