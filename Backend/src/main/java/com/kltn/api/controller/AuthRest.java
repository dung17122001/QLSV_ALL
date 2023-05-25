package com.kltn.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.kltn.api.entity.User;
import com.kltn.api.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins =  "${client.url}")
@RequiredArgsConstructor
public class AuthRest {

	@Autowired
    private  AuthService authService;

    @GetMapping("/user")
    public ResponseEntity<List<User>> getUsers(){

        return ResponseEntity.ok().body(authService.getUsers());
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(@CookieValue(name="refreshToken") String refreshToken) {
        System.out.println(refreshToken);
        try {
            Map<String, String>  newDataToken = authService.getNewToken(refreshToken);
            HttpHeaders cookies = new HttpHeaders();

            cookies.add("Set-Cookie","refreshToken="+newDataToken.get("refreshToken")+";Secure; HttpOnly; SameSite=None");

            newDataToken.remove("refreshToken");
            return ResponseEntity.status(HttpStatus.OK).headers(cookies).body(newDataToken);
        }
        catch(Exception e){
                throw e;
            }

    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User userRegister){
        Map<String, String> dataAuth = authService.registerUser(userRegister); // trả về map bao gồm accesstoken vs refresh token
        HttpHeaders cookies = new HttpHeaders();
        cookies.add("Set-Cookie","refreshToken="+dataAuth.get("refreshToken")+";Secure; HttpOnly");


        dataAuth.remove("refreshToken");
        return ResponseEntity.status(HttpStatus.OK).headers(cookies).body(dataAuth); // chỉ còn accesstoken trả về bên fe
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody ObjectNode  userData){
    	
        Map<String, String> dataAuth = authService.authenticateUser(userData);
        

        HttpHeaders cookies = new HttpHeaders();
        cookies.add("Set-Cookie","refreshToken="+dataAuth.get("refreshToken")+";Secure; HttpOnly");

        // chỉ trả về accessToken
        dataAuth.remove("refreshToken");
        return ResponseEntity.status(HttpStatus.OK).headers(cookies).body(dataAuth);
    }

    @GetMapping("/updatepass")
    public void updatePassword(@RequestParam("pass") String pass,@RequestParam("userName") String userName) {
		authService.updatePassword(pass, userName);
	}
	
    @GetMapping("/passold")
    public Boolean getPassOld(@RequestParam("userName") String userName,@RequestParam("pass") String passInput) {
		
		return authService.getPassOld(userName, passInput);
	}
}