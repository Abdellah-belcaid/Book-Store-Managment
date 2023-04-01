package com.bs.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bs.dao.IUserService;
import com.bs.model.Role;
import com.bs.model.User;
import com.bs.repository.IUserRepository;
import com.bs.util.Utils;

import io.jsonwebtoken.io.IOException;

@Service
public class UserService implements IUserService {
	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User saveUser(User user, String imageFile) throws IOException {
		if (user == null) {
			throw new IllegalArgumentException("User cannot be null");
		}

		if (findByUsername(user.getUsername()).isPresent()) {
			throw new IllegalArgumentException("Username already exists");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(Role.USER);
		user.setCreateTime(LocalDateTime.now());

		if (imageFile != null && !imageFile.isEmpty()) {
			String path = Utils.saveImage(imageFile, user.getUsername());
			user.setImage_Path(path);
		}

		return userRepository.save(user);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public List<Map<String, Object>> getAllUsers() {
		List<User> userList = userRepository.findAll();

		List<Map<String, Object>> users = new ArrayList<>();
		for (User user : userList) {
			try {
				Map<String, Object> response = new HashMap<>();
				String base64Image = Utils.loadImageAsBase64(user.getImage_Path());
				response.put("user", user);
				response.put("imageData", base64Image);

				users.add(response);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return users;
	}

	@Override
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Override
	@Transactional // TransactionalRequired when executing an update/delete query.
	public void makeAdmin(String username) {
		userRepository.updateUserRole(username, Role.ADMIN);
	}

	@Override
	public User updateUser(Long id, User user) {
		User existingUser = userRepository.findById(id).orElse(null);
		if (existingUser == null) {
			return null;
		}
		if (userRepository.existsByUsername(user.getUsername())
				&& !existingUser.getUsername().equals(user.getUsername())) {
			return null;
		}
		existingUser.setName(user.getName());
		existingUser.setEmail(user.getEmail());
		existingUser.setUsername(user.getUsername());
		existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(existingUser);
	}

	@Transactional
	@Override
	public HttpStatus deleteUser(Long id) {
		try {
			User user = userRepository.findById(id).orElse(null);
			if (user == null) {
				return HttpStatus.NOT_FOUND;
			}

			String imagePath = user.getImage_Path();

			if (imagePath != null) {
				// Delete user image file
				Utils.deleteImage(imagePath);
			}

			userRepository.delete(user);
			return HttpStatus.NO_CONTENT;

		} catch (EmptyResultDataAccessException e) {
			return HttpStatus.NOT_FOUND;
		} catch (DataIntegrityViolationException e) {
			return HttpStatus.BAD_REQUEST;
		} catch (Exception e) {
			return HttpStatus.INTERNAL_SERVER_ERROR;
		}
	}

}
