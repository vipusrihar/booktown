package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.Review;
import com.vipusa.booktown.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByUser(User user);

    List<Review> findAllByBook(Book book);

    boolean existsByUserAndBook(User user, Book book);
}
