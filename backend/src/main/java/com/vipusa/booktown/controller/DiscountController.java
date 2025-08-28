package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.CreateDiscountRequest;
import com.vipusa.booktown.model.DTO.UpdateDiscountRequest;
import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.DiscountService;
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
@RequestMapping("/api/v1/discount")
public class DiscountController {

    private final DiscountService discountService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<ApiResponse<Discount>> createDiscount(@RequestBody CreateDiscountRequest request) {
        log.info("Creating new discount: {}", request);

        Discount createdDiscount = discountService.createDiscount(request);

        ApiResponse<Discount> response = ApiResponse.<Discount>builder()
                .message("Discount Created Successfully")
                .isSuccess(true)
                .response(createdDiscount)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{discountId}")
    public ResponseEntity<ApiResponse<Discount>> editDiscount(
            @PathVariable Integer discountId,
            @RequestBody UpdateDiscountRequest request) {
        log.info("Updating discount with ID: {}", discountId);

            Discount updatedDiscount = discountService.updateDiscount(discountId, request);

            ApiResponse<Discount> response = ApiResponse.<Discount>builder()
                    .response(updatedDiscount)
                    .message("Updated Successfully")
                    .isSuccess(true)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Discount>>> getAllDiscounts() {
        log.info("Fetching all discounts");

            List<Discount> discounts = discountService.findAllDiscounts();

            ApiResponse<List<Discount>> response = ApiResponse.<List<Discount>>builder()
                    .isSuccess(true)
                    .response(discounts)
                    .message("All Discounts Fetched")
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/{discountId}")
    public ResponseEntity<ApiResponse<Discount>> getDiscountById(@PathVariable Integer discountId) {
        log.info("Fetching discount with ID: {}", discountId);

        Discount discount = discountService.findDiscountById(discountId);
        ApiResponse<Discount> response = ApiResponse.<Discount>builder()
                .response(discount)
                .message("Discount Fetched Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{discountId}/status")
    public ResponseEntity<ApiResponse<Discount>> editDiscountStatus(
            @PathVariable Integer discountId,
            @RequestParam DISCOUNT_STATUS status) {
        log.info("Updating status for discount ID: {} to {}", discountId, status);

            Discount updatedDiscount = discountService.updateDiscountStatus(discountId, status);
        ApiResponse<Discount> response = ApiResponse.<Discount>builder()
                .response(updatedDiscount)
                .message("Updated Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{discountId}")
    public ResponseEntity<ApiResponse<Boolean>> deleteDiscount(@PathVariable Integer discountId) {
        log.info("Deleting discount with ID: {}", discountId);

            Boolean isDeleted = discountService.deleteDiscount(discountId);
        ApiResponse<Boolean> response = ApiResponse.<Boolean>builder()
                .response(isDeleted)
                .message("Updated Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<Discount>>> getActiveDiscounts() {
        log.info("Fetching active discounts");

        List<Discount> activeDiscounts = discountService.getActiveDiscounts();
        ApiResponse<List<Discount>> response = ApiResponse.<List<Discount>>builder()
                .response(activeDiscounts)
                .message("Updated Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> countActiveDiscounts() {
        log.info("Fetching active discounts");

        Integer count = (int)discountService.countActiveDiscounts();
        ApiResponse<Integer> response = ApiResponse.<Integer>builder()
                .response(count)
                .message("Updated Successfully")
                .isSuccess(true)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }



}
