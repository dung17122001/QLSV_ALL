package com.kltn.api.serviceImlp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.ChiTietPhieuDangKy;
import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.Lich;
import com.kltn.api.entity.PhieuDangKyHocPhan;
import com.kltn.api.entity.SinhVien;
import com.kltn.api.repository.ChiTietPhieuDKHPRepository;
import com.kltn.api.repository.HocKyRepository;
import com.kltn.api.repository.LoaiDKHPRepository;
import com.kltn.api.repository.MonHocRepository;
import com.kltn.api.repository.PhieuDKHPRepository;
import com.kltn.api.repository.SinhVienRepository;
import com.kltn.api.service.PhieuDKHPService;

@Service
@Transactional
public class PhieuDKHPServiceImlp implements PhieuDKHPService{
	
	@Autowired
	private PhieuDKHPRepository phieuDKHPRepository;
	@Autowired
	private SinhVienRepository sinhVienRepository;
	@Autowired
	private ChiTietPhieuDKHPRepository chiTietPhieuDKHPRepository;
	@Autowired
	private MonHocRepository monHocRepository;
	@Autowired
	private LoaiDKHPRepository loaiDKHPRepository;
	@Autowired
	private HocKyRepository hocKyRepository;
	

	@Override
	public List<PhieuDangKyHocPhan> getAllPhieuDKHP() {
		// TODO Auto-generated method stub
		return phieuDKHPRepository.findAll();
	}

	@Override
	public PhieuDangKyHocPhan getPhieuDKHPById(String id) {
		// TODO Auto-generated method stub
		return phieuDKHPRepository.findById(id).get();
	}

	@Override
	public PhieuDangKyHocPhan addOrUpdatePhieuDK(PhieuDangKyHocPhan phieuDangKyHocPhan) {
		if(!phieuDangKyHocPhan.getSinhVien().getMaSinhVien().equals("")) {
			var sinhVien = sinhVienRepository.findById(phieuDangKyHocPhan.getSinhVien().getMaSinhVien()).get();
			
			if(sinhVien != null) {
				phieuDangKyHocPhan.setSinhVien(sinhVien);
			}
			else {
				sinhVien = new SinhVien(phieuDangKyHocPhan.getSinhVien().getMaSinhVien());
				phieuDangKyHocPhan.setSinhVien(sinhVien);
			}
			
		}
		var hk = hocKyRepository.findById(phieuDangKyHocPhan.getHocKy().getMaHocKy()).get();
		phieuDangKyHocPhan.setHocKy(hk);
		phieuDKHPRepository.save(phieuDangKyHocPhan);
		return phieuDangKyHocPhan;
		
	}

	@Override
	public String autoId() {
		int id = phieuDKHPRepository.autoId();
		String naturalId = "PDK" + String.format("%05d", id+1);
		return naturalId;
	}

	@Override
	public ChiTietPhieuDangKy addChiTietPhieuDKHP(ChiTietPhieuDangKy chiTietPhieuDangKy) {
//		if((!chiTietPhieuDangKy.getPhieuDangKyHocPhan().getMaPhieuDangKy().equals(""))&& (!chiTietPhieuDangKy.getMonHoc().getMaMonHoc().equals("")
//				&& (!chiTietPhieuDangKy.getLoaiDangKyHP().getMaLoaiDKHP().equals("")))){
//			var pdk = phieuDKHPRepository.findById(chiTietPhieuDangKy.getPhieuDangKyHocPhan().getMaPhieuDangKy()).get();
//			var monHoc = monHocRepository.findById(chiTietPhieuDangKy.getMonHoc().getMaMonHoc()).get();
//			var loaiPhieu = loaiDKHPRepository.findById(chiTietPhieuDangKy.getLoaiDangKyHP().getMaLoaiDKHP()).get();
//			if(pdk != null && monHoc !=null && loaiPhieu != null) {
//				chiTietPhieuDangKy.setLoaiDangKyHP(loaiPhieu);
//				chiTietPhieuDangKy.setMonHoc(monHoc);
//				chiTietPhieuDangKy.setPhieuDangKyHocPhan(pdk);
//			}
//			
//			
//		}
		chiTietPhieuDKHPRepository.save(chiTietPhieuDangKy);
		return chiTietPhieuDangKy;
		
	}

	@Override

	public List<PhieuDangKyHocPhan> findByMaHocKyAndIdSinhVien(String maHocKy, String maSinhVien) {
		// TODO Auto-generated method stub
		return phieuDKHPRepository.findByHocKyMaHocKyAndSinhVienMaSinhVien(maHocKy, maSinhVien);
	}

	@Override
	public List<ChiTietPhieuDangKy> getAllChiTietPhieuDKHP() {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.findAll();
	}

	@Override
	public List<ChiTietPhieuDangKy> findByMaHocKyAndMaSinhVien(String maSinhVien, String maHocKy) {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.findByMaHocKyAndMaSinhVien(maSinhVien, maHocKy);
	}

	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHP(String maLHP, String maNhom) {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.getListChiTietPDKByMaLHP(maLHP, maNhom);
	}

	@Override
	public List<ChiTietPhieuDangKy> getMonHocByTextSearch(String valueSearch) {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.getMonHocByTextSearch(valueSearch);
	}

	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaSinhVien(String maSinhVien) {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.getListChiTietPDKByMaSinhVien(maSinhVien);
	}

	@Override
	public void deleteChiTietPDKByMaPhieuDKAndMaNhomTH(String maPhieuDK, String maNhomTH) {
		// TODO Auto-generated method stub
		chiTietPhieuDKHPRepository.deleteChiTietPDKByMaPhieuDKAndMaNhomTH(maPhieuDK, maNhomTH);
	}

	@Override
	public void xoaTatCaChiTietPhieuTheoMaLHP(String maLHP) {
		// TODO Auto-generated method stub
		chiTietPhieuDKHPRepository.xoaTatCaChiTietPhieuTheoMaLHP(maLHP);
	}

	@Override
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHPDanhChoGV(String maLHP) {
		// TODO Auto-generated method stub
		return chiTietPhieuDKHPRepository.getListChiTietPDKByMaLHPDanhChoGV(maLHP);
	}

}
