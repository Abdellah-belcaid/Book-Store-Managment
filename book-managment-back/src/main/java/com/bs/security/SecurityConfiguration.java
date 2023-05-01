package com.bs.security;

import com.bs.model.Role;
import com.bs.security.jwt.JwtAuthorizationFilter;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
class SecurityConfiguration {

	private final CustomUserDetailsService userDetailsService;

	@Value("${authentication.internal-api-key}")
	private String internalApiKey;

	// Define the filter chain for security requests
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		// Enable Cross-Origin Resource Sharing (CORS)
		http.cors(withDefaults());
		// Disable Cross-Site Request Forgery (CSRF)
		http.csrf().disable();
		// Set the session creation policy to stateless
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// Define the authentication rules for HTTP requests
		http.authorizeHttpRequests()
				// Allow unauthenticated requests to the authentication endpoint
				.requestMatchers("/api/authentication/**").permitAll()
				// Allow unauthenticated GET requests to the books and authors endpoints
				.requestMatchers(HttpMethod.GET, "/api/books", "/api/authors").permitAll()
				// Allow authenticated requests to the purchase history endpoints for users and
				// admins
				.requestMatchers("/api/purchase-history", "/api/purchase-history/**")
				.hasAnyRole(Role.USER.name(), Role.ADMIN.name()).requestMatchers(HttpMethod.PUT, "/api/users/**").permitAll()
				//.hasAnyRole(Role.USER.name(), Role.ADMIN.name())
				// Allow authenticated requests to the books, authors, and users endpoints for
				// admins only
				.requestMatchers("/api/books/**", "/api/authors/**", "/api/users", "/api/users/**")
				.hasRole(Role.ADMIN.name())
				// Allow authenticated requests to the internal endpoint for system managers
				// only
				.requestMatchers("/api/internal/**").hasRole(Role.SYSTEM_MANAGER.name())
				// Require authentication for all other requests
				.anyRequest().authenticated();

		// Add JWT and internal API authentication filters to the filter chain
		http.addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(internalApiAuthenticationFilter(), JwtAuthorizationFilter.class);

		return http.build();

	}

	// Define the authentication provider to use for user authentication
	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	// Define the authentication manager to use for authentication requests
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	// Define the internal API authentication filter
	@Bean
	InternalApiAuthenticationFilter internalApiAuthenticationFilter() {
		return new InternalApiAuthenticationFilter(internalApiKey);
	}

	// Define the JWT authorization filter
	@Bean
	JwtAuthorizationFilter jwtAuthorizationFilter() {
		return new JwtAuthorizationFilter();
	}

	// Define the password encoder to use for password hashing
	@Bean
	static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
