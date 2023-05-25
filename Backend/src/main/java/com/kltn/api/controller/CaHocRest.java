package com.kltn.api.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.kltn.api.entity.CaHoc;
import com.kltn.api.service.CaHocService;

@RestController
@RequestMapping("/api/cahoc")
@CrossOrigin(origins =  "${client.url}")
public class CaHocRest {
	@Autowired
	private CaHocService caHocService;
	
	@GetMapping
	public List<CaHoc> getAllCaHoc(){
		return caHocService.getAllCaHoc();
	}
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public CaHoc getCaHocById(@PathVariable String id) {
		return caHocService.getCaHocById(id);
	}
	@PostMapping
	public void addCaHoc(@RequestBody CaHoc caHoc) {
		caHoc.setMaCaHoc(caHocService.autoId());
		caHocService.saveOrUpdateCaHoc(caHoc);
	}
	@PutMapping
	public void updateCaHoc(@RequestBody CaHoc caHoc) {
		caHocService.saveOrUpdateCaHoc(caHoc);
	}
	
	@GetMapping("/gv")
	public List<CaHoc> getTatCaCaHocKhongTrungLichDayCuaGV(@RequestParam("maGV") String maGV,@RequestParam("ngayDay") Date ngayDay) {
		// TODO Auto-generated method stub
		return caHocService.getTatCaCaHocKhongTrungLichDayCuaGV(maGV, ngayDay);
	}

}
