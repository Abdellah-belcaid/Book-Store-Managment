package com.bs.service;

import java.util.List;

import com.bs.model.Author;

public interface IAuthorService {

	Author addAuthor(Author Author);

	List<Author> findallAuthors();

	Author updateAuthor(Author Author);

	void deleteAuthor(long id);

	Author findAuthorById(long id);

}
