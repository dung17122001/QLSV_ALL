package com.kltn.api.security;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.kltn.api.config.JwtAuthenticationFilter;

import java.net.http.HttpRequest;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {


	 private final JwtAuthenticationFilter jwtAuthFilter;
	    private final AuthenticationProvider authProvider;
	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

	        http.cors();
	        http.csrf()
	                    .disable()
	                    .authorizeHttpRequests()
	                    .requestMatchers("/api/auth/**")
	                    .permitAll()

	                    .requestMatchers("/actuator/**").permitAll()
	                    
	                    .anyRequest()
	                    .authenticated()
	                    .and()
	                    .sessionManagement()
	                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	                    .and()
	                    .authenticationProvider(authProvider)
	                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

	                    return http.build();
	    }

	    @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/api/**").allowedOrigins("${client.url}")
	                        .allowCredentials(true)
	                        .allowedHeaders("*","Content-Type","Access-Control-Allow-Origins")

	                        .allowedMethods("*")
	                        .exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials","Content-Type")
	                ;
	            }
	        };
	    }
}

