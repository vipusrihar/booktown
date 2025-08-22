package com.vipusa.booktown.model.DTO;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateReviewRequest {

    @NotNull(message = "BookId Id Required")
    private Integer bookId;

    @Min(value = 1, message = "Minimum stars is 1")
    @Max(value = 5, message = "Maximum stars is 5")
    private Integer stars;

    @Size(min = 0, max = 1000, message = "Review text cannot exceed 1000 characters")
    private String review;
}
