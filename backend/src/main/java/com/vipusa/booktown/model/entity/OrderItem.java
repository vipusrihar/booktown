package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.BookOrder;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne(optional = false)
    private Book book;

    @ManyToOne(optional = false)
    private BookOrder order;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Float amount;
}
