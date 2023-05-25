package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.CaHoc;
import com.kltn.api.entity.KhoaHoc;

public interface KhoaHocService {
	public void saveOrUpdateKhoaHoc(KhoaHoc khoaHoc);
	public String autoId();
	public List<KhoaHoc> getAllKhoaHoc();
	
	
}
