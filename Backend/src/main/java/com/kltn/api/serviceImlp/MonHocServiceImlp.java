package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.MonHoc;
import com.kltn.api.repository.MonHocRepository;
import com.kltn.api.service.MonHocService;

@Service
@Transactional
public class MonHocServiceImlp implements MonHocService{
	
	@Autowired
	private MonHocRepository monHocRepository;
	

	@Override
	public List<MonHoc> getAllMonHoc() {
		// TODO Auto-generated method stub
		return monHocRepository.findAll();
	}

	@Override
	public MonHoc getMonHocById(String id) {
		// TODO Auto-generated method stub
		return monHocRepository.findById(id).get();
	}

	@Override
	public void addOrUpdateMonHoc(MonHoc monHoc) {
		
		monHocRepository.save(monHoc);
	}

	@Override
	public String autoId() {
		int id = monHocRepository.autoId();
	    String maMH = "MH" + String.format("%05d", id+1);
	    return maMH;
	}

	@Override
	public List<MonHoc> getMonHocByTextSearch(String valueSearch) {
		// TODO Auto-generated method stub
		return monHocRepository.getMonHocByTextSearch(valueSearch);
	}

}
