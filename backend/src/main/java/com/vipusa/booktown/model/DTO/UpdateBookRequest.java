package com.vipusa.booktown.model.DTO;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBookRequest {

    private String title;

    private String author;

    @Pattern(regexp = "^[0-9-]{10,17}$",
            message = "ISBN must be between 10 and 17 digits, optionally with hyphens")
    private String isbn;

    private String description;

    private String category;

    @Pattern(regexp = "^(http|https)://.*$",
            message = "Image link must be a valid URL")
    private String imageLink;

    private Integer stock;

    private Double price;

}

