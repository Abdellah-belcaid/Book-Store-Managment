package com.bs.security;

/*
 * this class is using WebSecurityConfigurerAdapter which is deprecated but
 * still works , see the new configuration in the SecurityConfiguration class
 */

//package com.bs.security;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.BeanIds;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import com.bs.model.Role;
//import com.bs.security.jwt.JwtAuthorizationFilter;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//
//	@Autowired
//	private CustomUserDetailsService userDetailsService;
//
//	@Value("${authentication.internal-api-key}")
//	private String internalApiKey;
//
//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//	}
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//
//		http.cors();
//		http.csrf().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//
//		http.authorizeRequests().antMatchers("/api/authentication/**").permitAll()
//				.antMatchers(HttpMethod.GET, "/api/books","/api/authors").permitAll()												    				
//				.antMatchers("/api/purchase-history","/api/purchase-history/**").hasAnyRole(Role.USER.name(),Role.ADMIN.name())
//				.antMatchers("/api/books/**","/api/authors/**").hasRole(Role.ADMIN.name())
//				.antMatchers("/api/internal/**").hasRole(Role.SYSTEM_MANAGER.name())
//				.anyRequest().authenticated();
//
//		// jwt filter
//		// internal > jwt > authentication
//		http.addFilterBefore(jwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
//				.addFilterBefore(internalApiAuthenticationFilter(), JwtAuthorizationFilter.class);
//
//	}
//
//	@Override
//	@Bean(BeanIds.AUTHENTICATION_MANAGER)
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//
//		return super.authenticationManagerBean();
//	}
//
//	@Bean
//	public InternalApiAuthenticationFilter internalApiAuthenticationFilter() {
//		return new InternalApiAuthenticationFilter(internalApiKey);
//	}
//
//	@Bean
//	public JwtAuthorizationFilter jwtAuthorizationFilter() {
//		return new JwtAuthorizationFilter();
//	}
//
//	@Bean
//	public static PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//}
