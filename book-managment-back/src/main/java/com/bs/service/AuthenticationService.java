package com.bs.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bs.dao.IAuthenticationService;
import com.bs.model.User;
import com.bs.security.UserPrincipal;
import com.bs.security.jwt.IJwtProvider;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService implements IAuthenticationService {

	private AuthenticationManager authenticationManager;
	private IJwtProvider jwtProvider;

	@Override
	public User signInAndReturnJWT(User signInRequest) {
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		String jwt = jwtProvider.generateToken(userPrincipal);

		User signInUser = userPrincipal.getUser();
		signInUser.setToken(jwt);

		return signInUser;
	}

}
