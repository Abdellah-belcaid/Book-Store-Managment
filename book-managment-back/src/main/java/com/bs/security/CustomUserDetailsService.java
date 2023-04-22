package com.bs.security;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bs.model.User;
import com.bs.service.IUserService;
import com.bs.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final IUserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));

		Set<GrantedAuthority> authorities = Set.of(SecurityUtils.convertToAuthority(user.getRole().name()));

		return UserPrincipal.builder().user(user).id(user.getId()).username(username).password(user.getPassword())
				.email(user.getEmail()).Image_Path(user.getImage_Path()).authorities(authorities).build();
	}
}
