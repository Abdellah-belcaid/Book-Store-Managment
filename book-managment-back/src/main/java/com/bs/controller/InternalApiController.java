package com.bs.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bs.exception.UserNotFoundException;
import com.bs.model.Role;
import com.bs.service.IUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/internal")
@RequiredArgsConstructor
public class InternalApiController {

	private final IUserService userService;

	@PutMapping("make-admin/{username}")
	public ResponseEntity<?> changeUserRole(@PathVariable String username) {
		try {
			Role role = userService.makeAdmin(username);
			return ResponseEntity.ok()
					.body(Map.of("message", "User " + username + " has been granted " + role + " role."));
		} catch (UserNotFoundException ex) {
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
		} catch (RuntimeException ex) {
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
		} catch (Exception ex) {
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
