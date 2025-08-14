package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Book>> createBook(@Valid @RequestBody Book book) {
        log.info("Creating new book: {}", book);
        try {
            Book createdBook = bookService.createBook(book);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.<Book>builder()
                            .response(createdBook)
                            .isSuccess(true)
                            .message("Book created successfully").build());
        } catch (DataAccessException e) {
            log.error("Database error while creating book: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Book>builder()
                            .response(null)
                            .isSuccess(false)
                            .message("Database error occurred").build());
        } catch (Exception e) {
            log.error("Unexpected error while creating book", e); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.<Book>builder()
                            .response(null)
                            .isSuccess(false)
                            .message("Unexpected error occurred").build());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> findAllBook() {
        log.info("Fetching all books");
        try {
            List<Book> books = bookService.getAllBooks();
            return ResponseEntity.status(HttpStatus.OK).body(books);
        } catch (Exception e) {
            log.error("Error fetching books: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> findBookById(@PathVariable Integer bookId) {
        log.info("Fetching book with ID: {}", bookId);
        try {
            Book book = bookService.getBookById(bookId);
            if (book != null) {
                return ResponseEntity.status(HttpStatus.OK).body(book);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error fetching book with ID {}: {}", bookId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<Book> editBook(@PathVariable Integer bookId, @RequestBody Book book) {
        log.info("Updating book with ID: {}", bookId);
        try {
            Book updatedBook = bookService.updateBook(bookId, book);
            if (updatedBook != null) {
                return ResponseEntity.status(HttpStatus.OK).body(updatedBook);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error updating book with ID {}: {}", bookId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Boolean> deleteBook(@PathVariable Integer bookId) {
        log.info("Deleting book with ID: {}", bookId);
        try {
            boolean isDeleted = bookService.deleteBook(bookId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body(true);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
            }
        } catch (Exception e) {
            log.error("Error deleting book with ID {}: {}", bookId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countBooks() {
        log.info("Counting all books");
        try {
            int count = bookService.countBooks();
            return ResponseEntity.status(HttpStatus.OK).body(count);
        } catch (Exception e) {
            log.error("Error counting books: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}