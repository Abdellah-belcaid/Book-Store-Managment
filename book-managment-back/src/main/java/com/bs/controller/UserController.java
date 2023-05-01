package com.bs.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bs.model.User;
import com.bs.service.IUserService;

import io.jsonwebtoken.io.IOException;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

	private final IUserService userService;

	@GetMapping
	public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable("id") Long id,
			@Nullable @RequestParam("imageFile") String imageFile,
			@Nullable @RequestParam("oldPassword") String oldPassword, @ModelAttribute User user) {
				
		Optional<User> existingUser = userService.getUserById(id);
		if (existingUser.isPresent()) {
			try {
				User oldUser = existingUser.get();
				return userService.updateUser(oldUser, user, oldPassword, imageFile);
			} catch (IOException e) {
				return new ResponseEntity<>("Could not update user image", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
		return new ResponseEntity<HttpStatus>(userService.deleteUser(id));
	}

}
