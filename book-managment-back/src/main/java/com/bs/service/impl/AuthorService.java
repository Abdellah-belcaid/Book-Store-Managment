package com.bs.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bs.exception.AuthorNotFoundException;
import com.bs.model.Author;
import com.bs.repository.AuthorRepository;
import com.bs.service.IAuthorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthorService implements IAuthorService {

	private final AuthorRepository authorRepository;

	@Override
	public Author addAuthor(Author Author) {
		return authorRepository.save(Author);
	}

	@Override
	public List<Author> findallAuthors() {
		return authorRepository.findAll();
	}

	@Override
	public Author updateAuthor(Author author) {
		Optional<Author> existingAuthor = authorRepository.findById(author.getId());
		if (!existingAuthor.isPresent()) {
			throw new AuthorNotFoundException("Author by id " + author.getId() + " was not found");
		}
		return authorRepository.save(author);
	}

	@Override
	public void deleteAuthor(long id) {
		Optional<Author> existingAuthor = authorRepository.findById(id);
		if (!existingAuthor.isPresent()) {
			throw new AuthorNotFoundException("Author by id " + id + " was not found");
		}
		authorRepository.deleteById(id);
	}

	@Override
	public Author findAuthorById(long id) {
		return authorRepository.findById(id)
				.orElseThrow(() -> new AuthorNotFoundException("Author by id " + id + " was not found"));
	}

}
