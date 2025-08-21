package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.CreateDiscountRequest;
import com.vipusa.booktown.model.DTO.UpdateDiscountRequest;
import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import com.vipusa.booktown.model.enums.STATUS;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiscountService{
    Discount createDiscount(CreateDiscountRequest request);

    Discount updateDiscount(Integer discountId, UpdateDiscountRequest request);

    List<Discount> findAllDiscounts();

    Discount findDiscountById(Integer discountId);

    Discount updateDiscountStatus(Integer discountId, DISCOUNT_STATUS status);

    boolean deleteDiscount(Integer discountId);

    List<Discount> getActiveDiscounts();
}
