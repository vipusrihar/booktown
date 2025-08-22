package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import org.springframework.stereotype.Service;

@Service
public interface CartService {
    Cart findCartByUserId(Integer userId);

    Cart updateCartItem(Integer userId, OrderItemDTO itemDTO);

    Cart clearCart(Integer userId);
}
