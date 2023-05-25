package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.DayNha;
import com.kltn.api.repository.DayNhaRepository;
import com.kltn.api.service.DayNhaService;



@Service
@Transactional
public class DayNhaServiceImpl implements DayNhaService{
	@Autowired
	private DayNhaRepository dayNhaRepository;
	
	@Override
	public List<DayNha> getAllDayNha() {
		// TODO Auto-generated method stub
		return dayNhaRepository.findAll();
	}

	@Override
	public void addOrUpdateDayNha(DayNha dayNha) {
		// TODO Auto-generated method stub
		dayNhaRepository.save(dayNha);
		
	}

	@Override
	public DayNha getDayNhaById(String id) {
		// TODO Auto-generated method stub
		return dayNhaRepository.getById(id);
	}

	@Override
	public String autoId() {
		// TODO Auto-generated method stub
		int id = dayNhaRepository.autoId();
		String naturalId = "D" + String.format("%03d", id+1);
		return naturalId;
	}

	@Override
	public List<DayNha> timKiemDayNha(String textSearch) {
		// TODO Auto-generated method stub
		return dayNhaRepository.timKiemDayNha(textSearch);
	}

	@Override
	public List<DayNha> getDayNhaTheoTen(String tenDayNha) {
		// TODO Auto-generated method stub
		return dayNhaRepository.getDayNhaTheoTen(tenDayNha);
	}

}
