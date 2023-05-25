package com.kltn.api.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class ChiTietHocPhanPK implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String hocPhan;
	private String hocKy;
	private String chuongTrinhKhung;
	@Override
	public int hashCode() {
		return Objects.hash(chuongTrinhKhung, hocKy, hocPhan);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChiTietHocPhanPK other = (ChiTietHocPhanPK) obj;
		return Objects.equals(chuongTrinhKhung, other.chuongTrinhKhung) && Objects.equals(hocKy, other.hocKy)
				&& Objects.equals(hocPhan, other.hocPhan);
	}
	
	
	
}
