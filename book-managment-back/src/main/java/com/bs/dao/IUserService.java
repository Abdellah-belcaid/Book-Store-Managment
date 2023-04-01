package com.bs.dao;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;

import com.bs.model.User;

import io.jsonwebtoken.io.IOException;

public interface IUserService {

	User saveUser(User user, String imageFile) throws IOException;

	Optional<User> findByUsername(String username);

	void makeAdmin(String username);

	HttpStatus deleteUser(Long id);

	User updateUser(Long id, User user);

	List<Map<String, Object>> getAllUsers();

	User getUserById(Long id);

}
