package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.*;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import com.vipusa.booktown.repository.BookRepository;
import com.vipusa.booktown.repository.CartRepository;
import com.vipusa.booktown.repository.DiscountRepository;
import com.vipusa.booktown.repository.UserRepository;
import com.vipusa.booktown.response.CartItemResponse;
import com.vipusa.booktown.response.CartResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private final DiscountRepository discountRepository;

    @Override
    public Cart updateCartItem(Integer userId, OrderItemDTO itemDTO) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User Not Found With This ID"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Cart Not Found"));

        Book book = bookRepository.findById(itemDTO.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));

        // Check if the item already exists in the cart
        CartItem existingItem = cart.getItems().stream()
                .filter(i -> i.getBook().getId().equals(book.getId()))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            // update existing item
            existingItem.setQuantity(existingItem.getQuantity() + itemDTO.getQuantity());
        } else {
            // create new item
            CartItem cartItem = new CartItem();
            cartItem.setBook(book);
            cartItem.setQuantity(itemDTO.getQuantity());
            cartItem.setPrice(book.getPrice());
            cartItem.setCart(cart);

            cart.getItems().add(cartItem);
        }

        return cartRepository.save(cart);
    }

    @Override
    public Cart clearCart(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User Not Found With This ID"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(()-> new ResourceNotFoundException("Cart Not Found"));

        cart.getItems().clear();

        return cartRepository.save(cart);
    }

    public CartResponse findCartByUserId(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User Not Found With This ID"));


        // If no cart exists for this user, create a new one
        Cart cart =  cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        List<CartItemResponse> itemResponses = new ArrayList<>();
        for (CartItem item : cart.getItems()) {
            Optional<Discount> discounts = discountRepository.findActiveDiscountByBookId(
                    item.getBook().getId(),
                    DISCOUNT_STATUS.DISCOUNT_ACTIVE,
                    LocalDate.now()
            );

            Discount bestDiscount = discounts.stream()
                    .max(Comparator.comparing(Discount::getPercentage))
                    .orElse(null);

            CartItemResponse itemResponse = new CartItemResponse(item, bestDiscount);
            itemResponses.add(itemResponse);
        }




        return new  CartResponse(cart.getId(), itemResponses);
    }


}
