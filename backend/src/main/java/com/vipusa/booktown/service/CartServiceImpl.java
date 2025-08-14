package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class CartServiceImpl implements CartService {
    @Override
    public Cart getCartByUserId(Integer userId) {
        return null;
    }

    @Override
    public Cart updateCartItem(Integer userId, OrderItem orderItem) {
        return null;
    }

    @Override
    public Cart clearCart(Integer userId) {
        return null;
    }
}
