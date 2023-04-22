package com.bs.service.impl;

import com.bs.model.Role;
import com.bs.model.User;
import com.bs.repository.IUserRepository;
import com.bs.service.IUserService;
import com.bs.util.Utils;
import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

	private final IUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public User saveUser(User user, String imageFile) throws IOException {
		Optional.ofNullable(user).orElseThrow(() -> new IllegalArgumentException("User cannot be null"));

		findByUsername(user.getUsername()).ifPresent(u -> {
			throw new IllegalArgumentException("Username already exists");
		});

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

		return userList.stream().map(user -> {
			Map<String, Object> response = new java.util.HashMap<>();
			try {
				String base64Image = Utils.loadImageAsBase64(user.getImage_Path());
				response.put("user", user);
				response.put("imageData", base64Image);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return response;
		}).collect(Collectors.toList());
	}

	@Override
	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Transactional
	@Override
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
			Optional<User> optionalUser = userRepository.findById(id);
			if (optionalUser.isEmpty()) {
				return HttpStatus.NOT_FOUND;
			}
			User user = optionalUser.get();
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
