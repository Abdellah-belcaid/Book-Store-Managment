package com.bs.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bs.dao.IUserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/internal")
@AllArgsConstructor
public class InternalApiController {

	private IUserService userService;

	@PutMapping("make-admin/{username}")
	public ResponseEntity<?> makeAdmibn(@PathVariable String username) {
		userService.makeAdmin(username);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
