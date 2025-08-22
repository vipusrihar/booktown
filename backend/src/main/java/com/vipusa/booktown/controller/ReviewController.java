package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.CreateReviewRequest;
import com.vipusa.booktown.model.entity.Review;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<Review>> createReview(@RequestBody CreateReviewRequest request) {

        Review createdReview = reviewService.createReview(request);

        ApiResponse<Review> apiResponse = ApiResponse.<Review>builder()
                .response(createdReview)
                .message("Review Created Successfully")
                .isSuccess(true).build();

        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);

    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Review>>> findAllReviews() {
        List<Review> reviews = reviewService.findAllReviews();

        ApiResponse<List<Review>> apiResponse = ApiResponse.<List<Review>>builder()
                .response(reviews)
                .message("Reviews Fetched Successfully")
                .isSuccess(true).build();

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);

    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Review>> getReviewById(@PathVariable Integer reviewId) {
        Review review = reviewService.findReviewById(reviewId);
        ApiResponse<Review> apiResponse = ApiResponse.<Review>builder()
                .response(review)
                .message("Review Fetched Successfully")
                .isSuccess(true).build();

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);


    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Review>>> findReviewsByUserId(@PathVariable Integer userId) {

        List<Review> reviews = reviewService.findReviewsByUserId(userId);
        ApiResponse<List<Review>> apiResponse = ApiResponse.<List<Review>>builder()
                .response(reviews)
                .message("Reviews Fetched Successfully")
                .isSuccess(true).build();

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);


    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<ApiResponse<List<Review>>> getReviewsByBookId(@PathVariable Integer bookId) {

        List<Review> reviews = reviewService.findReviewsByBookId(bookId);
        ApiResponse<List<Review>> apiResponse = ApiResponse.<List<Review>>builder()
                .response(reviews)
                .message("Reviews Fetched Successfully")
                .isSuccess(true).build();

        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);

    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Boolean>> deleteReview(@PathVariable Integer reviewId) {

        Boolean isDeleted = reviewService.deleteReview(reviewId);

        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .response(isDeleted)
                .isSuccess(true)
                .message("Review Deleted Successfully")
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
