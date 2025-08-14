package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import com.vipusa.booktown.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Integer userId) {
        log.info("Fetching cart for user ID: {}", userId);
        Cart cart = cartService.getCartByUserId(userId);
        if (cart != null) {
            return ResponseEntity.status(HttpStatus.OK).body(cart);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Cart> addOrRemoveItemByUserId(
            @PathVariable Integer userId,
            @RequestBody OrderItem orderItem) {
        log.info("Updating cart for user ID: {} with item: {}", userId, orderItem);
        try {
            Cart updatedCart = cartService.updateCartItem(userId, orderItem);
            return ResponseEntity.status(HttpStatus.OK).body(updatedCart);
        } catch (RuntimeException e) {
            log.error("Error updating cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{userId}/clear")
    public ResponseEntity<Cart> clearAllProducts(@PathVariable Integer userId) {
        log.info("Clearing cart for user ID: {}", userId);
        try {
            Cart clearedCart = cartService.clearCart(userId);
            return ResponseEntity.status(HttpStatus.OK).body(clearedCart);
        } catch (RuntimeException e) {
            log.error("Error clearing cart for user {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
