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
import com.kltn.api.entity.LopHoc;
import com.kltn.api.entity.NganhHoc;
import com.kltn.api.service.LopHocService;

@RestController
@RequestMapping("/api/lophoc")
@CrossOrigin(origins =   "${client.url}")
public class LopHocRest {
	@Autowired
	private LopHocService lopHocService;
	
	@PostMapping()
	public LopHoc addLopHoc(@RequestBody LopHoc lopHoc) {
		lopHoc.setMaLop(lopHocService.autoId());
		lopHocService.saveOrUpdateLopHoc(lopHoc);
		return lopHoc;
	}
	
	@PutMapping()
	public void updateLopHoc(@RequestBody LopHoc lopHoc) {
		//lopHoc.setMaLop(lopHocService.autoId());
		lopHocService.saveOrUpdateLopHoc(lopHoc);
	}
	
	@GetMapping
	public List<LopHoc> getAllLopHoc() {
		// TODO Auto-generated method stub
		return lopHocService.getAllLopHoc();
	}
	
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public LopHoc getLopHocById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return lopHocService.getLopHocById(id);
	}
	 @GetMapping("/nganhhoc")
	    public ResponseEntity<List<LopHoc>> getLopHocByNganh(@RequestParam String nganhId) {
		 	NganhHoc nganhHoc = new NganhHoc(nganhId);
	        nganhHoc.setId(nganhId);
	        List<LopHoc> lopHocList = lopHocService.getLopHocByNganhHoc(nganhHoc);
	        return ResponseEntity.ok().body(lopHocList);
	    }
	 @GetMapping("/countlophoc")
	 public int countLopHocBtTenLopHoc(@RequestParam String tenLop) {
		return lopHocService.countLopHocByTenLopHoc(tenLop);
		 
	 }
	 
}
