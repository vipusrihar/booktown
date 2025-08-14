package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Review;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ReviewServiceImpl implements ReviewService{
    @Override
    public Review createReview(Review review) {
        return null;
    }

    @Override
    public List<Review> getAllReviews() {
        return null;
    }

    @Override
    public Optional<Object> getReviewById(Integer reviewId) {
        return Optional.empty();
    }

    @Override
    public List<Review> getReviewsByUserId(Integer userId) {
        return null;
    }

    @Override
    public Boolean deleteReview(Integer reviewId) {
        return false;
    }

    @Override
    public List<Review> getReviewsByBookId(Integer bookId) {
        return null;
    }
}
