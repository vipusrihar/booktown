package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.BookAlreadyExistsException;
import com.vipusa.booktown.exception.DatabaseException;
import com.vipusa.booktown.exception.InvalidCategoryException;
import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.CreateBookRequest;
import com.vipusa.booktown.model.DTO.UpdateBookRequest;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.enums.BookCategory;
import com.vipusa.booktown.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public int countBooks() {
        return (int) bookRepository.count(); // Count All Books
    }

    @Override
    public boolean deleteBook(Integer bookId) {
        Book book = findBookById(bookId); // Throws ResourceNotFoundException If Not Exists
        try {
            bookRepository.delete(book);
            return true;
        } catch (DataAccessException e) {
            throw new DatabaseException("Failed to delete book: " + e.getMessage());
        }
    }

    @Override
    public Book updateBook(Integer bookId, UpdateBookRequest request) {
        Book book = findBookById(bookId);

        // Check ISBN if changed
        if(request.getIsbn() != null && !request.getIsbn().equals(book.getIsbn())){
            checkIfExistsByIsbn(request.getIsbn());
            book.setIsbn(request.getIsbn());
        }

        if(request.getTitle() != null)
            book.setTitle(request.getTitle());
        if(request.getAuthor() != null)
            book.setAuthor(request.getAuthor());
        if(request.getDescription() != null)
            book.setDescription(request.getDescription());
        if(request.getImageLink() != null)
            book.setImageLink(request.getImageLink());
        if(request.getStock() != null)
            book.setStock(request.getStock());
        if(request.getCategory() != null)
            book.setCategory(convertToBookCategory(request.getCategory()));

        try {
            return bookRepository.save(book);
        } catch (DataAccessException e) {
            throw new DatabaseException("Failed to update book: " + e.getMessage());
        }
    }


    @Override
    public Book findBookById(Integer bookId) throws ResourceNotFoundException {
        return bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Book Not Found With ID " + bookId));
    }


    @Override
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book createBook(CreateBookRequest request) {
        //Check If There Are Any Book With This ISBN
        checkIfExistsByIsbn(request.getIsbn());

        Book book = new Book();

        book.setIsbn(request.getIsbn());
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setDescription(request.getDescription());
        book.setImageLink(request.getImageLink());
        book.setStock(request.getStock());

        //Change The To BookCategory Type
        book.setCategory(convertToBookCategory(request.getCategory()));

        Book savedBook;
        try {
            savedBook =  bookRepository.save(book);
        } catch (DataAccessException e) {
            throw new DatabaseException("Failed to save book: " + e.getMessage());
        }

        return savedBook;
    }

    private Book findBookByISBN(String isbn){
        return bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ISBN " + isbn));
    }


    private void checkIfExistsByIsbn(String isbn){
        if(bookRepository.existsByIsbn(isbn)){
            throw new BookAlreadyExistsException("Book With ISBN "+ isbn+ " Already Exists");
        }
    }

    //Change The Type String To BookCategory
    private BookCategory convertToBookCategory(String category){
        try {
            return BookCategory.valueOf(category.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidCategoryException("Invalid book category: " +category);
        }
    }

}
