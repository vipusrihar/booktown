package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.enums.BookCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "Author name is required")
    @Size(min = 2, max = 100, message = "Author name must be between 2 and 100 characters")
    private String author;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "^[0-9-]{10,17}$",
            message = "ISBN must be between 10 and 17 digits, optionally with hyphens")
    @Column(unique = true)
    private String isbn;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotNull(message = "Category is required")
    @Enumerated(EnumType.STRING)
    private BookCategory category;

    @NotBlank(message = "Image link is required")
    @Pattern(regexp = "^(http|https)://.*$",
            message = "Image link must be a valid URL")
    private String imageLink;

    @NotNull(message = "Stock count is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
}
