package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.Review;
import com.vipusa.booktown.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        log.info("Creating new review for book ID: {}", review.getBook());
        try {
            Review createdReview = reviewService.createReview(review);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
        } catch (IllegalArgumentException e) {
            log.error("Invalid review data: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            log.error("Error creating review: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Review>> getAllReviews() {
        log.info("Fetching all reviews");
        try {
            List<Review> reviews = reviewService.getAllReviews();
            return ResponseEntity.status(HttpStatus.OK).body(reviews);
        } catch (Exception e) {
            log.error("Error fetching reviews: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Object> getReviewById(@PathVariable Integer reviewId) {
        log.info("Fetching review with ID: {}", reviewId);
        try {
            return reviewService.getReviewById(reviewId)
                    .map(review -> ResponseEntity.status(HttpStatus.OK).body(review))
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            log.error("Error fetching review with ID {}: {}", reviewId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUserId(@PathVariable Integer userId) {
        log.info("Fetching reviews for user ID: {}", userId);
        try {
            List<Review> reviews = reviewService.getReviewsByUserId(userId);
            if (reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(reviews);
        } catch (Exception e) {
            log.error("Error fetching reviews for user ID {}: {}", userId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBookId(@PathVariable Integer bookId) {
        log.info("Fetching reviews for book ID: {}", bookId);
        try {
            List<Review> reviews = reviewService.getReviewsByBookId(bookId);
            if (reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(reviews);
        } catch (Exception e) {
            log.error("Error fetching reviews for book ID {}: {}", bookId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Boolean> deleteReview(@PathVariable Integer reviewId) {
        log.info("Deleting review with ID: {}", reviewId);
        try {
            Boolean isDeleted = reviewService.deleteReview(reviewId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body(true);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (Exception e) {
            log.error("Error deleting review with ID {}: {}", reviewId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

}
