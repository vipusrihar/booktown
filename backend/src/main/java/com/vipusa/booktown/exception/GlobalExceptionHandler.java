package com.vipusa.booktown.exception;

import com.vipusa.booktown.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> MethodArgumentValidExceptionHandler
            (MethodArgumentNotValidException exception ){

        List<String> errorMessage = new ArrayList<>();

        exception.getBindingResult().getFieldErrors().forEach(error -> {
            errorMessage.add(error.getDefaultMessage());
        });

        return ResponseEntity.badRequest().body( ApiResponse.builder()
                        .isSuccess(false)
                        .message("Registration failed: Please Provide Valid data")
                        .response(errorMessage)
                        .build());
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<?>> UserAlreadyExceptionHandler(UserAlreadyExistsException exception){
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResponse.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(value = RoleNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> RoleNotFoundExceptionHandler(RoleNotFoundException exception){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(value = BookAlreadyExistsException.class)
    public ResponseEntity<ApiResponse<?>> BookAlreadyExceptionHandler(BookAlreadyExistsException exception){
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiResponse.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build());
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<ApiResponse<?>> handleDatabaseError(DatabaseException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.builder()
                        .response(null)
                        .isSuccess(false)
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(InvalidCategoryException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidCategory(InvalidCategoryException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .response(null)
                        .isSuccess(false)
                        .message(ex.getMessage())
                        .build());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.builder()
                        .response(null)
                        .isSuccess(false)
                        .message(ex.getMessage())
                        .build());
    }

}
