package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.ChiTietPhieuDangKy;
import com.kltn.api.entity.Lich;
import com.kltn.api.entity.PhieuDangKyHocPhan;
import com.kltn.api.service.PhieuDKHPService;

@RestController
@RequestMapping("/api/phieudkhp")
@CrossOrigin(origins =   "${client.url}")
public class PhieuDKHPRest {
	
	@Autowired
	private PhieuDKHPService phieuDKHPService;
	@Autowired
	
	
	@GetMapping
	public List<PhieuDangKyHocPhan> getAllPhieuDKHP() {
		// TODO Auto-generated method stub
		return phieuDKHPService.getAllPhieuDKHP();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public PhieuDangKyHocPhan getPhieuDKHPById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return phieuDKHPService.getPhieuDKHPById(id);
	}

	@PostMapping
	public PhieuDangKyHocPhan addPhieuDK(@RequestBody PhieuDangKyHocPhan phieuDangKyHocPhan) {
		phieuDangKyHocPhan.setMaPhieuDangKy(phieuDKHPService.autoId());
		phieuDKHPService.addOrUpdatePhieuDK(phieuDangKyHocPhan);
		return phieuDangKyHocPhan;
	}
	
	@PutMapping
	public void updatePhieuDK(@RequestBody PhieuDangKyHocPhan phieuDangKyHocPhan) {
		phieuDangKyHocPhan.setMaPhieuDangKy(phieuDKHPService.autoId());
		phieuDKHPService.addOrUpdatePhieuDK(phieuDangKyHocPhan);
	}
	
	@PostMapping("/add-ctpdk")
	public ChiTietPhieuDangKy addChiTietPhieuDK(@RequestBody ChiTietPhieuDangKy chiTietPhieuDangKy) {
		
		phieuDKHPService.addChiTietPhieuDKHP(chiTietPhieuDangKy);
		return chiTietPhieuDangKy;
	}

	  @GetMapping("/hocky-sinhvien")
	    public List<PhieuDangKyHocPhan> findByMaHocKyAndIdSinhVien(@RequestParam String maHocKy, @RequestParam String maSinhVien) {
	        return phieuDKHPService.findByMaHocKyAndIdSinhVien(maHocKy, maSinhVien);
	    }
	  
		@GetMapping("/chitietpdk")
		public List<ChiTietPhieuDangKy> getAllChiTietPDK() {
			// TODO Auto-generated method stub
			return phieuDKHPService.getAllChiTietPhieuDKHP();
		}
		
		@GetMapping("/chitietpdk/byhockyandsinhvien")
		public List<ChiTietPhieuDangKy> findByMaHocKyAndMaSinhVien(String maSinhVien,String maHocKy) {
			// TODO Auto-generated method stub
			return phieuDKHPService.findByMaHocKyAndMaSinhVien(maSinhVien, maHocKy);
		}

	
	@GetMapping("/lhp")
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHP(@RequestParam("maLHP") String maLHP,@RequestParam("maNhom") String maNhom) {
		// TODO Auto-generated method stub
		return phieuDKHPService.getListChiTietPDKByMaLHP(maLHP, maNhom);
	}

	@GetMapping("/chitietpdk/search")
	public List<ChiTietPhieuDangKy> getMonHocByTextSearch(@RequestParam String valueSearch) {
		// TODO Auto-generated method stub
		return phieuDKHPService.getMonHocByTextSearch(valueSearch);
	}
	@GetMapping("/chitietpdk/sinhvien")
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaSinhVien(@RequestParam("maSinhVien") String maSinhVien) {
		// TODO Auto-generated method stub
		return phieuDKHPService.getListChiTietPDKByMaSinhVien(maSinhVien);
	}
	
	@DeleteMapping("/chitietpdk")
	public void deleteChiTietPDKByMaPhieuDKAndMaNhomTH(@RequestParam("maPhieuDK") String maPhieuDK, @RequestParam("maNhomTH") String maNhomTH) {
		phieuDKHPService.deleteChiTietPDKByMaPhieuDKAndMaNhomTH(maPhieuDK, maNhomTH);
	}
	
	@DeleteMapping("/chitietpdk/delete")
	public void xoaTatCaChiTietPhieuTheoMaLHP(@RequestParam String maLHP) {
		// TODO Auto-generated method stub
		phieuDKHPService.xoaTatCaChiTietPhieuTheoMaLHP(maLHP);
	}
	
	@GetMapping("/ctpdk/lhp")
	public List<ChiTietPhieuDangKy> getListChiTietPDKByMaLHPDanhChoGV(@RequestParam String maLHP) {
		// TODO Auto-generated method stub
		return phieuDKHPService.getListChiTietPDKByMaLHPDanhChoGV(maLHP);
	}

}
