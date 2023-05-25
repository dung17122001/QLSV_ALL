package com.kltn.api.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonHoc{
	 	@Id
	    private String maMonHoc;
	    @Column(columnDefinition = "nvarchar(255)")
	    private String tenMonHoc;
	    private Integer soTCLT;
	    private Integer soTCTH;
	    @Column(columnDefinition = "nvarchar(255)")
	    private String trangThai;

	    @ManyToMany
	    @JoinTable(
	        name = "danhsach_monhoc_tienquyet",
	        joinColumns = @JoinColumn( name = "monhoc_id", referencedColumnName = "maMonHoc"),
	        inverseJoinColumns = @JoinColumn(name = "id_monhoc_tienquyet", referencedColumnName = "maMonHoc")
	    )
	    @PrimaryKeyJoinColumn(name = "monhoc_id")
	    private Set<MonHoc> danhSachMonHocTienQuyet;

	    @ManyToMany
	    @JoinTable(
	        name = "danhsach_monhoc_hoctruoc",
	        joinColumns = @JoinColumn(name = "monhoc_id", referencedColumnName = "maMonHoc"),
	        inverseJoinColumns = @JoinColumn(name = "id_monhoc_hoctruoc", referencedColumnName = "maMonHoc")
	    )
	    @PrimaryKeyJoinColumn(name = "monhoc_id")
	    private Set<MonHoc> danhSachMonHocHocTruoc;

	    @ManyToMany
	    @JoinTable(
	        name = "danhsach_monhoc_songhanh",
	        joinColumns = @JoinColumn(name = "monhoc_id", referencedColumnName = "maMonHoc"),
	        inverseJoinColumns = @JoinColumn(name = "id_monhoc_songhanh", referencedColumnName = "maMonHoc")
	    )
	    @PrimaryKeyJoinColumn(name = "monhoc_id")
	    private Set<MonHoc> danhSachMonHocSongHanh;


		public MonHoc(String maMonHoc) {
			super();
			this.maMonHoc = maMonHoc;
		}
	    
	    

}
