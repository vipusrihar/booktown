package com.vipusa.booktown.service;

import com.vipusa.booktown.model.DTO.CreateOrderRequest;
import com.vipusa.booktown.model.entity.BookOrder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookOrderService {
    int countOrders();

    BookOrder createOrder(CreateOrderRequest request);

    List<BookOrder> findAllOrders();

    BookOrder updateOrderStatus(Integer orderId, String status);

    BookOrder findOrderById(Integer orderId);

    List<BookOrder> findOrdersByUserId(Integer userId);

    BookOrder cancelOrder(Integer orderId);
}
