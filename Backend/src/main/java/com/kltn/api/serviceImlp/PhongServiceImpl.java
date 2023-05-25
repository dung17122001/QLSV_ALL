package com.kltn.api.serviceImlp;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kltn.api.entity.DayNha;
import com.kltn.api.entity.LoaiPhong;
import com.kltn.api.entity.Phong;
import com.kltn.api.repository.DayNhaRepository;
import com.kltn.api.repository.LoaiPhongRepository;
import com.kltn.api.repository.PhongRepository;
import com.kltn.api.service.PhongService;

@Service
@Transactional
public class PhongServiceImpl implements PhongService{
	@Autowired
	private PhongRepository phongRepository;
	@Autowired
	private DayNhaRepository dayNhaRepository; 
	
	@Autowired
	private LoaiPhongRepository loaiPhongRepository;
	
	@Override
	public List<Phong> getAllPhong() {
		// TODO Auto-generated method stub
		return phongRepository.findAll();
	}

	@Override
	public Phong getPhongById(String id) {
		// TODO Auto-generated method stub
		return phongRepository.getById(id);
	}

	@Override
	public void addOrUpdatePhong(Phong phong) {
		// TODO Auto-generated method stub
		if(!phong.getDayNha().getMaDayNha().equals("")) {
			var dayNha = dayNhaRepository.findById(phong.getDayNha().getMaDayNha()).get();
			if(dayNha != null) {
				phong.setDayNha(dayNha);
			}
			else {
				dayNha = new DayNha(phong.getDayNha().getMaDayNha());
				phong.setDayNha(dayNha);
			}
		}
		if(!phong.getLoaiPhong().getMaLoaiPhong().equals("")) {
			var loaiPhong = loaiPhongRepository.findById(phong.getLoaiPhong().getMaLoaiPhong()).get();
			if(loaiPhong != null) {
				phong.setLoaiPhong(loaiPhong);
			}
			else {
				loaiPhong = new LoaiPhong(phong.getLoaiPhong().getMaLoaiPhong());
				phong.setLoaiPhong(loaiPhong);
			}
		}
		phongRepository.save(phong);
		
	}

	@Override
	public String autoId() {
		 int id = phongRepository.autoId();
		    String naturalId = "P" + String.format("%03d", id+1);
		    return naturalId;
	}

	@Override
	public List<Phong> getPhongHocConTrong(String maLoai, String maDay, Date ngayHoc, String maCa) {
		// TODO Auto-generated method stub
		return phongRepository.getPhongHocConTrong(maLoai, maDay, ngayHoc, maCa);
	}

	

}
