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

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NganhHoc;
import com.kltn.api.service.NganhHocService;

@RestController()
@RequestMapping("/api/nganh")

@CrossOrigin(origins =   "${client.url}")

public class NganhRest {
	
	@Autowired
	private NganhHocService nganhHocService;
	
	@PostMapping
	public NganhHoc addNganhHoc(@RequestBody NganhHoc nganhHoc) {
		nganhHoc.setMaNganh(nganhHocService.autoId());
		nganhHocService.saveOrUpdateNganhHoc(nganhHoc);
		return nganhHoc;
	}
	
	@PutMapping
	public NganhHoc updateNganhHoc(@RequestBody NganhHoc nganhHoc) {
		//nganhHoc.setMaNganh(nganhHocService.autoId());
		nganhHocService.saveOrUpdateNganhHoc(nganhHoc);
		return nganhHoc;
	}
	@GetMapping
	public List<NganhHoc> getAllNganhHoc() {
		// TODO Auto-generated method stub
		return nganhHocService.getAllNganhHoc();
	}
	
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public NganhHoc getNganhHocById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return nganhHocService.getNganhHocById(id);
	}
	 @GetMapping("/khoa")
	    public ResponseEntity<List<NganhHoc>> getNganhHocByKhoa(@RequestParam String khoaId) {
	        Khoa khoa = new Khoa(khoaId);
	        khoa.setId(khoaId);
	        List<NganhHoc> nganhHocList = nganhHocService.getNganhHocByKhoa(khoa);
	        return ResponseEntity.ok().body(nganhHocList);
	    }
}
