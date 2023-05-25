package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.KhoaHoc;
import com.kltn.api.service.KhoaHocService;

@RestController
@RequestMapping("/api/khoahoc")
@CrossOrigin(origins =  "${client.url}")
public class KhoaHocRest {

	@Autowired
	private KhoaHocService khoaHocService;
	
	@PostMapping
	public void addKhoaHoc(@RequestBody KhoaHoc khoaHoc) {
		khoaHoc.setMaKhoaHoc(khoaHocService.autoId());
		khoaHocService.saveOrUpdateKhoaHoc(khoaHoc);
		
	}
	
	@PutMapping
	public void updateKhoaHoc(@RequestBody KhoaHoc khoaHoc) {
		//khoaHoc.setMaKhoaHoc(khoaHocService.autoId());
		khoaHocService.saveOrUpdateKhoaHoc(khoaHoc);
		
	}
	
	@GetMapping
	public List<KhoaHoc> getAllKhoaHoc() {
		return khoaHocService.getAllKhoaHoc();
	}
}
