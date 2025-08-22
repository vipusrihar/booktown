package com.vipusa.booktown.model.DTO;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBookRequest {

    @NotBlank(message = "Title name is required")
    @Size(min = 2, max = 100, message = "Title must be between 2 and 100 characters")
    private String title;

    @NotBlank(message = "Author name is required")
    @Size(min = 2, max = 100, message = "Author name must be between 2 and 100 characters")
    private String author;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "^[0-9-]{10,17}$",
            message = "ISBN must be between 10 and 17 digits, optionally with hyphens")
    private String isbn;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotNull(message = "Category is required")
    private String category;

    @NotBlank(message = "Image link is required")
    @Pattern(regexp = "^(http|https)://.*$",
            message = "Image link must be a valid URL")
    private String imageLink;

    @NotNull(message = "Stock count is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price Cannot Be Negative")
    private Double price;

}
