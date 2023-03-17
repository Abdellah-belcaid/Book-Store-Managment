package com.bs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bs.dao.IAuthenticationService;
import com.bs.dao.IUserService;
import com.bs.model.User;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/authentication") // pre-path
@AllArgsConstructor
public class AuthenticationController {

	private IAuthenticationService authenticationService;
	private IUserService userService;

	@PostMapping("sign-up") // api/authentication/sign-up
	public ResponseEntity<?> signUp(@RequestBody User user) {
		if (userService.findByUsername(user.getUsername()).isPresent()) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
	}

	@PostMapping("sign-in") // api/authentication/sign-in
	public ResponseEntity<?> signIn(@RequestBody User user) {
		return new ResponseEntity<>(authenticationService.signInAndReturnJWT(user), HttpStatus.OK);
	}
}
