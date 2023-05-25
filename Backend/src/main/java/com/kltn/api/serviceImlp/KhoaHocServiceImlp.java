package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.KhoaHoc;
import com.kltn.api.repository.KhoaHocRepository;
import com.kltn.api.service.KhoaHocService;

@Service
@Transactional
public class KhoaHocServiceImlp implements KhoaHocService{
	
	@Autowired
	private KhoaHocRepository khoaHocRepository;

	@Override
	public void saveOrUpdateKhoaHoc(KhoaHoc khoaHoc) {
		khoaHocRepository.save(khoaHoc);
		// TODO Auto-generated method stub
		
	}

	@Override
	public String autoId() {
		 int id = khoaHocRepository.autoId();
		    String naturalId = "KHOA" + String.format("%05d", id+1);
		    return naturalId;
	}

	@Override
	public List<KhoaHoc> getAllKhoaHoc() {
		// TODO Auto-generated method stub
		return khoaHocRepository.findAll();
	}

}
