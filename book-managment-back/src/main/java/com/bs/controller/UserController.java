package com.bs.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bs.dao.IUserService;
import com.bs.model.User;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	IUserService userService;

	@GetMapping
	public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.getUserById(id);
		if (user == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
		return new ResponseEntity<User>(userService.updateUser(id, user), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
		return new ResponseEntity<HttpStatus>(userService.deleteUser(id));
	}

}
