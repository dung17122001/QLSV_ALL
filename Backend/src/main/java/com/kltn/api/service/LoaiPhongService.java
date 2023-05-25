package com.kltn.api.service;

import java.util.List;


import com.kltn.api.entity.LoaiPhong;

public interface LoaiPhongService {
	public List<LoaiPhong> getAllLoaiPhong();
	public LoaiPhong getLoaiPhongById(String id);
	public void addOrUpdateLoaiPhong(LoaiPhong loaiPhong);
	public String autoId();

}