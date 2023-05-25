package com.kltn.api.serviceImlp;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.CaHoc;
import com.kltn.api.repository.CaHocRepository;
import com.kltn.api.service.CaHocService;

@Service
@Transactional
public class CaHocServiceImpl implements CaHocService{

	@Autowired 
	private CaHocRepository caHocRepository;
	@Override
	public void saveOrUpdateCaHoc(CaHoc caHoc) {
		// TODO Auto-generated method stub
		caHocRepository.save(caHoc);
		
	}

	@Override
	public List<CaHoc> getAllCaHoc() {
		// TODO Auto-generated method stub
		return caHocRepository.findAll();
	}

	@Override
	public CaHoc getCaHocById(String id) {
		// TODO Auto-generated method stub
		return caHocRepository.getById(id);
	}

	@Override
	public String autoId() {
		// TODO Auto-generated method stub
		int id = caHocRepository.autoId();
		String naturalId = "CA" + String.format("%03d", id+1);
		return naturalId;
	}

	@Override
	public List<CaHoc> getTatCaCaHocKhongTrungLichDayCuaGV(String maGV, Date ngayDay) {
		// TODO Auto-generated method stub
		return caHocRepository.getTatCaCaHocKhongTrungLichDayCuaGV(maGV, ngayDay);
	}

}
