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
import org.springframework.web.bind.annotation.RestController;

import com.kltn.api.entity.ChiTietHocPhan;
import com.kltn.api.entity.HocPhan;
import com.kltn.api.entity.MonHoc;
import com.kltn.api.service.HocPhanService;

@RestController
@RequestMapping("/api/hocphan")
@CrossOrigin(origins =  "${client.url}")
public class HocPhanRest {
	
	@Autowired
	private HocPhanService hocPhanService;
	
	@PostMapping
	public HocPhan addHocPhan(@RequestBody HocPhan hocPhan) {
		hocPhan.setMaHocPhan(hocPhanService.autoId());
		hocPhanService.saveOrUpdateHocPhan(hocPhan);
		return hocPhan;
	}
	
	@PutMapping
	public void updateHocPhan(HocPhan hocPhan) {
		hocPhanService.saveOrUpdateHocPhan(hocPhan);
	}


	@GetMapping
	public List<HocPhan> getAllHocPhan() {
		// TODO Auto-generated method stub
		return hocPhanService.getAllHocPhan();
	}

	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public HocPhan getHocPhanById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return hocPhanService.getHocPhanById(id);
	}
	
	@GetMapping("/hocky")
	public List<HocPhan> getHocPhanTheoHocKy(@RequestParam("maHocKy") String maHocKy) {
		// TODO Auto-generated method stub
		return hocPhanService.getHocPhanTheoHocKy(maHocKy);
	}
	
	@GetMapping("/chitiet")
	public List<ChiTietHocPhan> getChiTietHocPhan(@RequestParam("startDate") Date startDate,@RequestParam("endDate") Date endDate, @RequestParam("maCTK") String maCTK) {
		// TODO Auto-generated method stub
		return hocPhanService.getChiTietHocPhan(startDate, endDate, maCTK);
	}
	
	@GetMapping("/monhoc")
	public HocPhan getHocPhanTheoMaMH(@RequestParam String maMH) {
		// TODO Auto-generated method stub
		return hocPhanService.getHocPhanTheoMaMH(maMH);
	}

	@GetMapping("/sinhvien_nganh")
	public List<ChiTietHocPhan> findHocPhanByMaSinhVienAndMaNganh (@RequestParam String maSinhVien, @RequestParam String maNganh) {
		// TODO Auto-generated method stub
		return hocPhanService.findHocPhanByMaSinhVienAndMaNganh(maSinhVien, maNganh);
	}
	
	@GetMapping("/giangvien")
	public List<HocPhan> getHocPhanTheoKyVaMaGV(@RequestParam("maGV") String maGV,@RequestParam("maHK") String maHK) {
		// TODO Auto-generated method stub
		return hocPhanService.getHocPhanTheoKyVaMaGV(maGV, maHK);

	}
}
