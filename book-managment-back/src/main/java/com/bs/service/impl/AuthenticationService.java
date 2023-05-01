package com.bs.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bs.dao.UserDTO;
import com.bs.exception.InvalidCredentialsException;
import com.bs.model.User;
import com.bs.security.UserPrincipal;
import com.bs.security.jwt.IJwtProvider;
import com.bs.service.IAuthenticationService;
import com.bs.util.ConvertorUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthenticationService implements IAuthenticationService {

	private final AuthenticationManager authenticationManager;
	private final IJwtProvider jwtProvider;

	@Override
	public UserDTO signInAndReturnJWT(User signInRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

			UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
			String jwt = jwtProvider.generateToken(userPrincipal);

			User signInUser = userPrincipal.getUser();
			signInUser.setToken(jwt);

			return  ConvertorUtils.convertUserToDto(signInUser);
		} catch (Exception e) {
			throw new InvalidCredentialsException("Invalid username or password");
		}
	}

}
