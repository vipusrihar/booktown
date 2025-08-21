package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Integer> {

    List<Discount> findByIsActive(DISCOUNT_STATUS discountStatus);
}
