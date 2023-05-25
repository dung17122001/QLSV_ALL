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

import com.kltn.api.entity.ChucVu;

import com.kltn.api.service.ChucVuService;

@RestController
@RequestMapping("/api/chucvu")
@CrossOrigin(origins =   "${client.url}")
public class ChucVuRest {
	@Autowired
	private ChucVuService chucVuService;
	
	@GetMapping
	public List<ChucVu> getAllChucVu(){
		return chucVuService.getAllChucVu();
	}
	
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ChucVu getChucVuById(@PathVariable String id) {
		return chucVuService.getChucVuById(id);
	}
	@PostMapping
	public void addChucVu(@RequestBody ChucVu chucVu) {
		chucVu.setMaChucVu(chucVuService.autoId());
		chucVuService.saveOrUpdateChucVu(chucVu);
		
	}
	@PutMapping
	public void updateChucVu(@RequestBody ChucVu chucVu) {
		
		chucVuService.saveOrUpdateChucVu(chucVu);
		
	}
	

}
