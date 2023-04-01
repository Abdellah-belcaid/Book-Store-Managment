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

import com.bs.dao.IAuthenticationService;
import com.bs.dao.IUserService;
import com.bs.model.User;
import com.bs.util.Utils;

import io.jsonwebtoken.io.IOException;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/authentication") // pre-path
@AllArgsConstructor
public class AuthenticationController {

	private IAuthenticationService authenticationService;
	private IUserService userService;

	@PostMapping("/sign-up")
	public ResponseEntity<?> signUp(@RequestParam("imageFile") String imageFile, @ModelAttribute User user) {
	    if (userService.findByUsername(user.getUsername()).isPresent()) {
	        return new ResponseEntity<>(HttpStatus.CONFLICT);
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
		User userAuth = authenticationService.signInAndReturnJWT(user);
		String base64Image = null;
		try {
			base64Image = Utils.loadImageAsBase64(userAuth.getImage_Path());
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, Object> response = new HashMap<>();
		response.put("user", userAuth);
		response.put("imageData", base64Image);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
