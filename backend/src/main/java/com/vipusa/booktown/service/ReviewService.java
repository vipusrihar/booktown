package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Review;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ReviewService {
    Review createReview(Review review);

    List<Review> getAllReviews();

    Optional<Object> getReviewById(Integer reviewId);

    List<Review> getReviewsByUserId(Integer userId);

    Boolean deleteReview(Integer reviewId);

    List<Review> getReviewsByBookId(Integer bookId);
}
