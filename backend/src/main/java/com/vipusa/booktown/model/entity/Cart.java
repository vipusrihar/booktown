package com.vipusa.booktown.model.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "Cart must belong to a user")
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    private Double totalPrice = 0.0;

    private LocalDateTime createdAt = LocalDateTime.now();

     //Adds an item to the cart and updates total price
    public void addItem(CartItem item) {
        item.setCart(this);
        this.items.add(item);
        recalculateTotal();
    }

    //Removes an item from the cart and updates total price
    public void removeItem(CartItem item) {
        this.items.remove(item);
        recalculateTotal();
    }

     //Recalculates the total price based on all cart item
    public void recalculateTotal() {
        this.totalPrice = this.items.stream()
                .mapToDouble(i -> i.getQuantity() * i.getPrice())
                .sum();
    }
}
