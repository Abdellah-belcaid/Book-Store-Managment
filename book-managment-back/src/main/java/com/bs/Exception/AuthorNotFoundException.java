package com.bs.Exception;

public class AuthorNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public AuthorNotFoundException(String text) {
		super(text);
	}
}
