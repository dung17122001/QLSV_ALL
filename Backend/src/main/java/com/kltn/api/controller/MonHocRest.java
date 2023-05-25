package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.MonHoc;
import com.kltn.api.service.MonHocService;

@RestController
@RequestMapping("/api/monhoc")
@CrossOrigin(origins =  "${client.url}")
public class MonHocRest {

	@Autowired
	private MonHocService monHocService;

	@GetMapping
	public List<MonHoc> getAllMonHoc() {
		// TODO Auto-generated method stub
		return monHocService.getAllMonHoc();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public MonHoc getMonHocById(String id) {
		// TODO Auto-generated method stub
		return monHocService.getMonHocById(id);
	}

	@PostMapping
	public MonHoc addMonHoc(@RequestBody MonHoc monHoc) {
		try {
			monHoc.setMaMonHoc(monHocService.autoId());
			monHocService.addOrUpdateMonHoc(monHoc);
			return monHoc;
		} catch (Exception e) {
			throw e;
		}
		
	}
	
	@PutMapping
	public void updateMonHoc(@RequestBody MonHoc monHoc) {
		
		monHocService.addOrUpdateMonHoc(monHoc);
	}
	
	@GetMapping("/search")
	public List<MonHoc> getMonHocByTextSearch(@RequestParam("valueSearch") String valueSearch) {
		// TODO Auto-generated method stub
		return monHocService.getMonHocByTextSearch(valueSearch);
	}
}
