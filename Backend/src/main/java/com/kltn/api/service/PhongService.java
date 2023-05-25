package com.kltn.api.service;

import java.sql.Date;
import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.Phong;

public interface PhongService {
	public List<Phong> getAllPhong();
	public Phong getPhongById(String id);
	public void addOrUpdatePhong(Phong phong);
	public String autoId();
	public List<Phong> getPhongHocConTrong(String maLoai, String maDay,  Date ngayHoc,  String maCa);

}
