package com.vipusa.booktown.response;

import com.vipusa.booktown.model.entity.CartItem;
import com.vipusa.booktown.model.entity.Discount;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CartItemResponse {
    private Integer id;
    private Integer quantity;
    private Integer bookId;
    private String title;
    private String author;
    private Double bookPrice;
    private Float discount;

    public CartItemResponse(CartItem cartItem, Discount discount) {
        this.id = cartItem.getId();
        this.quantity = cartItem.getQuantity();
        this.bookId = cartItem.getBook().getId();
        this.title = cartItem.getBook().getTitle();
        this.author = cartItem.getBook().getAuthor();
        this.bookPrice = cartItem.getBook().getPrice();
        this.discount = (float) ((discount != null) ? discount.getPercentage().doubleValue() : 0.0);
    }
}
