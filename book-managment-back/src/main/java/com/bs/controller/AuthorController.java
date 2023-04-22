package com.bs.controller;

import java.util.List;

import com.bs.model.Author;
import com.bs.service.IAuthorService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authors")
@AllArgsConstructor
public class AuthorController {

	private final IAuthorService AuthorService;

	@GetMapping
	public ResponseEntity<List<Author>> getAllAuthors() {
		List<Author> Authors = AuthorService.findallAuthors();		
		return new ResponseEntity<>(Authors, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Author> getAuthorById(@PathVariable("id") long id) {
		Author Author = AuthorService.findAuthorById(id);
		return new ResponseEntity<>(Author, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Author> addAuthor(@RequestBody Author author) {
		Author newAuthor = AuthorService.addAuthor(author);
		return new ResponseEntity<>(newAuthor, HttpStatus.CREATED);
	}

	@PutMapping
	public ResponseEntity<Author> updateAuthor(@RequestBody Author author) {
		Author updatedAuthor = AuthorService.updateAuthor(author);
		return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAuthor(@PathVariable("id") Long id) {
		AuthorService.deleteAuthor(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
