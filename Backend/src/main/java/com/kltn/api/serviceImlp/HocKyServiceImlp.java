package com.kltn.api.serviceImlp;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.ChiTietHocKy;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocKy;
import com.kltn.api.repository.ChiTietHPRepository;
import com.kltn.api.repository.ChiTietHocKyRepository;
import com.kltn.api.repository.ChuongTrinhKhungRepository;
import com.kltn.api.repository.HocKyRepository;
import com.kltn.api.repository.HocPhanRepository;
import com.kltn.api.repository.MonHocRepository;
import com.kltn.api.service.HocKyService;

@Service
@Transactional
public class HocKyServiceImlp implements  HocKyService{
	
	@Autowired
	private HocKyRepository hocKyRepository;
	@Autowired
	private ChiTietHPRepository chiTietMonHocRepository;
	
	@Autowired
	private MonHocRepository monHocRepository;
	@Autowired
	private HocPhanRepository hocPhanRepository;
	@Autowired
	private ChuongTrinhKhungRepository chuongTrinhKhungRepository;
	@Override
	public List<HocKy> getAllKhoa() {
		// TODO Auto-generated method stub
		return hocKyRepository.findAll();
	}

	@Override
	public HocKy getHocKyById(String id) {
		// TODO Auto-generated method stub
		return hocKyRepository.findById(id).get();
	}

	@Override
	public void addOrUpdateHocKy(HocKy hocKy) {
		hocKyRepository.save(hocKy);
		
	}

	@Override
	public String autoId() {
		int id = hocKyRepository.autoId();
		String naturalId = "HK" + String.format("%03d", id+1);
		return naturalId;
	}

	@Override
	public void addChiTietMonHoc(ChiTietHocPhan chiTietMonHoc) {
		var hocPhan = hocPhanRepository.findById(chiTietMonHoc.getHocPhan().getMaHocPhan()).get();
		var hk = hocKyRepository.findById(chiTietMonHoc.getHocKy().getMaHocKy()).get();
		var ctk = chuongTrinhKhungRepository.findById(chiTietMonHoc.getChuongTrinhKhung().getMaChuongTrinhKhung()).get();
		chiTietMonHoc.setHocPhan(hocPhan);
		chiTietMonHoc.setHocKy(hk);
		chiTietMonHoc.setChuongTrinhKhung(ctk);
		chiTietMonHocRepository.save(chiTietMonHoc);
		
	}

	@Override
	public List<HocKy> timKiemHocKy(String textSearch) {
		// TODO Auto-generated method stub
		return hocKyRepository.timKiemHocKy(textSearch);
	}

	@Override
	public List<HocKy> getHocKyTheoKhoaHoc(Date startDate, Date endDate) {
		// TODO Auto-generated method stub
		return hocKyRepository.findHocKyByThoiGianKTBetween(startDate, endDate);
	}

	@Override
	public List<HocKy> getHocKyTheoMaCTK(String maCTK) {
		// TODO Auto-generated method stub
		return hocKyRepository.getHocKyByMaCTK(maCTK);
	}

	@Override
	public void removeMonHocOfChuongTrinhKhung(String maCTK, String maHK, String maHP) {
		chiTietMonHocRepository.removeMonHocOfChuongTrinhKhung(maCTK, maHK, maHP);
		
	}

	@Override
	public List<HocKy> getHocKyByKhoaHoc(String maKhoaHoc) {
		// TODO Auto-generated method stub
		return hocKyRepository.getHocKyByKhoaHoc(maKhoaHoc);
	}

	@Override
	public List<HocKy> getHocKyTheoTen(String tenHocKy) {
		// TODO Auto-generated method stub
		return hocKyRepository.getHocKyTheoTen(tenHocKy);
	}

}
