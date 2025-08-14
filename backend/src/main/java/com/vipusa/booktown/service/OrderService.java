package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.BookOrder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    int countOrders();

    BookOrder createOrder(BookOrder order);

    List<BookOrder> getAllOrders();

    BookOrder updateOrderStatus(Integer orderId, String status);

    BookOrder getOrderById(Integer orderId);

    List<BookOrder> getOrdersByUserId(Integer userId);

    Boolean deleteOrder(Integer orderId);
}
