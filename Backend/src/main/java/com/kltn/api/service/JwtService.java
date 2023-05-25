package com.kltn.api.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
	String extractUsername(String token);
	boolean isTokenValid(String token, UserDetails user);
	String generateToken(UserDetails user);
	String generateRefreshToken(UserDetails user);
	boolean isTokenExpired(String token );
}
