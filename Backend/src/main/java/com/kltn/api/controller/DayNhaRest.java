package com.kltn.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

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

import com.kltn.api.entity.DayNha;
import com.kltn.api.entity.SinhVien;
import com.kltn.api.service.DayNhaService;

@RestController
@RequestMapping("/api/daynha")

@CrossOrigin(origins =   "${client.url}")


public class DayNhaRest {
	@Autowired
	private DayNhaService dayNhaService;
	
	@GetMapping
	public List<DayNha> getAllDayNha(){
		return dayNhaService.getAllDayNha();
		
	}
	@GetMapping
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public DayNha getDayNhaById(@PathVariable String id) {
		// TODO Auto-generated method stub
		return dayNhaService.getDayNhaById(id);
	}
	@PostMapping
	public DayNha addDayNha(@RequestBody DayNha dayNha) {
		dayNha.setMaDayNha(dayNhaService.autoId());
		dayNhaService.addOrUpdateDayNha(dayNha);
		return dayNha;
	}
	@PutMapping
	public DayNha updateDayNha(@RequestBody DayNha dayNha) {
		
		dayNhaService.addOrUpdateDayNha(dayNha);
		return dayNha;
	}
	
	 @GetMapping("/timkiem")
	    public ResponseEntity<List<DayNha>> timKiemDayNha(@RequestParam("value") String textSearch) {
	        List<DayNha> dayNhas = dayNhaService.timKiemDayNha(textSearch);
	        return ResponseEntity.ok(dayNhas);
	    }
	 @GetMapping("/tendaynha")
	 public List<DayNha> getDayNhanTheoTen(@RequestParam("tenDayNha") String tenDayNha){
		 return dayNhaService.getDayNhaTheoTen(tenDayNha);
	 }

}
