package com.bs.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.bs.exception.UserNotFoundException;
import com.bs.model.Role;
import com.bs.model.User;

import io.jsonwebtoken.io.IOException;

public interface IUserService {

	User saveUser(User user, String imageFile) throws IOException;

	Optional<User> findByUsername(String username);

	Role makeAdmin(String username) throws UserNotFoundException;

	HttpStatus deleteUser(Long id);
	

	List<Map<String, Object>> getAllUsers();

	Optional<User> getUserById(Long id);

	ResponseEntity<?> updateUser(User oldUser, User newUser, String oldpassword, String imageFile);

}
