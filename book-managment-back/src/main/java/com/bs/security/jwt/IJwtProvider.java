package com.bs.security.jwt;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;

import com.bs.security.UserPrincipal;

public interface IJwtProvider {

	String generateToken(UserPrincipal auth);

	boolean validateToken(HttpServletRequest request);

	Authentication getAuthentication(HttpServletRequest request);

}
