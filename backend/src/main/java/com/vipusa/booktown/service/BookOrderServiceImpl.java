package com.vipusa.booktown.service;

import com.vipusa.booktown.exception.ResourceNotFoundException;
import com.vipusa.booktown.model.DTO.CreateOrderRequest;
import com.vipusa.booktown.model.DTO.OrderItemDTO;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.BookOrder;
import com.vipusa.booktown.model.entity.OrderItem;
import com.vipusa.booktown.model.entity.User;
import com.vipusa.booktown.model.enums.LOCATION;
import com.vipusa.booktown.model.enums.STATUS;
import com.vipusa.booktown.repository.BookOrderRepository;
import com.vipusa.booktown.repository.BookRepository;
import com.vipusa.booktown.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BookOrderServiceImpl implements BookOrderService {

    private final BookOrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public int countOrders() {
        return (int) orderRepository.count();
    }

    @Override
    @Transactional
    public BookOrder createOrder(CreateOrderRequest request) {
        BookOrder bookOrder = new BookOrder();

        // Get Logged In User
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUser = authentication.getName();
        User user = userRepository.findByUserName(loggedInUser)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
        bookOrder.setUser(user);

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemDTO item : request.getOrderItems()) {
            Integer id = item.getBookId();
            Book book = bookRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Book Not Found With ID " + id));

            if (book.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for book: " + book.getTitle());
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(bookOrder);
            orderItem.setBookName(book.getTitle());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setAmount(book.getPrice() * item.getQuantity());

            // Reduce Stock
            book.setStock(book.getStock() - item.getQuantity());
            bookRepository.save(book);

            totalAmount += orderItem.getAmount();
            orderItems.add(orderItem);
        }

        bookOrder.setOrderItems(orderItems);
        bookOrder.setTotalAmount(totalAmount);

        bookOrder.setOrderDate(LocalDateTime.now());
        bookOrder.setPreferredDate(request.getPreferredDate());
        bookOrder.setPreferredTime(request.getPreferredTime());
        bookOrder.setPreferredLocation(changeToLocation(request.getPreferredLocation().toUpperCase()));
        bookOrder.setMessage(request.getMessage());
        bookOrder.setStatus(STATUS.STATUS_ORDERED);

        return orderRepository.save(bookOrder);
    }

    private LOCATION changeToLocation(String location){
        return LOCATION.valueOf(location);
    }

    @Override
    public List<BookOrder> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    @Transactional
    public BookOrder updateOrderStatus(Integer orderId, String status) {
        BookOrder order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID " + orderId));

        order.setStatus(findStatus(status));
        return orderRepository.save(order);
    }

    private STATUS findStatus(String s){
        return STATUS.valueOf(s);
    }


    @Override
    public BookOrder findOrderById(Integer orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID " + orderId));
    }


    @Override
    public List<BookOrder> findOrdersByUserId(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Found with ID " + userId));
        return orderRepository.findByUser(user);
    }

    @Override
    @Transactional
    public BookOrder cancelOrder(Integer orderId) {
        BookOrder order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order Not Found with ID " + orderId));

        if (order.getStatus() == STATUS.STATUS_ACCEPTED) {
            throw new IllegalStateException("Accepted Orders Cannot Be Cancelled");
        }

        order.setStatus(STATUS.STATUS_CANCELLED);
        return orderRepository.save(order);
    }

}

