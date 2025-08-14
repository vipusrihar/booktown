package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.entity.Book;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull(message = "Discount percentage is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Percentage must be greater than 0")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")
    private Float percentage;

    @NotNull(message = "Valid from date is required")
    private LocalDateTime validFrom;

    @NotNull(message = "Valid to date is required")
    private LocalDateTime validTo;

    @NotBlank(message = "Discount code is required")
    @Column(unique = true, length = 50)
    private String code;

    @NotNull(message = "appliedToAll flag is required")
    private Boolean appliedToAll;

    @ManyToMany
    @JoinTable(name = "discount_book",
            joinColumns = @JoinColumn(name = "discount_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<Book> appliedBooks = new ArrayList<>();

    @NotNull
    private Boolean isActive;

    public boolean isValid(LocalDateTime dateTime) {
        return Boolean.TRUE.equals(isActive) &&
                dateTime != null &&
                (dateTime.isEqual(validFrom) || dateTime.isAfter(validFrom)) &&
                (dateTime.isEqual(validTo) || dateTime.isBefore(validTo));
    }

}
