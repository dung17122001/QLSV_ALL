package com.kltn.api.entity;

import java.sql.Date;
import java.util.List;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class LopHocPhan{
	@Id
	private String maLopHocPhan;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenLopHocPhan;
	private Integer siSo;
	private Integer siSoThuc;
	private Date ngayBatDau;
	private Date ngayKetThuc;
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	
	
	@ManyToOne()
	@JoinColumn(name = "ma_hoc_phan")
	private HocPhan hocPhan;
	
	@ManyToOne()
	@JoinColumn(name = "ma_hoc_ky")
	private HocKy hocKy;
	
	public LopHocPhan(String maLopHocPhan) {
		super();
		this.maLopHocPhan = maLopHocPhan;
	}
	
	public void setId(String lopHocPhanId) {
		// TODO Auto-generated method stub
		
	}
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "maNhom")
//	private List<NhomThucHanh> listNhomThucHanh;
//	
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "lopHocPhan")
//	private List<BangDiem> dsBangDiem;
	
	
}
