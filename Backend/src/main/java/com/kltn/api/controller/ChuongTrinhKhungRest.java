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

import com.kltn.api.entity.ChiTietHocKy;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.ChuongTrinhKhung;
import com.kltn.api.service.ChuongTrinhKhungService;

@RestController
@RequestMapping("/api/chuongtrinhkhung")
@CrossOrigin(origins =  "${client.url}")
public class ChuongTrinhKhungRest {
	
	@Autowired
	private ChuongTrinhKhungService chuongTrinhKhungService;

	@GetMapping
	public List<ChuongTrinhKhung> getAllChuongTrinhKhung() {
		// TODO Auto-generated method stub
		return chuongTrinhKhungService.getAllChuongTrinhKhung();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ChuongTrinhKhung getChuongTrinhKhungById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return chuongTrinhKhungService.getChuongTrinhKhungById(id);
	}

	@PostMapping
	public ChuongTrinhKhung addChuongTrinhKhung(@RequestBody ChuongTrinhKhung chuongTrinhKhung) {
		// TODO Auto-generated method stub
		chuongTrinhKhung.setMaChuongTrinhKhung(chuongTrinhKhungService.autoId());
		chuongTrinhKhungService.addOrUpdateChuongTrinhKhung(chuongTrinhKhung);
		return chuongTrinhKhung;
	}
	
	@PutMapping
	public void updateChuongTrinhKhung(@RequestBody ChuongTrinhKhung chuongTrinhKhung) {
		// TODO Auto-generated method stub
		chuongTrinhKhungService.addOrUpdateChuongTrinhKhung(chuongTrinhKhung);
	}
	
	@PostMapping("/addCTK")
	public void addChuongTrinhKhungChoHK(@RequestBody ChiTietHocKy chiTietHocKy) {
		chuongTrinhKhungService.addChuongTrinhKhungChoHK(chiTietHocKy);
		
	}
	
	@GetMapping("/search")
	public List<ChuongTrinhKhung> getCTKByTextSearch(@RequestParam("valueSearch") String valueSearch) {
		// TODO Auto-generated method stub
		return chuongTrinhKhungService.getCTKByTextSearch(valueSearch);
	}
	
	@GetMapping("/sv")
	public List<ChiTietHocPhan> getChuongTrinhKhungTheoMaSV(@RequestParam("maSV") String maSV) {
		// TODO Auto-generated method stub
		return chuongTrinhKhungService.getChuongTrinhKhungTheoMaSV(maSV);
	}
	
	@GetMapping("/masv")
	public List<ChuongTrinhKhung> getCTKByMaSV(@RequestParam("maSV") String maSV) {
		// TODO Auto-generated method stub
		return chuongTrinhKhungService.getCTKByMaSV(maSV);
	}
	

}
