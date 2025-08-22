package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.CreateReviewRequest;
import com.vipusa.booktown.model.entity.Review;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReviewService {
    Review createReview(CreateReviewRequest request);

    List<Review> findAllReviews();

    Review findReviewById(Integer reviewId);

    List<Review> findReviewsByUserId(Integer userId);

    Boolean deleteReview(Integer reviewId);

    List<Review> findReviewsByBookId(Integer bookId);
}
