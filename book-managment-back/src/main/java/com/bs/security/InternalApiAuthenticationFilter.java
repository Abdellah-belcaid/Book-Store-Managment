package com.bs.security;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.bs.util.SecurityUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class InternalApiAuthenticationFilter extends OncePerRequestFilter {

	private final String accessKey;

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		// Only filter requests to internal API endpoints
		return !request.getRequestURI().startsWith("/api/internal");
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			String authToken = SecurityUtils.extractAuthTokenFromRequest(request);

			if (authToken == null || !authToken.equals(accessKey)) {
				/*
				 * If the request auth token is null or doesn't match the expected access key,
				 * return an unauthorized response
				 */
				String errorMessage = "Request to internal API endpoint was made without a valid access key. Received key: "
						+ authToken;
				log.warn(errorMessage);
				response.setStatus(HttpStatus.UNAUTHORIZED.value());
				response.getWriter().write(errorMessage);
				return;
			}

			/*
			 * If the request auth token is valid, set the user principal to a super user
			 * and set it in the security context
			 */
			UserPrincipal user = UserPrincipal.createSuperUser();
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null,
					user.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		} catch (Exception e) {
			/*
			 * If an exception is thrown, log an error and return an internal server error
			 * response
			 */
			String errorMessage = "An internal server error occurred while processing the request to the internal API endpoint.";
			log.error(errorMessage, e);
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			response.getWriter().write(errorMessage);
			return;
		}

		/* If everything is successful, let the request continue */
		filterChain.doFilter(request, response);
	}

}
