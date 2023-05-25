package com.kltn.api.controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.LoaiPhong;
import com.kltn.api.service.LoaiPhongService;

@RestController
@RequestMapping("/api/loaiphong")
@CrossOrigin(origins =  "${client.url}")
public class LoaiPhongRest {
	@Autowired
	private LoaiPhongService loaiPhongService;
	
	@GetMapping
	public List<LoaiPhong> getAllLoaiPhong(){
		return loaiPhongService.getAllLoaiPhong();
	}
	
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public LoaiPhong getLoaiPhongById(@PathVariable String id) {
		return loaiPhongService.getLoaiPhongById(id);
		
	}
	@PostMapping
	public void addLoaiPhong(@RequestBody LoaiPhong loaiPhong) {
		loaiPhong.setMaLoaiPhong(loaiPhongService.autoId());
		loaiPhongService.addOrUpdateLoaiPhong(loaiPhong);
	}
	@PutMapping
	public void updateLoaiPhong(@RequestBody LoaiPhong loaiPhong) {
		loaiPhongService.addOrUpdateLoaiPhong(loaiPhong);
	}

}
