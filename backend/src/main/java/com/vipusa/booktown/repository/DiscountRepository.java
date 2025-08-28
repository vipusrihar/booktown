package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.Discount;
import com.vipusa.booktown.model.enums.DISCOUNT_STATUS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Integer> {

    List<Discount> findByStatus(DISCOUNT_STATUS discountStatus);

    long countByStatus(DISCOUNT_STATUS discountStatus);

    @Query("SELECT d FROM Discount d " +
            "JOIN d.appliedBooks b " +
            "WHERE b.id = :bookId " +
            "AND d.status = :status " +
            "AND d.isActive = true " +
            "AND :today BETWEEN d.validFrom AND d.validTo")
    Optional<Discount> findActiveDiscountByBookId(@Param("bookId") Integer bookId,
                                                  @Param("status") DISCOUNT_STATUS status,
                                                  @Param("today") LocalDate today);

}
