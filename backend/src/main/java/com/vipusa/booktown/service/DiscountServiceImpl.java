package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.DatabaseException;
import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.CreateDiscountRequest;
import com.vipusa.booktown.model.DTO.UpdateDiscountRequest;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import com.vipusa.booktown.model.enums.STATUS;
import com.vipusa.booktown.repository.BookRepository;
import com.vipusa.booktown.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService{

    private final DiscountRepository discountRepository;

    private final BookRepository bookRepository;

    @Override
    public Discount createDiscount(CreateDiscountRequest request) {
        validateDates(request.getValidFrom(), request.getValidTo());

        Discount discount = new Discount();
        discount.setCode(request.getCode());
        discount.setPercentage(request.getPercentage());
        discount.setValidFrom(request.getValidFrom());
        discount.setValidTo(request.getValidTo());

        discount.setAppliedBooks(findAppliedBooks(request.getAppliedToAll(), request.getAppliedBooks()));
        discount.setIsActive(isValidNow(request.getValidFrom(), request.getValidTo()));

        if(discount.getIsActive()){
            discount.setStatus(DISCOUNT_STATUS.DISCOUNT_ACTIVE);
        }

        return discountRepository.save(discount);
    }

    @Override
    public Discount updateDiscount(Integer discountId, UpdateDiscountRequest request) {
        Discount discount = findDiscountById(discountId);

        if (request.getCode() != null) discount.setCode(request.getCode());
        if (request.getPercentage() != null) discount.setPercentage(request.getPercentage());

        if (request.getValidFrom() != null || request.getValidTo() != null) {
            LocalDate validFrom = request.getValidFrom() != null ? request.getValidFrom() : discount.getValidFrom();
            LocalDate validTo = request.getValidTo() != null ? request.getValidTo() : discount.getValidTo();
            validateDates(validFrom, validTo);
            discount.setValidFrom(validFrom);
            discount.setValidTo(validTo);
        }

        if (request.getAppliedToAll() != null) {
            discount.setAppliedBooks(findAppliedBooks(request.getAppliedToAll(), request.getAppliedBooks()));
        }

        discount.setIsActive(isValidNow(discount.getValidFrom(), discount.getValidTo()));

        if(discount.getIsActive()){
            discount.setStatus(DISCOUNT_STATUS.DISCOUNT_ACTIVE);
        }

        return discountRepository.save(discount);
    }

    private void validateDates(LocalDate validFrom, LocalDate validTo) {
        LocalDate today = LocalDate.now();

        if (validFrom == null || validTo == null) {
            throw new IllegalArgumentException("Both 'validFrom' and 'validTo' must be provided.");
        }
        if (validFrom.isBefore(today)) {
            throw new IllegalArgumentException("'validFrom' date cannot be in the past.");
        }
        if (validTo.isBefore(today)) {
            throw new IllegalArgumentException("'validTo' date must be in the future.");
        }
        if (validTo.isBefore(validFrom)) {
            throw new IllegalArgumentException("'validTo' cannot be before 'validFrom'.");
        }


    }

    private List<Book> findAppliedBooks(Boolean appliedToAll, List<Book> appliedBooks) {
        if (appliedToAll != null && appliedToAll) {
            return findAllBooks();
        }
        return appliedBooks != null ? appliedBooks : new ArrayList<>();
    }

    public Boolean isValidNow(LocalDate dateFrom, LocalDate dateTo) {
        LocalDate today = LocalDate.now();
        return today.isEqual(dateFrom) || today.isAfter(dateFrom) &&
                today.isEqual(dateTo) || today.isBefore(dateTo);
    }

    private List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Discount findDiscountById(Integer discountId) {
        return discountRepository.findById(discountId).orElseThrow(
                () -> new ResourceNotFoundException("Discount Not Found With ID "+discountId));
    }

    @Override
    public List<Discount> findAllDiscounts() {
        return discountRepository.findAll();
    }

    @Override
    public Discount updateDiscountStatus(Integer discountId, DISCOUNT_STATUS status) {
        Discount discount =findDiscountById(discountId);

        switch (status){
            case DISCOUNT_ACTIVE ->{
                if (isValidNow(discount.getValidFrom(),discount.getValidTo()) &&
                        !discount.getStatus().equals(DISCOUNT_STATUS.DISCOUNT_EXPIRED)){
                    discount.setIsActive(Boolean.TRUE);
                    discount.setStatus(DISCOUNT_STATUS.DISCOUNT_ACTIVE);
                } else {
                    throw new IllegalArgumentException("You Cant Not Activate Not Validated Time Period Discount");
                }
            }
            case DISCOUNT_DEACTIVATE ->{
                discount.setStatus(DISCOUNT_STATUS.DISCOUNT_DEACTIVATE);
                discount.setIsActive(Boolean.FALSE);
            }
        }
         return discountRepository.save(discount);
    }

    @Override
    public boolean deleteDiscount(Integer discountId) {
        Discount discount = findDiscountById(discountId);
        try {
            discountRepository.delete(discount);
            return true;
        } catch (DataAccessException e) {
            throw new DatabaseException("Failed to delete discount: " + e.getMessage());
        }
    }

    @Override
    public List<Discount> getActiveDiscounts() {
        return discountRepository.findByIsActive(DISCOUNT_STATUS.DISCOUNT_ACTIVE);
    }
}
