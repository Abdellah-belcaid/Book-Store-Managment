package com.bs.service;

import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bs.dao.IUserService;
import com.bs.model.Role;
import com.bs.model.User;
import com.bs.repository.IUserRepository;

@Service
public class UserService implements IUserService {
	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User saveUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(Role.USER);
		user.setCreateTime(LocalDateTime.now());

		return userRepository.save(user);
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	@Transactional // TransactionalRequired when executing an update/delete query.
	public void makeAdmin(String username) {
		userRepository.updateUserRole(username, Role.ADMIN);
	}
}
