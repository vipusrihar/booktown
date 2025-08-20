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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String author;

    @Column(unique = true)
    private String isbn;

    private String description;

    @Enumerated(EnumType.STRING)
    private BookCategory category;

    private String imageLink;

    private Integer stock;
}
