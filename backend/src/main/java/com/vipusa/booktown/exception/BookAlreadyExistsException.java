package com.vipusa.booktown.exception;

public class BookAlreadyExistsException extends RuntimeException{

    public BookAlreadyExistsException(String message){
        super(message);
    }
}
