package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.Cart;
import com.vipusa.booktown.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Optional<Cart> findByUser(User user);
}
