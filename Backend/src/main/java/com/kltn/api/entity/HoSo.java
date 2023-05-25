package com.kltn.api.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;


//@Entity
//@Table(name = "HoSo")
@Embeddable
public class HoSo {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//@Column(name = "maHoSo", columnDefinition = "nvarchar(255)")
	//private String maHoSo;
	//@Column(name = "soCMND")
	private String soCMND;
	//@Column(name = "ngaySinh")
	private Date ngaySinh;
	//@Column(name = "soDienThoai")
	private String soDienThoai;
	@Column(name = "diaChi", columnDefinition = "nvarchar(255)")
	private String diaChi;
	@Column(name = "noiSinh", columnDefinition = "nvarchar(255)")
	private String noiSinh;
	//@Column(name = "ngayCapCCCD")
	private Date ngayCapCCCD;
	@Column(name = "noiCapCCCD", columnDefinition = "nvarchar(255)")
	private String noiCapCCCD;
	private String email;
	private String linkAnh;
	@Column(name = "doiTuong", columnDefinition = "nvarchar(255)")
	private String doiTuong;
	@Column(name = "dienChinhSach", columnDefinition = "nvarchar(255)")
	private String dienChinhSach;
	//@Column(name = "ngayVaoDoan")
	private Date ngayVaoDoan;
	//@Column(name = "ngayVaoDang")
	private Date ngayVaoDang;
	//@Column(columnDefinition = "nvarchar(255)")
	//private String trangThai;
	
//	@OneToOne
//	@MapsId
//	@JoinColumn(name="hoSo") 
//	private SinhVien sinhVien;
//	
//	@OneToOne()
//	@MapsId
//	@JoinColumn(name="hoSo") 
//	private GiangVien giangVien;
	
	public HoSo() {
		// TODO Auto-generated constructor stub
	}

	public HoSo( String soCMND, Date ngaySinh, String soDienThoai, String diaChi, String noiSinh,
			Date ngayCapCCCD, String noiCapCCCD, String email, String doiTuong, String dienChinhSach, Date ngayVaoDoan,
			Date ngayVaoDang) {
		super();
		//this.maHoSo = maHoSo;
		this.soCMND = soCMND;
		this.ngaySinh = ngaySinh;
		this.soDienThoai = soDienThoai;
		this.diaChi = diaChi;
		this.noiSinh = noiSinh;
		this.ngayCapCCCD = ngayCapCCCD;
		this.noiCapCCCD = noiCapCCCD;
		this.email = email;
		this.doiTuong = doiTuong;
		this.dienChinhSach = dienChinhSach;
		this.ngayVaoDoan = ngayVaoDoan;
		this.ngayVaoDang = ngayVaoDang;
		//this.trangThai = trangThai;
	}

//	public String getMaHoSo() {
//		return maHoSo;
//	}
//
//	public void setMaHoSo(String maHoSo) {
//		this.maHoSo = maHoSo;
//	}

	public String getSoCMND() {
		return soCMND;
	}

	public void setSoCMND(String soCMND) {
		this.soCMND = soCMND;
	}

	public Date getNgaySinh() {
		return ngaySinh;
	}

	public void setNgaySinh(Date ngaySinh) {
		this.ngaySinh = ngaySinh;
	}

	public String getSoDienThoai() {
		return soDienThoai;
	}

	public void setSoDienThoai(String soDienThoai) {
		this.soDienThoai = soDienThoai;
	}

	public String getDiaChi() {
		return diaChi;
	}

	public void setDiaChi(String diaChi) {
		this.diaChi = diaChi;
	}

	public String getNoiSinh() {
		return noiSinh;
	}

	public void setNoiSinh(String noiSinh) {
		this.noiSinh = noiSinh;
	}

	public Date getNgayCapCCCD() {
		return ngayCapCCCD;
	}

	public void setNgayCapCCCD(Date ngayCapCCCD) {
		this.ngayCapCCCD = ngayCapCCCD;
	}

	public String getNoiCapCCCD() {
		return noiCapCCCD;
	}

	public void setNoiCapCCCD(String noiCapCCCD) {
		this.noiCapCCCD = noiCapCCCD;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDoiTuong() {
		return doiTuong;
	}

	public void setDoiTuong(String doiTuong) {
		this.doiTuong = doiTuong;
	}

	public String getDienChinhSach() {
		return dienChinhSach;
	}

	public void setDienChinhSach(String dienChinhSach) {
		this.dienChinhSach = dienChinhSach;
	}

	public Date getNgayVaoDoan() {
		return ngayVaoDoan;
	}

	public void setNgayVaoDoan(Date ngayVaoDoan) {
		this.ngayVaoDoan = ngayVaoDoan;
	}

	public Date getNgayVaoDang() {
		return ngayVaoDang;
	}

	public void setNgayVaoDang(Date ngayVaoDang) {
		this.ngayVaoDang = ngayVaoDang;
	}

//	public String getTrangThai() {
//		return trangThai;
//	}
//
//	public void setTrangThai(String trangThai) {
//		this.trangThai = trangThai;
//	}
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}
	
}