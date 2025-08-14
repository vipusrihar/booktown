package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookServiceImpl implements BookService {
    @Override
    public int countBooks() {
        return 0;
    }

    @Override
    public boolean deleteBook(Integer bookId) {
        return false;
    }

    @Override
    public Book updateBook(Integer bookId, Book book) {
        return null;
    }

    @Override
    public Book getBookById(Integer bookId) {
        return null;
    }

    @Override
    public List<Book> getAllBooks() {
        return null;
    }

    @Override
    public Book createBook(Book book) {
        return null;
    }
}
