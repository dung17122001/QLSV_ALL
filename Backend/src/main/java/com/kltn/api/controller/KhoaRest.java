package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.NhanVien;
import com.kltn.api.service.KhoaService;

@RestController
@RequestMapping("/api/khoa")
@CrossOrigin(origins =  "${client.url}")
public class KhoaRest {
	@Autowired
	private KhoaService khoaService;
	
	@GetMapping
	public List<Khoa> getAllKhoa() {
		
		return khoaService.getAllKhoa();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public Khoa getKhoaById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return khoaService.getKhoaById(id);
	}

	@PostMapping
	public Khoa addKhoa(@RequestBody Khoa khoa) {
		khoa.setMaKhoa(khoaService.autoId());
		khoaService.addOrUpdateKhoa(khoa);
		return khoa;
		
	}
	@GetMapping("/timkiem")
    public ResponseEntity<List<Khoa>> timKiemKhoa(@RequestParam("value") String textSearch) {
        List<Khoa> khoas = khoaService.timKiemKhoa(textSearch);
        return ResponseEntity.ok(khoas);
    }
	@PutMapping
	public Khoa updateKhoa(@RequestBody Khoa khoa) {
		
		khoaService.addOrUpdateKhoa(khoa);
		return khoa;
		
	}
	@GetMapping("/tenkhoa")
	public List<Khoa> getKhoaTheoTen(@RequestParam("tenKhoa") String tenKhoa){
		return khoaService.getKhoaTheoTen(tenKhoa);
	}

}
