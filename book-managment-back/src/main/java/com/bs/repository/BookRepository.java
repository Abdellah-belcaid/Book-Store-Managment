package com.bs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bs.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
