package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.NhanVien;
import com.kltn.api.entity.SinhVien;
import com.kltn.api.service.SinhVienService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/sinhvien")
@CrossOrigin(origins =   "${client.url}")
@RequiredArgsConstructor
public class SinhVienRest {
	
	@Autowired
	private SinhVienService sinhVienService;
	
	@PostMapping
	public SinhVien addSinhVien(@RequestBody SinhVien sinhVien) {
		sinhVien.setMaSinhVien(sinhVienService.autoId());
		sinhVienService.saveOrUpdateSinhVien(sinhVien);
		return sinhVien;
	}
	
	@PutMapping
	public SinhVien updateSinhVien(@RequestBody SinhVien sinhVien) {

//		sinhVien.setMaSinhVien(sinhVienService.autoId());

		sinhVienService.saveOrUpdateSinhVien(sinhVien);
		return sinhVien;
	}

	@GetMapping
	public List<SinhVien> getAllSinhVien() {
		// TODO Auto-generated method stub
		return sinhVienService.getAllSinhVien();
	}
	
	@GetMapping(value = "/{id}")
	public SinhVien getSinhVienById(@PathVariable("id") String id) {
		// TODO Auto-generated method stub
		System.out.println(id);
		return sinhVienService.getSinhVienById(id);
	}
	@GetMapping("/count")
	public Long countSVByLopHoc(@RequestParam("classID")String classID) {
		return sinhVienService.countSVByLopHoc(classID);
	}
	 @GetMapping("/timkiem")
	    public ResponseEntity<List<SinhVien>> timKiemSinhVien(@RequestParam("value") String textSearch) {
	        List<SinhVien> sinhViens = sinhVienService.timKiemSinhVien(textSearch);
	        return ResponseEntity.ok(sinhViens);
	    }
		@GetMapping("/countsvbylhp")
		public int countSinhVienByLHP(@RequestParam("maLHP")String maLHP) {
			return sinhVienService.countSinhVienByLHP(maLHP);
		}
		
		@GetMapping("/countsvbynth")
		public int countSinhVienByNTH(@RequestParam("maNTH")String maNTH) {
			return sinhVienService.countSinhVienByNTH(maNTH);
		}
		
		@GetMapping("/countsvbysdt")
		public int countSinhVienBySDT(@RequestParam("soDT")String soDT) {
			return sinhVienService.countSinhVienBySDT(soDT);
		}
		
		@GetMapping("/countsvbyemail")
		public int countSinhVienByEmail(@RequestParam("email")String email) {
			return sinhVienService.countSinhVienByEmail(email);
		}
		
		@GetMapping("/countsvbysocccd")
		public int countSinhVienBySoCCCD(@RequestParam("soCCCD")String soCCCD) {
			return sinhVienService.couSinhVienBySoCCCD(soCCCD);
		}
		
		@GetMapping("/lhp")
		public List<SinhVien> getSinhVienByMaLHP(@RequestParam("maLHP") String maLHP) {
			// TODO Auto-generated method stub
			return sinhVienService.getSinhVienByMaLHP(maLHP);
		}

		
}
