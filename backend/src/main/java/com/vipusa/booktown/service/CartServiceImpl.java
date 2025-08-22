package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.*;
import com.vipusa.booktown.repository.BookRepository;
import com.vipusa.booktown.repository.CartRepository;
import com.vipusa.booktown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public Cart updateCartItem(Integer userId, OrderItemDTO itemDTO) {
        Cart cart = findCartByUserId(userId);

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

        // update total price
        double total = cart.getItems().stream()
                .mapToDouble(i -> i.getQuantity() * i.getPrice())
                .sum();
        cart.setTotalPrice(total);

        return cartRepository.save(cart);
    }

    @Override
    public Cart clearCart(Integer userId) {
        Cart cart = findCartByUserId(userId);

        cart.getItems().clear();
        cart.setTotalPrice(0.0);

        return cartRepository.save(cart);
    }

    public Cart findCartByUserId(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User Not Found With This ID"));

        // If no cart exists for this user, create a new one
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }
}
