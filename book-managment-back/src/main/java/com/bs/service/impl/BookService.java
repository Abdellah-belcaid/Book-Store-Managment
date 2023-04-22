package com.bs.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bs.exception.BookNotFoundException;
import com.bs.model.Book;
import com.bs.repository.BookRepository;
import com.bs.service.IBookService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService implements IBookService {

	
	private final BookRepository bookRepository;

	@Override
	public Book addBook(Book Book) {
		return bookRepository.save(Book);
	}

	@Override
	public List<Book> findallBooks() {
		return bookRepository.findAll();
	}

	@Override
	public Book updateBook(Book book) {
		Optional<Book> existingBook = bookRepository.findById(book.getId());
		if (!existingBook.isPresent()) {
			throw new BookNotFoundException("Book by id " + book.getId() + " was not found");
		}
		return bookRepository.save(book);
	}

	@Override
	public void deleteBook(long id) {
		Optional<Book> existingBook = bookRepository.findById(id);
		if (!existingBook.isPresent()) {
			throw new BookNotFoundException("Book by id " + id + " was not found");
		}
		bookRepository.deleteById(id);
	}

	@Override
	public Book findBookById(long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new BookNotFoundException("Book by id " + id + " was not found"));
	}

}
