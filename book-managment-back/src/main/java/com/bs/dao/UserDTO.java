package com.bs.dao;

import java.time.LocalDateTime;

import com.bs.model.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
	private Long id;
	private String name;
	private String email;
	private String username;
	private LocalDateTime createTime;
	private String Image_Path;
	private Role role;
	private String token;
}
