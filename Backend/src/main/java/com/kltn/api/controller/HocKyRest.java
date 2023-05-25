package com.kltn.api.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import com.kltn.api.entity.ChiTietHocKy;
import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocKy;
import com.kltn.api.entity.Khoa;
import com.kltn.api.entity.Lich;
import com.kltn.api.service.HocKyService;

@RestController
@RequestMapping("/api/hocky")
@CrossOrigin(origins =   "${client.url}")
public class HocKyRest {
	
	@Autowired
	private HocKyService hocKyService;
	
	@GetMapping
	public List<HocKy> getAllKhoa() {
		// TODO Auto-generated method stub
		return hocKyService.getAllKhoa();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public HocKy getHocKyById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return hocKyService.getHocKyById(id);
	}

	@PostMapping
	public HocKy addHocKy(@RequestBody HocKy hocKy) {
		hocKy.setMaHocKy(hocKyService.autoId());
		hocKyService.addOrUpdateHocKy(hocKy);
		return hocKy;
	}
	
	@PutMapping
	public HocKy updateHocKy(@RequestBody HocKy hocKy) {
		hocKyService.addOrUpdateHocKy(hocKy);
		return hocKy;
	}
	@GetMapping("/timkiem")
    public ResponseEntity<List<HocKy>> timKiemHocKy(@RequestParam("value") String textSearch) {
        List<HocKy> hocKys = hocKyService.timKiemHocKy(textSearch);
        return ResponseEntity.ok(hocKys);
    }
	
	@GetMapping("/khoahoc")
    public ResponseEntity<List<HocKy>> getHocKyTheoKhoaHoc(@RequestParam("startDate") Date startDate, @RequestParam("endDate") Date endDate) {
        List<HocKy> hocKys = hocKyService.getHocKyTheoKhoaHoc(startDate, endDate);
        return ResponseEntity.ok(hocKys);
    }

	@GetMapping("/ctk")
	public List<HocKy> getHocKyTheoMaCTK(@RequestParam("maCTK") String maCTK) {
		// TODO Auto-generated method stub
		return hocKyService.getHocKyTheoMaCTK(maCTK);
	}
	
	@PostMapping("/addCTHP")
	public void addCTMonHoc(@RequestBody ChiTietHocPhan chiTietMonHoc) {
		
		hocKyService.addChiTietMonHoc(chiTietMonHoc);
	}
	
	@DeleteMapping("/cthp/delete")
	public void removeMonHocOfChuongTrinhKhung(@RequestParam("maCTK") String maCTK,@RequestParam("maHK") String maHK,@RequestParam("maHP") String maHP) {
		hocKyService.removeMonHocOfChuongTrinhKhung(maCTK, maHK, maHP);
		
	}
	@GetMapping("/bymakhoahoc")
	public List<HocKy> getHocKyByKhoaHoc(@RequestParam("maKhoaHoc") String maKhoaHoc) {
		// TODO Auto-generated method stub
		return hocKyService.getHocKyByKhoaHoc(maKhoaHoc);
	}
	
	@GetMapping("/tenhocky")
	public List<HocKy> getHocKyTheoTen(@RequestParam("tenHocKy") String tenHocKy){
		return hocKyService.getHocKyTheoTen(tenHocKy);
	}
}
