package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

    @Column(nullable = false)
    private Float percentage;

    @Column(nullable = false)
    private LocalDate validFrom;

    @Column(nullable = false)
    private LocalDate validTo;

    @Column(unique = true, length = 50)
    private String code;


    @ManyToMany
    @JoinTable(name = "discount_book",
            joinColumns = @JoinColumn(name = "discount_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id"))
    private List<Book> appliedBooks = new ArrayList<>();

    @NotNull
    private Boolean isActive;

    private DISCOUNT_STATUS status = DISCOUNT_STATUS.DISCOUNT_DEACTIVATE;

}
