package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NganhHoc;
import com.kltn.api.repository.KhoaRepository;
import com.kltn.api.repository.NganhRepository;
import com.kltn.api.service.NganhHocService;

@Service
@Transactional
public class NganhHocSeviceImlp implements NganhHocService{
	@Autowired
	private NganhRepository nganhRepository;
	@Autowired
	private KhoaRepository khoaRepository;
	
	@Override
	public void saveOrUpdateNganhHoc(NganhHoc nganhHoc) {
		if(!nganhHoc.getKhoa().getMaKhoa().equals("")) {
			var khoa = khoaRepository.findById(nganhHoc.getKhoa().getMaKhoa()).get();
			
			if(khoa != null) {
				nganhHoc.setKhoa(khoa);
			}
			else {
				khoa = new Khoa(nganhHoc.getKhoa().getMaKhoa());
				nganhHoc.setKhoa(khoa);
			}
			
		}
		nganhRepository.save(nganhHoc);
		
	}
	@Override
	public List<NganhHoc> getAllNganhHoc() {
		// TODO Auto-generated method stub
		return nganhRepository.findAll();
	}
	@Override
	public NganhHoc getNganhHocById(String id) {
		// TODO Auto-generated method stub
		return nganhRepository.getById(id);
	}
	@Override
	public String autoId() {
		 int id = nganhRepository.autoId();
		    String naturalId = "N" + String.format("%03d", id+1);
		    return naturalId;
	}
	
	@Override
	public List<NganhHoc> getNganhHocByKhoa(Khoa khoa) {
		// TODO Auto-generated method stub
		  return nganhRepository.findByKhoa(khoa);
	}
}
