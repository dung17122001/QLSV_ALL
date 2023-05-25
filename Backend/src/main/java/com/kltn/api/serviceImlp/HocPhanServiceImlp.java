package com.kltn.api.serviceImlp;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocPhan;
import com.kltn.api.entity.LopHoc;
import com.kltn.api.entity.MonHoc;
import com.kltn.api.repository.ChiTietHPRepository;
import com.kltn.api.repository.HocPhanRepository;
import com.kltn.api.repository.MonHocRepository;
import com.kltn.api.service.HocPhanService;

@Service
@Transactional
public class HocPhanServiceImlp implements HocPhanService{
	
	@Autowired
	private HocPhanRepository hocPhanRepository;
	@Autowired
	private MonHocRepository monHocRepository;
	@Autowired
	private ChiTietHPRepository chiTietHPRepository; 
	@Override
	public void saveOrUpdateHocPhan(HocPhan hocPhan) {
		if(!hocPhan.getMonHoc().getMaMonHoc().equals("")) {
			var monHoc = monHocRepository.findById(hocPhan.getMonHoc().getMaMonHoc()).get();
			
			if(monHoc != null) {
				hocPhan.setMonHoc(monHoc);
			}
			else {
				monHoc = new MonHoc(hocPhan.getMonHoc().getMaMonHoc());
				hocPhan.setMonHoc(monHoc);
			}
			
		}
		hocPhanRepository.save(hocPhan);
		
	}

	@Override
	public List<HocPhan> getAllHocPhan() {
		// TODO Auto-generated method stub
		return hocPhanRepository.findAll();
	}

	@Override
	public HocPhan getHocPhanById(String id) {
		// TODO Auto-generated method stub
		return hocPhanRepository.findById(id).get();
	}

	@Override
	public String autoId() {
		int id = hocPhanRepository.autoId();
	    String maMH = "HP" + String.format("%05d", id+1);
	    return maMH;
	}

	@Override
	public List<HocPhan> getHocPhanTheoHocKy(String maHocKy) {
		// TODO Auto-generated method stub
		return hocPhanRepository.getHocPhanTheoHocKy(maHocKy);
	}

	@Override
	public List<ChiTietHocPhan> getChiTietHocPhan(Date startDate, Date endDate,String maCTK ) {
		// TODO Auto-generated method stub
		return chiTietHPRepository.getChiTietHocPhanTheoKhoaHoc(startDate, endDate, maCTK);
	}

	@Override
	public HocPhan getHocPhanTheoMaMH(String maMH) {
		// TODO Auto-generated method stub
		return hocPhanRepository.getHocPhanTheoMaMH(maMH);
	}

	@Override

	public List<ChiTietHocPhan> findHocPhanByMaSinhVienAndMaNganh(String maSinhVien, String maNganh) {
		// TODO Auto-generated method stub
		return chiTietHPRepository.findHocPhanByMaSinhVienAndMaNganh(maSinhVien, maNganh);
	}
	public List<HocPhan> getHocPhanTheoKyVaMaGV(String maGV, String maHK) {
		// TODO Auto-generated method stub
		return hocPhanRepository.getHocPhanTheoKyVaMaGV(maGV, maHK);

	}

}
