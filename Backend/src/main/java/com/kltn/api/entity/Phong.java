package com.kltn.api.entity;

import java.util.List;

import org.hibernate.annotations.NaturalId;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Phong{
	@Id
	private String maPhong;
	@Column(columnDefinition = "nvarchar(255)")
	private String tenPhong;
	private Integer soGhe;
	@Column(columnDefinition = "nvarchar(255)")
	private String trangThai;
	
	@ManyToOne
	@JoinColumn(name = "maLoaiPhong")
	private LoaiPhong loaiPhong;
	
	@ManyToOne
	@JoinColumn(name = "maDayNha")
	private DayNha dayNha;

	public Phong(String maPhong) {
		super();
		this.maPhong = maPhong;
	}
	
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "phong")
//	private List<Lich> dsLich;
	
}
