package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.BookAlreadyExistsException;
import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.CreateBookRequest;
import com.vipusa.booktown.model.DTO.UpdateBookRequest;
import com.vipusa.booktown.model.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {
    int countBooks();

    boolean deleteBook(Integer bookId);

    Book updateBook(Integer bookId, UpdateBookRequest request);

    Book findBookById(Integer bookId);

    List<Book> findAllBooks();

    Book createBook(CreateBookRequest request);
}
