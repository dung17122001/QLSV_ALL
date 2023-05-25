package com.kltn.api.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import com.kltn.api.entity.CaHoc;
import com.kltn.api.entity.NhomThucHanh;

public interface NhomTHService {
	public void saveOrUpdateNhomTH(NhomThucHanh nhomThucHanh);
	public List<NhomThucHanh> getAllNhomTH();
	public String autoId();
	public List<NhomThucHanh> getNhomTHTheoMaLHP(String maLHP);
	public List<NhomThucHanh> getAllNhomTHByMaLHP( String maLHP);
	public void xoaTatCaNhomTHTheoMaLHP( String maLHP);
}
