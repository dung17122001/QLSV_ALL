package com.kltn.api.service;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.CaHoc;

public interface CaHocService {

	public void saveOrUpdateCaHoc(CaHoc caHoc);
	public List<CaHoc> getAllCaHoc();
	public CaHoc getCaHocById(String id);
	public String autoId();
	public List<CaHoc> getTatCaCaHocKhongTrungLichDayCuaGV( String maGV, Date ngayDay);
	}
