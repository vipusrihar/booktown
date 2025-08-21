package com.vipusa.booktown.model.DTO;

import com.vipusa.booktown.model.entity.Book;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CreateDiscountRequest {
    @NotNull(message = "Discount percentage is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Percentage must be greater than 0")
    @DecimalMax(value = "100.0", message = "Percentage cannot exceed 100")
    private Float percentage;

    @NotNull(message = "Valid from date is required")
    private LocalDate validFrom;

    @NotNull(message = "Valid to date is required")
    private LocalDate validTo;

    @NotBlank(message = "Discount code is required")
    private String code;

    @NotNull(message = "appliedToAll flag is required")
    private Boolean appliedToAll;

    private List<Book> appliedBooks = new ArrayList<>();

}
