package com.bs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bs.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {

}
