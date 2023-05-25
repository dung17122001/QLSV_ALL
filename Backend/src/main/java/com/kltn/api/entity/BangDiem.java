package com.kltn.api.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
///@IdClass(BangDiemPK.class)
public class BangDiem implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	 	@Id
	    private String maBangDiem;

	    @ManyToOne
	    @JoinColumn(name = "ma_hoc_phan")
	    private HocPhan hocPhan;

	    @ManyToOne
	    @JoinColumn(name = "ma_sinh_vien")
	    private SinhVien sinhVien;
	
	@Column(  nullable = true)
	private Double thuongKy1;
	@Column(  nullable = true)
	private Double thuongKy2;
	@Column(  nullable = true)
	private Double thuongKy3;
	@Column(  nullable = true)
	private Double thuongKy4;
	@Column(  nullable = true)
	private Double thuongKy5;
	
	@Column(  nullable = true)
	private Double giuaKy;
	@Column(  nullable = true)
	private Double cuoiKy;
	
	@Column(  nullable = true)
	private Double thucHanh1;
	@Column(  nullable = true)
	private Double thucHanh2;
	@Column(  nullable = true)
	private Double thucHanh3;
	@Column(  nullable = true)
	private Double diemTongKet;
	
	
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
}
