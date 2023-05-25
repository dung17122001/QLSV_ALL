package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.LopHoc;
import com.kltn.api.entity.NganhHoc;

public interface LopHocService {
	public void saveOrUpdateLopHoc(LopHoc lopHoc);
	public List<LopHoc> getAllLopHoc();
	public LopHoc getLopHocById(String id);
	public List<LopHoc> getLopHocByNganhHoc(NganhHoc nganhHoc);
	public String autoId();
	
	public int countLopHocByTenLopHoc(String tenLop);
}
