package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.CaHoc;
import com.kltn.api.entity.Lich;
import com.kltn.api.entity.LopHocPhan;
import com.kltn.api.entity.NhanVien;
import com.kltn.api.entity.Phong;
import com.kltn.api.repository.CaHocRepository;
import com.kltn.api.repository.LichRepository;
import com.kltn.api.repository.LopHocPhanRepository;
import com.kltn.api.repository.NhanVienRepository;
import com.kltn.api.repository.NhomTHRepository;
import com.kltn.api.repository.PhongRepository;
import com.kltn.api.service.LichService;

@Service
@Transactional
public class LichServiceImpl implements LichService{

	@Autowired
	private LichRepository lichRepository;
	@Autowired
	private PhongRepository phongRepository;
	
	@Autowired 
	private NhanVienRepository nhanVienRepository;
	
	@Autowired
	private LopHocPhanRepository lopHocPhanRepository;
	@Autowired 
	private CaHocRepository caHocRepository;
	@Autowired NhomTHRepository nhomTHRepository;
	
	
	@Override
	public void saveOrUpdateLich(Lich lich) {
		// TODO Auto-generated method stub
		if(!lich.getCaHoc().getMaCaHoc().equals("")) {
			var caHoc = caHocRepository.findById(lich.getCaHoc().getMaCaHoc()).get();
			if(caHoc != null) {
				lich.setCaHoc(caHoc);
			}else {
				caHoc = new CaHoc(lich.getCaHoc().getMaCaHoc());
				lich.setCaHoc(caHoc);			}
		}
		if(!lich.getPhong().getMaPhong().equals("")) {
			var phong = phongRepository.findById(lich.getPhong().getMaPhong()).get();
			if(phong != null) {
				lich.setPhong(phong);
			}else {
				phong = new Phong(lich.getPhong().getMaPhong());
				lich.setPhong(phong);			}
		}
		if(!lich.getNhanVien().getMaNhanVien().equals("")) {
			var nhanVien = nhanVienRepository.findById(lich.getNhanVien().getMaNhanVien()).get();
			if(nhanVien != null) {
				lich.setNhanVien(nhanVien);
			}else {
				nhanVien = new NhanVien(lich.getNhanVien().getMaNhanVien());
				lich.setNhanVien(nhanVien);;			}
		}
//		if(!lich.getLopHocPhan().getMaLopHocPhan().equals("")) {
//			var lopHocPhan = lopHocPhanRepository.findById(lich.getLopHocPhan().getMaLopHocPhan()).get();
//			if(lopHocPhan != null) {
//				lich.setLopHocPhan(lopHocPhan);
//			}else {
//				lopHocPhan = new LopHocPhan(lich.getLopHocPhan().getMaLopHocPhan());
//				lich.setLopHocPhan(lopHocPhan);			
//				}
//		}
		var nhomTH = nhomTHRepository.findById(lich.getNhomThucHanh().getMaNhom()).get();
		lich.setNhomThucHanh(nhomTH);
		lichRepository.save(lich);
		
	}

	@Override
	public List<Lich> getAllLich() {
		// TODO Auto-generated method stub
		return lichRepository.findAll();
	}

	@Override
	public Lich getLichById(String id) {
		// TODO Auto-generated method stub
		return lichRepository.getById(id);
	}

	@Override
	public String autoId() {
		String maxId = lichRepository.getMaxId(); // Lấy id lớn nhất hiện tại
		if (maxId == null) {
		    return "L00000001"; // Nếu không có dữ liệu, trả về giá trị mặc định
		} else {
		    String prefix = maxId.substring(0, maxId.length() - 8); // Tách phần prefix từ id lớn nhất
		    int number = Integer.parseInt(maxId.substring(prefix.length())); // Tách phần số từ id lớn nhất
		    number++; // Tăng giá trị số lên 1
		    String newId = prefix + String.format("%08d", number); // Tạo id mới
		    return newId;
		}

	}

	@Override
	public List<Lich> getTatCaLichTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		return lichRepository.getTatCaLichTheoMaLHP(maLHP);
	}

	@Override
	public List<Lich> getLichTheoNgayCuaSinhVien(String maSV, String ngayBD, String ngayKT) {
		// TODO Auto-generated method stub
		return lichRepository.getLichTheoNgayCuaSinhVien(maSV, ngayBD, ngayKT);
	}

	@Override
	public List<Lich> getChiTietLopHPByMaLopHocPhan(String maLopHocPhan) {
		// TODO Auto-generated method stub
		return lichRepository.getChiTietLopHPByMaLopHocPhan(maLopHocPhan);
	}

	@Override
	public List<Lich> getLichByTextSearch(String valueSearch) {
		// TODO Auto-generated method stub
		return lichRepository.getLichByTextSearch(valueSearch);
	}

	public List<Lich> getListChiTietPDKByMaSinhVienAndLopHP(String maSinhVien, String maLHP) {
		// TODO Auto-generated method stub
		return lichRepository.getListChiTietPDKByMaSinhVienAndLopHP(maSinhVien, maLHP);
	}

	@Override
	public List<Lich> getLichTheoNgayCuaGiangVien(String maGV, String ngayBD, String ngayKT) {
		// TODO Auto-generated method stub
		return lichRepository.getLichTheoNgayCuaGiangVien(maGV, ngayBD, ngayKT);
	}
	@Override
	public List<Lich> getALLLichByMaSinhVienAndHK(String maSinhVien, String maHK) {
		// TODO Auto-generated method stub
		return lichRepository.getALLLichByMaSinhVienAndHK(maSinhVien, maHK);
	}

	@Override
	public void xoaTatCaLichTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		lichRepository.xoaTatCaLichTheoMaLHP(maLHP);
		
	}

	@Override
	public List<Lich> getTatCaLichTheoMaLHPAndNhomTH(String maLHP, String maNhomTH) {
		// TODO Auto-generated method stub
		return lichRepository.getTatCaLichTheoMaLHPAndNhomTH(maLHP, maNhomTH);
	}
}
