package com.vipusa.booktown.model.entity;

import com.vipusa.booktown.model.enums.LOCATION;
import com.vipusa.booktown.model.enums.STATUS;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(optional = false)
    private User user;

    private LocalDateTime orderDate;

    private LocalDate preferredDate;

    private String preferredTime;

    private LOCATION preferredLocation;

    private String message;

    private Double totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;

    private STATUS status = STATUS.STATUS_ORDERED;

}

