package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.entity.BookOrder;
import com.vipusa.booktown.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<BookOrder> createOrder(@RequestBody BookOrder order) {
        log.info("Creating new order for user: {}", order.getUser());
        try {
            BookOrder createdOrder = orderService.createOrder(order);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            log.error("Error creating order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookOrder>> getAllOrders() {
        log.info("Fetching all orders");
        try {
            List<BookOrder> orders = orderService.getAllOrders();
            return ResponseEntity.status(HttpStatus.OK).body(orders);
        } catch (Exception e) {
            log.error("Error fetching all orders: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<BookOrder> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam String status) {
        log.info("Updating status for order ID: {} to {}", orderId, status);
        try {
            BookOrder updatedOrder = orderService.updateOrderStatus(orderId, status);
            if (updatedOrder != null) {
                return ResponseEntity.status(HttpStatus.OK).body(updatedOrder);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error updating order status: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<BookOrder> getOrderByOrderId(@PathVariable Integer orderId) {
        log.info("Fetching order with ID: {}", orderId);
        try {
            BookOrder order = orderService.getOrderById(orderId);
            if (order != null) {
                return ResponseEntity.status(HttpStatus.OK).body(order);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error fetching order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookOrder>> getAllOrdersByUserId(@PathVariable Integer userId) {
        log.info("Fetching all orders for user ID: {}", userId);
        try {
            List<BookOrder> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body(orders);
        } catch (Exception e) {
            log.error("Error fetching orders for user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Boolean> deleteOrderById(@PathVariable Integer orderId) {
        log.info("Deleting order with ID: {}", orderId);
        try {
            Boolean isDeleted = orderService.deleteOrder(orderId);
            if (isDeleted) {
                return ResponseEntity.status(HttpStatus.OK).body(true);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (Exception e) {
            log.error("Error deleting order: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> countOrders() {
        log.info("Counting all orders");
        try {
            int count = orderService.countOrders();
            return ResponseEntity.status(HttpStatus.OK).body(count);
        } catch (Exception e) {
            log.error("Error counting orders: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
