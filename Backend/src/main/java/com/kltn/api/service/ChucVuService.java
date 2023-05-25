package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.ChucVu;

public interface ChucVuService {
	public List<ChucVu> getAllChucVu();
	public ChucVu getChucVuById(String id);
	public void saveOrUpdateChucVu(ChucVu chucVu);
	public String autoId();
}
