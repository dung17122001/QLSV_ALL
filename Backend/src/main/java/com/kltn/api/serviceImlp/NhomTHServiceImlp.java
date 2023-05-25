package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.NhomThucHanh;
import com.kltn.api.repository.LopHocPhanRepository;
import com.kltn.api.repository.NhomTHRepository;
import com.kltn.api.service.NhomTHService;

@Service
@Transactional
public class NhomTHServiceImlp implements NhomTHService{
	
	@Autowired
	private NhomTHRepository nhomTHRepository;
	@Autowired
	private LopHocPhanRepository lopHocPhanRepository;

	@Override
	public void saveOrUpdateNhomTH(NhomThucHanh nhomThucHanh) {
		// TODO Auto-generated method stub
		var lhp = lopHocPhanRepository.findById(nhomThucHanh.getLopHocPhan().getMaLopHocPhan()).get();
		nhomThucHanh.setLopHocPhan(lhp);
		nhomTHRepository.save(nhomThucHanh);
	}

	@Override
	public List<NhomThucHanh> getAllNhomTH() {
		// TODO Auto-generated method stub
		return nhomTHRepository.findAll();
	}

	@Override
	public String autoId() {
		String maxId = nhomTHRepository.getMaxId(); // Lấy id lớn nhất hiện tại
	    if (maxId == null) {
	        return "NTH00001"; // Nếu không có dữ liệu, trả về giá trị mặc định
	    } else {
	        String prefix = maxId.substring(0, 3); // Tách phần prefix từ id lớn nhất
	        int number = Integer.parseInt(maxId.substring(5)); // Tách phần số từ id lớn nhất
	        number++; // Tăng giá trị số lên 1
	        String newId = prefix + String.format("%05d", number); // Tạo id mới
	        return newId;
	    }
	}

	@Override
	public List<NhomThucHanh> getNhomTHTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		return nhomTHRepository.getNhomTHTheoMaLHP(maLHP);
	}

	@Override
	public List<NhomThucHanh> getAllNhomTHByMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		return nhomTHRepository.getAllNhomTHByMaLHP(maLHP);
	}

	@Override
	public void xoaTatCaNhomTHTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		nhomTHRepository.xoaTatCaNhomTHTheoMaLHP(maLHP);
	}

}
