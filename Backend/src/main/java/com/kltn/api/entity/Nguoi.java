package com.kltn.api.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Nguoi {
	public Date ngaySinh;
	
	public String soDienThoai;
	public String soCCCD;
	
	@Column( columnDefinition = "nvarchar(255)")
	public String diaChi;
	
	@Column( columnDefinition = "nvarchar(255)")
	public String noiSinh;
	
	public Date ngayCapCCCD;
	@Column( columnDefinition = "nvarchar(255)")
	public String noiCapCCCD;
	public String email;
	public String linkAnh;
	@Column( columnDefinition = "nvarchar(255)")
	public String doiTuong;
	@Column( columnDefinition = "nvarchar(255)")
	public String dienChinhSach;
	
	public Date ngayVaoDoan;
	
	public Date ngayVaoDang;
	
}
