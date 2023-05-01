package com.bs.service.impl;

import com.bs.dao.UserDTO;
import com.bs.exception.UserNotFoundException;
import com.bs.model.Role;
import com.bs.model.User;
import com.bs.repository.IUserRepository;
import com.bs.service.IUserService;
import com.bs.util.ConvertorUtils;
import com.bs.util.ImageProcessUtils;
import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
			String path = ImageProcessUtils.saveImage(imageFile, user.getUsername());
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
			UserDTO userDTO = ConvertorUtils.convertUserToDto(user);
			try {
				String base64Image = ImageProcessUtils.loadImageAsBase64(user.getImage_Path());
				response.put("user", userDTO);
				response.put("imageData", base64Image);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return response;
		}).collect(Collectors.toList());
	}

	@Override
	public Optional<User> getUserById(Long id) {
		return userRepository.findById(id);
	}

	@Transactional
	@Override
	public Role makeAdmin(String username) throws UserNotFoundException {
		Optional<User> expectedUser = userRepository.findByUsername(username);
		if (expectedUser.isPresent()) {
			Role role = expectedUser.get().getRole().equals(Role.USER) ? Role.ADMIN : Role.USER;
			userRepository.updateUserRole(username, role);
			return role;
		}
		throw new UserNotFoundException("User not found");
	}

	@Override
	public ResponseEntity<?> updateUser(User oldUser, User newUser, String oldPassword, String imageFile) {
		if (!passwordEncoder.matches(oldPassword, oldUser.getPassword())) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect old password");
		}
		try {

			/*
			 * Use Optional.ofNullable to check if the newUser has a non-null password
			 * field. If it does, encode it using the passwordEncoder object. If it doesn't,
			 * use the oldUser's password field.
			 */
			String password = Optional.ofNullable(newUser.getPassword()).filter(p -> !p.equals("undefined")) // Filter
																												// out
																												// "undefined"
																												// strings
					.map(passwordEncoder::encode).orElse(oldUser.getPassword());

			/*
			 * Use Optional.ofNullable to check if the imageFile is null or not. If it's not
			 * null, call the updateImage method to update the image path. If it's null,
			 * don't update the image path.
			 */
			String newImagePath = Optional.ofNullable(imageFile).filter(p -> !p.equals("undefined")) // Filter out
																										// "undefined"
																										// strings
					.map(file -> ImageProcessUtils.updateImage(file, oldUser.getImage_Path(), newUser.getName()))
					.orElse(oldUser.getImage_Path());

			oldUser.setEmail(newUser.getEmail());
			oldUser.setPassword(password);
			oldUser.setImage_Path(newImagePath);
			oldUser.setUsername(newUser.getUsername());
			User savedUser = userRepository.save(oldUser);
			return ResponseEntity.ok(ConvertorUtils.convertUserToDto(savedUser));
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not update user image");
		}
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
				ImageProcessUtils.deleteImage(imagePath);
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
