package com.kltn.api.serviceImlp;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kltn.api.service.JwtService;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceImlp implements JwtService {

	//  https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
	private static String SECRET_KEY = "50645367566B59703373367638792F423F4528482B4D6251655468576D5A7134";

	/*Trích xuất thông tin username từ hàm extractClaim, truyền vào token, và tham chiếu tới
	 * phương thức getSubject để lấy ra thông tin payload trong token*/
	@Override
	public String extractUsername(String token) {

		var userName = extractClaim(token, Claims::getSubject);

		return userName;

	}


	// tạo token theo thông tin user
	@Override
	public String generateToken(UserDetails user){
		return generateToken(new HashMap<>(), user,1000*60*60*24); // 1 ngay
	}

	@Override
	public String generateRefreshToken(UserDetails user) {
		return generateToken(new HashMap<>(), user,1000*60*60*24*7); // 7 ngay
	}


	// tạo token theo 1 danh sách claim và thông tin user
	public String generateToken(Map<String,Object> extraClaims, UserDetails user, int time){


		// tạo token để trả về
		return Jwts.builder()
				.setClaims(extraClaims)
				.setSubject(user.getUsername())

				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date((System.currentTimeMillis()+time)))   // 1 ngay
				.signWith(getSignInKey(), SignatureAlgorithm.HS256)
				.compact();
	}




	/*Trích xuất 1 claim trong Token*/
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
		final Claims claims = extractAllClaims(token);

		if (claims == null)
			return null;
		return claimsResolver.apply(claims);
	}


	/*Trích xuất nhiều claims cho JWT token*/
	private Claims extractAllClaims(String token){

		return Jwts.parser().setSigningKey(getSignInKey()).parseClaimsJws(token).getBody();

	}


	/*Tạo khoá để mã hoá claim*/
	private Key getSignInKey(){
		byte[] newKey = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(newKey);
	}

	// valid Token

	@Override
	public boolean isTokenValid(String token, UserDetails user){
		if(user == null)
			return false;
		final  String userName = extractUsername(token);

		return userName.equals(user.getUsername()) && !isTokenExpired(token);
	}

	@Override
	public boolean isTokenExpired(String token ){
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
}

