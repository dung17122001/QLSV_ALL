package com.kltn.api.entity;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LopHoc{
	@Id
	private String maLop;
	@Column( columnDefinition = "nvarchar(255)")
	private String tenLop;
	@Column( columnDefinition = "nvarchar(255)")
	private String trangThai;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "idNganh")
	private NganhHoc nganhHoc;
	

	public LopHoc(String maLop) {
		super();
		this.maLop = maLop;
	}



	
}
