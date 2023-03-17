package com.bs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bs.Exception.BookNotFoundException;
import com.bs.dao.IBookService;
import com.bs.model.Book;
import com.bs.repository.BookRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BookService implements IBookService{

	@Autowired
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
	public Book updateBook(Book Book) {
		return bookRepository.save(Book);
	}
	@Override
	public void deleteBook(long id) {
		bookRepository.deleteById(id);
	}
	@Override
	public Book findBookById(long id) {
		return bookRepository.findById(id)
				.orElseThrow(() -> new BookNotFoundException("Book by id " + id + " was not found"));
	}

}
