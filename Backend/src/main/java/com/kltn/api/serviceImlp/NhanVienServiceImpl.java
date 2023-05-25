package com.kltn.api.serviceImlp;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.NhanVien;
import com.kltn.api.repository.NhanVienRepository;
import com.kltn.api.service.NhanVienService;

@Service
@Transactional
public class NhanVienServiceImpl implements NhanVienService{
	@Autowired
	private NhanVienRepository nhanVienRepository;

	@Override
	public void saveOrUpdateNhanVien(NhanVien nhanVien) {
		// TODO Auto-generated method stub
		
		nhanVienRepository.save(nhanVien);
		
	}

	@Override
	public List<NhanVien> getAllNhanVien() {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(0, 50);
		return nhanVienRepository.findAll(pageable).getContent();
	}

	@Override
	public NhanVien getNhanVienById(String id) {
		// TODO Auto-generated method stub
		return nhanVienRepository.getById(id);
	}

	
	@Override
	public String autoId() {
		String maNhanVien = "";
	    
	    // Lấy giá trị của maNhanVien cuối cùng từ cơ sở dữ liệu
	    String lastMaNhanVien = nhanVienRepository.findTopByOrderBymaNhanVienDesc();
	    
	    // Lấy năm hiện tại
	    Calendar cal = Calendar.getInstance();
	    int currentYear = cal.get(Calendar.YEAR) % 100; // lấy 2 chữ số cuối của năm hiện tại
	    
	    // Xử lý phần số
	    if (lastMaNhanVien != null && !lastMaNhanVien.equals("") && lastMaNhanVien.length() == 10) {
	        // Lấy phần số (6 chữ số cuối cùng) của maNhanVien cuối cùng
	        int lastNumber = Integer.parseInt(lastMaNhanVien.substring(8));
	        
	        // Nếu năm hiện tại khác năm của maNhanVien cuối cùng, đặt phần số bằng 1
	        if (currentYear != Integer.parseInt(lastMaNhanVien.substring(2, 4))) {
	            lastNumber = 0;
	        }
	        
	        // Tăng phần số lên 1 và cập nhật maNhanVien mới
	        lastNumber++;
	        maNhanVien = String.format("NV%02d%06d", currentYear, lastNumber);
	    } else {
	        // Nếu chưa có maNhanVien nào được lưu trữ trong cơ sở dữ liệu, tạo mới maNhanVien đầu tiên
	        maNhanVien = String.format("NV%02d%06d", currentYear, 1);
	    }
	    
	    return maNhanVien;
	}

	@Override
	public List<NhanVien> timKiemNhanVien(String textSearch) {
		// TODO Auto-generated method stub
		 return nhanVienRepository.timKiemNhanVien(textSearch).subList(0, 50);
	}

	@Override
	public List<NhanVien> getGiangVienTheoKhoa(String maKhoa) {
		// TODO Auto-generated method stub
		return nhanVienRepository.getGiangVienTheoKhoa(maKhoa);
	}

	@Override
	public int countNhanVienBySDT(String soDT) {
		// TODO Auto-generated method stub
		return nhanVienRepository.countNhanVienBySDT(soDT);
	}

	@Override
	public int countNhanVienByEmail(String email) {
		// TODO Auto-generated method stub
		return nhanVienRepository.countNhanVienByEmail(email);
	}

	@Override
	public int couNhanVienBySoCCCD(String soCCCD) {
		// TODO Auto-generated method stub
		return nhanVienRepository.countNhanVienBySoCCCD(soCCCD);
	}
}
