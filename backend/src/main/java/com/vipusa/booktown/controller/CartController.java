package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.response.CartResponse;
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
    public ResponseEntity<ApiResponse<CartResponse>> getCartByUserId(@PathVariable Integer userId) {

        CartResponse cartResponse = cartService.findCartByUserId(userId);
        ApiResponse<CartResponse> response = ApiResponse.<CartResponse>builder()
                .response(cartResponse)
                .message("Cart Fetched Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<Cart>> addOrRemoveItemByUserId(
            @PathVariable Integer userId,
            @RequestBody OrderItemDTO itemDTO) {

        Cart updatedCart = cartService.updateCartItem(userId, itemDTO);
        ApiResponse<Cart> response = ApiResponse.<Cart>builder()
                .response(updatedCart)
                .message("Cart Updates Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

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
