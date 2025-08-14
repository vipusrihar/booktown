package com.vipusa.booktown.service;

import com.vipusa.booktown.model.entity.BookOrder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderServiceImpl implements OrderService{
    @Override
    public int countOrders() {
        return 0;
    }

    @Override
    public BookOrder createOrder(BookOrder order) {
        return null;
    }

    @Override
    public List<BookOrder> getAllOrders() {
        return null;
    }

    @Override
    public BookOrder updateOrderStatus(Integer orderId, String status) {
        return null;
    }

    @Override
    public BookOrder getOrderById(Integer orderId) {
        return null;
    }

    @Override
    public List<BookOrder> getOrdersByUserId(Integer userId) {
        return null;
    }

    @Override
    public Boolean deleteOrder(Integer orderId) {
        return false;
    }
}
