package com.kltn.api.controller;

import java.sql.Date;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.Phong;
import com.kltn.api.service.PhongService;

@RestController
@RequestMapping("/api/phong")
@CrossOrigin(origins =  "${client.url}")
public class PhongRest {

	@Autowired
	private PhongService phongService;
	@GetMapping
	public List<Phong> getAllPhong(){
		return phongService.getAllPhong();
	}
	
	@GetMapping
	@RequestMapping(value = "/{id}", method =   RequestMethod.GET)
	@ResponseBody
	public Phong getPhongById(String id) {
		return phongService.getPhongById(id);
	}
	
	@PostMapping
	public Phong addPhong(@RequestBody Phong phong) {
		phong.setMaPhong(phongService.autoId());
		phongService.addOrUpdatePhong(phong);
		return phong;
	}
	@PutMapping
	public Phong updatePhong(@RequestBody Phong phong) {
		phongService.addOrUpdatePhong(phong);
		return phong;
	}
	
	@GetMapping("/phongtrong")
	public List<Phong> getPhongHocConTrong(@RequestParam("maLoai") String maLoai,@RequestParam("maDay") String maDay,
			@RequestParam("ngayHoc") Date ngayHoc,@RequestParam("maCa") String maCa) {
		// TODO Auto-generated method stub
		return phongService.getPhongHocConTrong(maLoai, maDay, ngayHoc, maCa);
	}
	
	
}
