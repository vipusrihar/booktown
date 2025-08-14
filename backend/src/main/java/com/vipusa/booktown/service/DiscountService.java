package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.STATUS;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DiscountService{
    Discount createDiscount(Discount discount);

    Discount updateDiscount(Integer discountId, Discount discount);

    List<Discount> getAllDiscounts();

    Discount getDiscountById(Integer discountId);

    Discount updateDiscountStatus(Integer discountId, STATUS status);

    boolean deleteDiscount(Integer discountId);

    List<Discount> getActiveDiscounts();
}
