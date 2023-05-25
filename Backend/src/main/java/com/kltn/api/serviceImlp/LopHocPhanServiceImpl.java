package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.BangDiem;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.Lich;
import com.kltn.api.entity.LopHocPhan;
import com.kltn.api.entity.MonHoc;
import com.kltn.api.repository.BangDiemRepository;
import com.kltn.api.repository.ChiTietHPRepository;
import com.kltn.api.repository.HocPhanRepository;
import com.kltn.api.repository.LopHocPhanRepository;
import com.kltn.api.repository.MonHocRepository;
import com.kltn.api.repository.SinhVienRepository;
import com.kltn.api.service.LopHocPhanService;

@Service
@Transactional
public class LopHocPhanServiceImpl implements LopHocPhanService{
	
	@Autowired
	private LopHocPhanRepository lopHocPhanRepository;
	
	@Autowired
	private HocPhanRepository hocPhanRepository;
	
	@Autowired
	private ChiTietHPRepository chiTietHPRepository;
	@Autowired
	private BangDiemRepository bangDiemRepository;
	@Autowired 
	private SinhVienRepository sinhVienRepository;
	

	@Override
	public void saveOrUpdate(LopHocPhan lopHocPhan) {
		// TODO Auto-generated method stub
		var hp = hocPhanRepository.findById(lopHocPhan.getHocPhan().getMaHocPhan()).get();
		lopHocPhan.setHocPhan(hp);
		lopHocPhanRepository.save(lopHocPhan);
		
		
	}

	@Override
	public List<LopHocPhan> getAllLopHocPhan() {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.findAll();
	}

	
	@Override
	public String autoId() {
		String maxId = lopHocPhanRepository.getMaxId(); // Lấy id lớn nhất hiện tại
		if (maxId == null) {
		    return "LHP00001"; // Nếu không có dữ liệu, trả về giá trị mặc định
		} else {
		    String prefix = maxId.substring(0, maxId.length() - 5); // Tách phần prefix từ id lớn nhất
		    int number = Integer.parseInt(maxId.substring(prefix.length())); // Tách phần số từ id lớn nhất
		    number++; // Tăng giá trị số lên 1
		    String newId = prefix + String.format("%05d", number); // Tạo id mới
		    return newId;
		}


	}

	@Override
	public List<LopHocPhan> getLopHocPhanTheoMaHocPhan(String maHP, String maHK) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanTheoMaHocPhan(maHP, maHK);
	}

	@Override

	public List<LopHocPhan> getLopHocPhanTheoMaHP(String maHP) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanTheoMaHP(maHP);
	}

	


	public List<LopHocPhan> getTatCaLHPByHocPhanAndMaGVAndMaHK(String maGV, String maHK, String maHP) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getTatCaLHPByHocPhanAndMaGVAndMaHK(maGV, maHK, maHP);
	}

	@Override
	public List<BangDiem> getBangDiemTheoLHPAndMaGV(String maLHP,String maGV) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getbangDiemTheoLHP(maLHP, maGV);
	}

	@Override
	public void addBangDiem(BangDiem bangDiem) {
		var sv = sinhVienRepository.findById(bangDiem.getSinhVien().getMaSinhVien()).get();
		var hp = hocPhanRepository.findById(bangDiem.getHocPhan().getMaHocPhan()).get();
		bangDiem.setSinhVien(sv);
		bangDiem.setHocPhan(hp);
		bangDiemRepository.save(bangDiem);
	}

	@Override
	public List<LopHocPhan> getLopHocPhanByTextSearch(String valueSearch) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanByTextSearch(valueSearch);
	}

	@Override
	public LopHocPhan getLopHocPhanById(String id) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getById(id);
	}

	@Override
	public LopHocPhan getLopHocPhanByMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanByMaLHP(maLHP);
	}

	@Override
	public List<BangDiem> getBangDiemBySVAndHK(String maSinhVien, String maHK) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getBangDiemBySVAndHK(maSinhVien, maHK);
	}

	@Override
	public float diemTBTheoHK(String maSinhVien, String maHK) {
		// TODO Auto-generated method stub
		return bangDiemRepository.diemTBTheoHK(maSinhVien, maHK);
	}

	@Override
	public List<BangDiem> getBangDiemKhongDat(String maSinhVien) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getBangDiemKhongDat(maSinhVien);
	}

	@Override
	public String autoIdBangDiem() {
		int id = bangDiemRepository.autoId();
		String naturalId = "BD" + String.format("%05d", id+1);
		return naturalId;
	}

	@Override
	public void xoaLopHocPhanTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		lopHocPhanRepository.xoaLopHocPhanTheoMaLHP(maLHP);
	}

	@Override

	public void updateTrangThaiBangDiem(String trangThai, String maSinhVien, String maHP) {
		bangDiemRepository.updateTrangThaiBangDiem(trangThai, maSinhVien, maHP);
		
	}

	@Override
	public List<BangDiem> getBangDiemDat(String maSinhVien) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getBangDiemDat(maSinhVien);
	}

	@Override
	public List<BangDiem> getBangDiemTheoSVAndMH(String maSinhVien, String maMH) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getBangDiemTheoSVAndMH(maSinhVien, maMH);
	}

	@Override
	public List<LopHocPhan> getLopHocPhanTheoMaSVAndHK(String maSinhVien, String maHK) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanTheoMaSVAndHK(maSinhVien, maHK);
	}

	@Override
	public float diemTBLHP(String maLHP) {
		// TODO Auto-generated method stub
		return bangDiemRepository.diemTBLHP(maLHP);
	}

	@Override
	public List<BangDiem> getDiemTongKet(String maSinhVien, String maLHP) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getDiemTongKet(maSinhVien, maLHP);
	}
	


	public List<LopHocPhan> getLopHocPhanByMaGVAndMaHK(String maGV, String maHK) {
		// TODO Auto-generated method stub
		return lopHocPhanRepository.getLopHocPhanByMaGVAndMaHK(maGV, maHK);
	}

	@Override
	public List<BangDiem> getBangDiemByMaSV(String maSinhVien) {
		// TODO Auto-generated method stub
		return bangDiemRepository.getBangDiemByMaSV(maSinhVien);
	}



}
