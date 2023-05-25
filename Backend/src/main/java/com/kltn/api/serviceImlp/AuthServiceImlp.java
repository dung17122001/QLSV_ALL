package com.kltn.api.serviceImlp;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.kltn.api.entity.Role;
import com.kltn.api.entity.User;
import com.kltn.api.repository.UserRepository;
import com.kltn.api.service.AuthService;
import com.kltn.api.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImlp implements AuthService {

	private final UserRepository userRepo;



    private final AuthenticationManager authManager;

    private final JwtService jwtService;


    @Override
    public List<User> getUsers() {
        return userRepo.findAll();
    }

    @Override
    public Map<String, String> registerUser(User userRegister) {
        var newUser = new User();

        PasswordEncoder passEndcoder = new BCryptPasswordEncoder(); // khởi tạo pass mã hoá (chưa có data)
        String pass = passEndcoder.encode(userRegister.getPassword());   // lấy pass ra, mã hoá bcrypt

        newUser.setUsername(userRegister.getUsername());
        newUser.setPassword(pass);
        newUser.setRole(userRegister.getRole());
       
//        System.out.println(Role.ROLE_GIANGVIEN);
       
        userRepo.save(newUser);

        String accessToken = jwtService.generateToken(newUser);   // tạo token với thông tin là user truyền vào

        String refreshToken = jwtService.generateRefreshToken(newUser); // khác access token về thời gian tồn tại
        Map<String, String> dataAuth = new HashMap<>();
        dataAuth.put("accessToken",accessToken);
        dataAuth.put("refreshToken",refreshToken);
        return dataAuth;
    }

    @Override
    public Map<String, String> authenticateUser(ObjectNode userData) {
        String username = userData.get("username").asText();
        String password = userData.get("password").asText();
        var user = userRepo.findByUsername(username);

        if(user == null)
            return null;
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username,password)
        );

        String accessToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        Map<String, String> dataAuth = new HashMap<>();
        dataAuth.put("accessToken",accessToken);
        dataAuth.put("refreshToken",refreshToken);
        dataAuth.put("username",user.getUsername());
        dataAuth.put("role",user.getRole().name());
        
        return dataAuth;
    }

    @Override
    public Map<String, String> getNewToken(String refreshToken) {
    	 Map<String, String> dataNewToken = new HashMap<>();
         String userName =  jwtService.extractUsername(refreshToken);

         User user = userRepo.findByUsername(userName);
         if(user == null || !jwtService.isTokenValid(refreshToken, user)){
             dataNewToken.put("errorMessage","Token không hợp lệ");
             return dataNewToken;
         }

         String newAccessToken = jwtService.generateToken(user);
         String newRefreshToken = jwtService.generateRefreshToken(user);

         dataNewToken.put("accessToken",newAccessToken);
         dataNewToken.put("refreshToken",newRefreshToken);

         return dataNewToken;
    }

	@Override
	public void updatePassword(String pass, String userName) {
		 PasswordEncoder passEndcoder = new BCryptPasswordEncoder(); // khởi tạo pass mã hoá (chưa có data)
	        String passMaHoa = passEndcoder.encode(pass);   // lấy pass ra, mã hoá bcrypt
		userRepo.updatePassword(passMaHoa, userName);
	}

	@Override
	public Boolean getPassOld(String userName,String passInput) {
		// TODO Auto-generated method stub
		PasswordEncoder passEndcoder = new BCryptPasswordEncoder(); // khởi tạo pass mã hoá (chưa có data)
        //String passMaHoa = passEndcoder.encode(passInput);   // lấy pass ra, mã hoá bcrypt
        if(passEndcoder.matches(passInput, userRepo.getPassOld(userName)))
        	return true;
		return false;
	}
}
