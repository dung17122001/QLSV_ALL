package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.LoaiPhong;
import com.kltn.api.repository.LoaiPhongRepository;
import com.kltn.api.service.LoaiPhongService;

@Service
@Transactional
public class LoaiPhongServiceImpl implements LoaiPhongService{
	@Autowired
	private LoaiPhongRepository loaiPhongRepository;

	@Override
	public List<LoaiPhong> getAllLoaiPhong() {
		// TODO Auto-generated method stub
		return loaiPhongRepository.findAll();
	}

	@Override
	public LoaiPhong getLoaiPhongById(String id) {
		// TODO Auto-generated method stub
		return loaiPhongRepository.getById(id);
	}

	@Override
	public void addOrUpdateLoaiPhong(LoaiPhong loaiPhong) {
		// TODO Auto-generated method stub
		loaiPhongRepository.save(loaiPhong);
		
	}
	@Override
	public String autoId() {
		 int id = loaiPhongRepository.autoId();
		    String naturalId = "LP" + String.format("%03d", id+1);
		    return naturalId;
	}

}
