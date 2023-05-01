package com.bs.util;

import com.bs.dao.UserDTO;
import com.bs.model.User;

public class ConvertorUtils {

	public static UserDTO convertUserToDto(User user) {
		return UserDTO.builder().id(user.getId()).name(user.getName()).email(user.getEmail())
				.username(user.getUsername()).createTime(user.getCreateTime()).Image_Path(user.getImage_Path())
				.role(user.getRole()).token(user.getToken()).build();
	}

}
