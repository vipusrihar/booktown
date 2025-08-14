package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.STATUS;
import com.vipusa.booktown.service.DiscountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/discount")
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping("")
    public ResponseEntity<Discount> createDiscount(@RequestBody Discount discount) {
        log.info("Creating new discount: {}", discount);
        try {
            Discount createdDiscount = discountService.createDiscount(discount);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDiscount);
        } catch (Exception e) {
            log.error("Error creating discount: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{discountId}")
    public ResponseEntity<Discount> editDiscount(
            @PathVariable Integer discountId,
            @RequestBody Discount discount) {
        log.info("Updating discount with ID: {}", discountId);
        try {
            Discount updatedDiscount = discountService.updateDiscount(discountId, discount);
            if (updatedDiscount != null) {
                return ResponseEntity.status(HttpStatus.OK).body(updatedDiscount);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error updating discount with ID {}: {}", discountId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Discount>> getAllDiscounts() {
        log.info("Fetching all discounts");
        try {
            List<Discount> discounts = discountService.getAllDiscounts();
            return ResponseEntity.status(HttpStatus.OK).body(discounts);
        } catch (Exception e) {
            log.error("Error fetching discounts: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{discountId}")
    public ResponseEntity<Discount> getDiscountById(@PathVariable Integer discountId) {
        log.info("Fetching discount with ID: {}", discountId);
        try {
            Discount discount = discountService.getDiscountById(discountId);
            if (discount != null) {
                return ResponseEntity.status(HttpStatus.OK).body(discount);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error fetching discount with ID {}: {}", discountId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{discountId}/status")
    public ResponseEntity<Discount> editDiscountStatus(
            @PathVariable Integer discountId,
            @RequestParam STATUS status) {
        log.info("Updating status for discount ID: {} to {}", discountId, status);
        try {
            Discount updatedDiscount = discountService.updateDiscountStatus(discountId, status);
            if (updatedDiscount != null) {
                return ResponseEntity.status(HttpStatus.OK).body(updatedDiscount);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            log.error("Error updating status for discount ID {}: {}", discountId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{discountId}")
    public ResponseEntity<Boolean> deleteDiscount(@PathVariable Integer discountId) {
        log.info("Deleting discount with ID: {}", discountId);
        try {
            boolean isDeleted = discountService.deleteDiscount(discountId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body(true);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
            }
        } catch (Exception e) {
            log.error("Error deleting discount with ID {}: {}", discountId, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Discount>> getActiveDiscounts() {
        log.info("Fetching active discounts");
        try {
            List<Discount> activeDiscounts = discountService.getActiveDiscounts();
            return ResponseEntity.status(HttpStatus.OK).body(activeDiscounts);
        } catch (Exception e) {
            log.error("Error fetching active discounts: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
