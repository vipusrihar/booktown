package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import com.vipusa.booktown.response.CartResponse;
import org.springframework.stereotype.Service;

@Service
public interface CartService {
    CartResponse findCartByUserId(Integer userId);

    Cart updateCartItem(Integer userId, OrderItemDTO itemDTO);

    Cart clearCart(Integer userId);
}
