package com.kltn.api.service;

import java.util.List;

import com.kltn.api.entity.DayNha;
import com.kltn.api.entity.SinhVien;

public interface DayNhaService {
	public List<DayNha> getAllDayNha();
	public void addOrUpdateDayNha(DayNha dayNha);
	public DayNha getDayNhaById(String id);
	public String autoId();
	public List<DayNha> timKiemDayNha(String textSearch);
	
	public List<DayNha> getDayNhaTheoTen(String tenDayNha);
}
