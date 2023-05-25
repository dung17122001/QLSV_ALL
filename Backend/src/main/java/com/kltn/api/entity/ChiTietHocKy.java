package com.kltn.api.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ChiTietHocKyPK.class)
public class ChiTietHocKy implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "maChuongTrinhKhung")
	private ChuongTrinhKhung chuongTrinhKhung;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "maHocKy")
	private HocKy hocKy;
	
	
}
