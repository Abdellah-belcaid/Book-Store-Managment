package com.bs.service;

import java.util.List;

import com.bs.model.Book;

public interface IBookService {

	Book findBookById(long id);

	Book updateBook(Book Book);

	void deleteBook(long id);

	List<Book> findallBooks();

	Book addBook(Book Book);

}
