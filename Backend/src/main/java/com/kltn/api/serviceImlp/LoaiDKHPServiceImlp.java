package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.ChuongTrinhKhung;
import com.kltn.api.entity.LoaiDangKyHP;
import com.kltn.api.repository.LoaiDKHPRepository;
import com.kltn.api.service.LoaiDKHPService;

@Service
@Transactional
public class LoaiDKHPServiceImlp implements LoaiDKHPService{
	
	@Autowired
	private LoaiDKHPRepository loaiDKHPRepository;

	@Override
	public List<LoaiDangKyHP> getAllLoaiDKHP() {
		// TODO Auto-generated method stub
		return loaiDKHPRepository.findAll();
	}

	@Override
	public void addOrUpdateLoaiDKHP(LoaiDangKyHP loaiDangKyHP) {
		// TODO Auto-generated method stub
		loaiDKHPRepository.save(loaiDangKyHP);
		
	}

	@Override
	public String autoId() {
		int id = loaiDKHPRepository.autoId();
		String naturalId = "LDK" + String.format("%03d", id+1);
		return naturalId;
	}

}
