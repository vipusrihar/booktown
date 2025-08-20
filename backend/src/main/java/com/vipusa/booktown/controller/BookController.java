package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.CreateBookRequest;
import com.vipusa.booktown.model.DTO.UpdateBookRequest;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Book>> createBook
            (@Valid @RequestBody CreateBookRequest request) {
        Book createdBook = bookService.createBook(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<Book>builder()
                        .response(createdBook)
                        .isSuccess(true)
                        .message("Book Created Successfully").build());

    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Book>>> findAllBook() {
        log.info("Fetching all books");

            List<Book> books = bookService.findAllBooks();

            ApiResponse<List<Book>> response = ApiResponse.<List<Book>>builder()
                    .response(books)
                    .isSuccess(true)
                    .message("Book Fetched Successfully").build();

            return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Book>> findBookById(@PathVariable Integer bookId) {
        log.info("Fetching book with ID: {}", bookId);

        Book book = bookService.findBookById(bookId); // can throw ResourceNotFoundException

        ApiResponse<Book> response = ApiResponse.<Book>builder()
                .response(book)
                .isSuccess(true)
                .message("Book Fetched Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Book>> editBook
            (@PathVariable Integer bookId, @RequestBody UpdateBookRequest request) {
        log.info("Updating book with ID: {}", bookId);
        Book updatedBook = bookService.updateBook(bookId, request);

        ApiResponse<Book> response = ApiResponse.<Book>builder()
                .response(updatedBook)
                .isSuccess(true)
                .message("Book Updated Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{bookId}")
    public ResponseEntity<ApiResponse<Boolean>> deleteBook(@PathVariable Integer bookId) {
        log.info("Deleting book with ID: {}", bookId);
        boolean isDeleted = bookService.deleteBook(bookId);

        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .message("Book Deleted Successfully")
                .isSuccess(true)
                .response(isDeleted)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> countBooks() {
        log.info("Counting all books");
        int count = bookService.countBooks();

        ApiResponse<Integer> response = ApiResponse.<Integer>builder()
                .response(count)
                .isSuccess(true)
                .message("Counted Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }
}