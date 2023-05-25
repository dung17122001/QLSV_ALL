package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.Khoa;
import com.kltn.api.repository.KhoaRepository;
import com.kltn.api.service.KhoaService;

@Service
@Transactional
public class KhoaSeviceImlp implements KhoaService{
	@Autowired
	private KhoaRepository khoaRepository;

	@Override
	public List<Khoa> getAllKhoa() {

		return khoaRepository.findAll();
	}

	@Override
	public Khoa getKhoaById(String id) {
		// TODO Auto-generated method stub
		return khoaRepository.getById(id);
	}

	@Override
	public void addOrUpdateKhoa(Khoa khoa) {
		khoaRepository.save(khoa);

	}

	@Override
	public String autoId() {
		int id = khoaRepository.autoId();
		String naturalId = "K" + String.format("%03d", id+1);
		return naturalId;
	}

	@Override
	public List<Khoa> timKiemKhoa(String textSearch) {
		// TODO Auto-generated method stub
		return khoaRepository.timKiemKhoa(textSearch);
	}

	@Override
	public List<Khoa> getKhoaTheoTen(String tenKhoa) {
		// TODO Auto-generated method stub
		return khoaRepository.getKhoaTheoTen(tenKhoa);
	}

}
