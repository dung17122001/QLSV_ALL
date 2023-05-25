package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.ChuongTrinhKhung;
import com.kltn.api.entity.LoaiDangKyHP;

public interface LoaiDKHPService {
	public List<LoaiDangKyHP> getAllLoaiDKHP();
	//public LoaiDangKyHP getById(String id);
	public void addOrUpdateLoaiDKHP(LoaiDangKyHP loaiDangKyHP);
	public String autoId();
}
