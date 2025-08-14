package com.vipusa.booktown.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    private Book book;

    @ManyToOne(optional = false)
    private User user;

    @NotNull(message = "Stars rating is required")
    @Min(value = 1, message = "Minimum stars is 1")
    @Max(value = 5, message = "Maximum stars is 5")
    private Integer stars;

    @PastOrPresent(message = "Review date cannot be in the future")
    private LocalDateTime reviewedAt;

    @NotBlank(message = "Review text cannot be empty")
    @Size(max = 1000, message = "Review text cannot exceed 1000 characters")
    private String review;
}
