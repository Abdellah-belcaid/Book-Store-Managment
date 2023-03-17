package com.bs.dao;

import java.util.Optional;

import com.bs.model.User;

public interface IUserService {

	User saveUser(User user);

	Optional<User> findByUsername(String username);

	void makeAdmin(String username);

}
