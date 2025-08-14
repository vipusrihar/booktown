package com.vipusa.booktown.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @ManyToOne(optional = false)
    private User user;

    private LocalDateTime orderDate;

    private Float totalAmount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;


    // Adds an item to the cart and updates total price
    public void addItem(OrderItem item) {
        item.setOrder(this);
        this.orderItems.add(item);
        recalculateTotal();
    }

    //Removes an item from the order and updates total price
    public void removeItem(OrderItem item) {
        this.orderItems.remove(item);
        recalculateTotal();
    }

    // Recalculates the total price based on all order item
    public void recalculateTotal() {
        this.totalAmount = (float)this.orderItems.stream()
                .mapToDouble
                        (i -> i.getQuantity() * i.getAmount())
                .sum();
    }
}

