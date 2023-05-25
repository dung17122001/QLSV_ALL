package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.NhomThucHanh;
import com.kltn.api.service.NhomTHService;

@RestController
@RequestMapping("/api/nhomTH")
@CrossOrigin(origins =  "${client.url}")
public class NhomTHRest {
	@Autowired
	private NhomTHService nhomTHService;
	
	@PostMapping
	public NhomThucHanh saveOrUpdateNhomTH(@RequestBody NhomThucHanh nhomThucHanh) {
		// TODO Auto-generated method stub
		nhomThucHanh.setMaNhom(nhomTHService.autoId());
		nhomTHService.saveOrUpdateNhomTH(nhomThucHanh);
		return nhomThucHanh;
	}

	@GetMapping
	public List<NhomThucHanh> getAllNhomTH() {
		// TODO Auto-generated method stub
		return nhomTHService.getAllNhomTH();
	}
	
	@GetMapping("/maLHP")
	public List<NhomThucHanh> getNhomTHTheoMaLHP(@RequestParam("maLHP") String maLHP) {
		// TODO Auto-generated method stub
		return nhomTHService.getNhomTHTheoMaLHP(maLHP);
	}
	
	@GetMapping("/lhp")
	public List<NhomThucHanh> getAllNhomTHByMaLHP(@RequestParam("maLHP") String maLHP) {
		// TODO Auto-generated method stub
		return nhomTHService.getAllNhomTHByMaLHP(maLHP);
	}
	
	@DeleteMapping("/delete")
	public void xoaTatCaNhomTHTheoMaLHP(@RequestParam String maLHP) {
		// TODO Auto-generated method stub
		nhomTHService.xoaTatCaNhomTHTheoMaLHP(maLHP);
	}

}
