package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.OrderItem;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Integer userId) {

        Cart cart = cartService.findCartByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(cart);

    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{userId}")
    public ResponseEntity<Cart> addOrRemoveItemByUserId(
            @PathVariable Integer userId,
            @RequestBody OrderItemDTO itemDTO) {

            Cart updatedCart = cartService.updateCartItem(userId, itemDTO);
            return ResponseEntity.status(HttpStatus.OK).body(updatedCart);

    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{userId}/clear")
    public ResponseEntity<ApiResponse<Cart>> clearAllProducts(@PathVariable Integer userId) {
            Cart clearedCart = cartService.clearCart(userId);

            ApiResponse<Cart> response = ApiResponse.<Cart>builder()
                    .isSuccess(true)
                    .message("Cart Cleared Successfully")
                    .response(clearedCart).build();

            return ResponseEntity.status(HttpStatus.OK).body(response);

    }
}
