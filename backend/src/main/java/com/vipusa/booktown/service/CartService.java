package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import org.springframework.stereotype.Service;

@Service
public interface CartService {
    Cart getCartByUserId(Integer userId);

    Cart updateCartItem(Integer userId, OrderItem orderItem);

    Cart clearCart(Integer userId);
}
