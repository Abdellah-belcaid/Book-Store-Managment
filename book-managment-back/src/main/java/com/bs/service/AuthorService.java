package com.bs.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bs.Exception.AuthorNotFoundException;
import com.bs.dao.IAuthorService;
import com.bs.model.Author;
import com.bs.repository.AuthorRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthorService implements IAuthorService{

	
	private final AuthorRepository AuthorRepository;

	@Override
	public Author addAuthor(Author Author) {
		return AuthorRepository.save(Author);
	}
	@Override
	public List<Author> findallAuthors() {
		return AuthorRepository.findAll();
	}
	@Override
	public Author updateAuthor(Author Author) {
		return AuthorRepository.save(Author);
	}
	@Override
	public void deleteAuthor(long id) {
		AuthorRepository.deleteById(id);
	}
	@Override
	public Author findAuthorById(long id) {
		return AuthorRepository.findById(id)
				.orElseThrow(() -> new AuthorNotFoundException("Author by id " + id + " was not found"));
	}

}
