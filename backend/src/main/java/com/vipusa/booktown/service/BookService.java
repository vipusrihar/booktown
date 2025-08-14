package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    int countBooks();

    boolean deleteBook(Integer bookId);

    Book updateBook(Integer bookId, Book book);

    Book getBookById(Integer bookId);

    List<Book> getAllBooks();

    Book createBook(Book book);
}
