package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.STATUS;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DiscountServiceImpl implements DiscountService{
    @Override
    public Discount createDiscount(Discount discount) {
        return null;
    }

    @Override
    public Discount updateDiscount(Integer discountId, Discount discount) {
        return null;
    }

    @Override
    public List<Discount> getAllDiscounts() {
        return null;
    }

    @Override
    public Discount getDiscountById(Integer discountId) {
        return null;
    }

    @Override
    public Discount updateDiscountStatus(Integer discountId, STATUS status) {
        return null;
    }

    @Override
    public boolean deleteDiscount(Integer discountId) {
        return false;
    }

    @Override
    public List<Discount> getActiveDiscounts() {
        return null;
    }
}
