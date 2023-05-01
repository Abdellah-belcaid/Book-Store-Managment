package com.bs.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bs.dao.UserDTO;
import com.bs.model.User;
import com.bs.service.IAuthenticationService;
import com.bs.service.IUserService;
import com.bs.util.ImageProcessUtils;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/authentication") // pre-path
@RequiredArgsConstructor
public class AuthenticationController {

	private final IAuthenticationService authenticationService;
	private final IUserService userService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> signUp(@RequestParam("imageFile") String imageFile, @ModelAttribute User user) {
		if (userService.findByUsername(user.getUsername()).isPresent()) {
			return new ResponseEntity<>("User is already exist ! ", HttpStatus.CONFLICT);
		}
		try {
			User savedUser = userService.saveUser(user, imageFile);
			return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
		} catch (IOException e) {
			return new ResponseEntity<>("Could not save user image", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("sign-in") // api/authentication/sign-in
	public ResponseEntity<?> signIn(@RequestBody User user) {
		UserDTO userAuth = authenticationService.signInAndReturnJWT(user);
		String base64Image = null;
		try {
			base64Image = ImageProcessUtils.loadImageAsBase64(userAuth.getImage_Path());
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, Object> response = new HashMap<>();
		response.put("user", userAuth);
		response.put("imageData", base64Image);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
