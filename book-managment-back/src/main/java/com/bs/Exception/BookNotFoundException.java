package com.bs.Exception;

public class BookNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public BookNotFoundException(String text) {
		super(text);
	}
}
