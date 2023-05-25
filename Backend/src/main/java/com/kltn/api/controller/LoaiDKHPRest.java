package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.LoaiDangKyHP;
import com.kltn.api.service.LoaiDKHPService;

@RestController
@RequestMapping("/api/loaidkhp")
public class LoaiDKHPRest {
	@Autowired
	private LoaiDKHPService loaiDKHPService;
	
	@GetMapping
	public List<LoaiDangKyHP> getAllLoaiDKHP() {
		return loaiDKHPService.getAllLoaiDKHP();
	}

	@PostMapping
	public void addLoaiDKHP(@RequestBody LoaiDangKyHP loaiDangKyHP) {
		loaiDangKyHP.setMaLoaiDKHP(loaiDKHPService.autoId());
		loaiDKHPService.addOrUpdateLoaiDKHP(loaiDangKyHP);
		
	}
	
	@PutMapping
	public void updateLoaiDKHP(@RequestBody LoaiDangKyHP loaiDangKyHP) {
		loaiDKHPService.addOrUpdateLoaiDKHP(loaiDangKyHP);
		
	}
}
