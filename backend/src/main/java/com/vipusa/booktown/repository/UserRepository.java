package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Boolean existsByUserName(String username);
    Boolean existsByEmail(String email);

    Optional<User> findByUserName(String userName);
}
