package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.ChucVu;
import com.kltn.api.repository.ChucVuRepository;
import com.kltn.api.service.ChucVuService;


@Service
@Transactional
public class ChucVuServiceImpl implements ChucVuService{
	@Autowired
	private ChucVuRepository chucVuRepository;

	@Override
	public List<ChucVu> getAllChucVu() {
		// TODO Auto-generated method stub
		return chucVuRepository.findAll();
	}

	@Override
	public ChucVu getChucVuById(String id) {
		// TODO Auto-generated method stub
		return chucVuRepository.getById(id);
	}

	@Override
	public void saveOrUpdateChucVu(ChucVu chucVu) {
		// TODO Auto-generated method stub
		chucVuRepository.save(chucVu);
		
	}

	@Override
	public String autoId() {
		int id = chucVuRepository.autoId();
		String naturalId = "CV" + String.format("%03d", id+1);
		return naturalId;
	}

}
