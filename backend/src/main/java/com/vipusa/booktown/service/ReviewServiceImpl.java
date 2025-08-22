package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.CreateReviewRequest;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.Review;
import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.repository.BookRepository;
import com.vipusa.booktown.repository.ReviewRepository;
import com.vipusa.booktown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    @Override
    public Review createReview(CreateReviewRequest request) {
        String loggedInUser = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        User user = userRepository.findByUserName(loggedInUser)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));

        if (reviewRepository.existsByUserAndBook(user, book)) {
            throw new IllegalStateException("You have already reviewed this book");
        }

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setReviewedAt(LocalDateTime.now());
        review.setStars(request.getStars());
        review.setReview(request.getReview());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review findReviewById(Integer reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review Not Found"));
    }

    @Override
    public List<Review> findReviewsByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        checkIfUserOwnAccount(user);
        return reviewRepository.findAllByUser(user);
    }

    @Override
    public Boolean deleteReview(Integer reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review Not Found"));
        checkIfUserOwnAccount(review.getUser());
        reviewRepository.delete(review);
        return true;
    }

    @Override
    public List<Review> findReviewsByBookId(Integer bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Book Not Found"));
        return reviewRepository.findAllByBook(book);
    }

    private void checkIfUserOwnAccount(User user){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUser = authentication.getName();

        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER"))) {
            if (!user.getUserName().equals(loggedInUser)) {
                throw new AccessDeniedException("Users Can Only Handle Their Own Account.");
            }
        }
    }
}
