package com.vipusa.booktown.repository;

import com.vipusa.booktown.model.entity.BookOrder;
import com.vipusa.booktown.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookOrderRepository extends JpaRepository<BookOrder, Integer> {

    List<BookOrder> findByUser(User user);
}
