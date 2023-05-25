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
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.Lich;
import com.kltn.api.entity.NganhHoc;
import com.kltn.api.service.LichService;

@RestController
@RequestMapping("/api/lich")
@CrossOrigin(origins =   "${client.url}")
public class LichRest {
	@Autowired
	private LichService lichService;
	
	@PostMapping
	public void addLichHoc(@RequestBody Lich lich) {
		lich.setMaLich(lichService.autoId());
		lichService.saveOrUpdateLich(lich);
	}
	@PutMapping
	public void updateLichHoc(@RequestBody Lich lich) {
		
		lichService.saveOrUpdateLich(lich);
	}
	@GetMapping
	public List<Lich> getAllLich(){
		return lichService.getAllLich();
	}
	@GetMapping("/malich")
	public List<Lich> getLichById(@RequestParam("valueSearch") String valueSearch) {
		// TODO Auto-generated method stub
		return lichService.getLichByTextSearch(valueSearch);
	}
	
	@GetMapping("lhp")
	public List<Lich> getTatCaLichTheoMaLHP(@RequestParam String maLHP) {
		// TODO Auto-generated method stub
		return lichService.getTatCaLichTheoMaLHP(maLHP);
	}
	@GetMapping("lhp-nhomth")
	public List<Lich> getTatCaLichTheoMaLHPAndNhomTH(@RequestParam String maLHP,@RequestParam String maNhomTH ) {
		// TODO Auto-generated method stub
		return lichService.getTatCaLichTheoMaLHPAndNhomTH(maLHP, maNhomTH);
	}
	
	@GetMapping("/sv")
	public List<Lich> getLichTheoNgayCuaSinhVien(@RequestParam("maSV") String maSV,@RequestParam("ngayBD") String ngayBD,@RequestParam("ngayKT") String ngayKT) {
		// TODO Auto-generated method stub
		return lichService.getLichTheoNgayCuaSinhVien(maSV, ngayBD, ngayKT);
	}
	
	@GetMapping("/malhp")
	public List<Lich> getChiTietLopHPByMaLopHocPhan(@RequestParam("maLopHocPhan") String maLopHocPhan) {
		// TODO Auto-generated method stub
		return lichService.getChiTietLopHPByMaLopHocPhan(maLopHocPhan);
	}
	@GetMapping("/lichddk")
	public List<Lich> getALLLichByMaSinhVienAndHK(@RequestParam("maSinhVien") String maSinhVien, @RequestParam("maHK") String maHK) {
		// TODO Auto-generated method stub
		return lichService.getALLLichByMaSinhVienAndHK(maSinhVien, maHK);
	}
	
	@GetMapping("/chitietlich/sinhvien-lophocphan")
	public List<Lich> getListChiTietPDKByMaSinhVienAndLHP(@RequestParam("maSinhVien") String maSinhVien, @RequestParam("maLHP") String maLHP) {
		// TODO Auto-generated method stub
		return lichService.getListChiTietPDKByMaSinhVienAndLopHP(maSinhVien, maLHP);
	}
	
	@GetMapping("/gv")
	public List<Lich> getLichTheoNgayCuaGiangVien(@RequestParam("maGV") String maGV,@RequestParam("ngayBD") String ngayBD,@RequestParam("ngayKT") String ngayKT) {
		// TODO Auto-generated method stub
		return lichService.getLichTheoNgayCuaGiangVien(maGV, ngayBD, ngayKT);
	}
	
	@DeleteMapping("/delete")
	public void xoaTatCaLichTheoMaLHP(@RequestParam String maLHP) {
		// TODO Auto-generated method stub
		lichService.xoaTatCaLichTheoMaLHP(maLHP);
		
	}

}
