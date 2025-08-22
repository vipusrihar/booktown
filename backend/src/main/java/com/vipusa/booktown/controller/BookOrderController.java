package com.vipusa.booktown.controller;

import com.vipusa.booktown.model.DTO.CreateOrderRequest;
import com.vipusa.booktown.model.entity.Book;
import com.vipusa.booktown.model.entity.BookOrder;
import com.vipusa.booktown.response.ApiResponse;
import com.vipusa.booktown.service.BookOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/order")
public class BookOrderController {

    private final BookOrderService orderService;

    @PostMapping("/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApiResponse<BookOrder>> createOrder(@RequestBody CreateOrderRequest request) {

        BookOrder createdOrder = orderService.createOrder(request);

        ApiResponse<BookOrder> response = ApiResponse.<BookOrder>builder()
                .response(createdOrder)
                .message("Order Created Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<BookOrder>> >findAllOrders() {

        List<BookOrder> orders = orderService.findAllOrders();

        ApiResponse<List<BookOrder>> response = ApiResponse.<List<BookOrder>>builder()
                .isSuccess(true)
                .message("Books Fetched Successfully")
                .response(orders)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasAnyRoles('ADMIN','USER')")
    public ResponseEntity<ApiResponse<BookOrder>> findOrderByOrderId(@PathVariable Integer orderId) {

        BookOrder order = orderService.findOrderById(orderId);

        ApiResponse<BookOrder> response = ApiResponse.<BookOrder>builder()
                .response(order)
                .message("Order Fetched Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRoles('ADMIN','USER')")
    public ResponseEntity<ApiResponse<List<BookOrder>>> findAllOrdersByUserId(@PathVariable Integer userId) {

        List<BookOrder> orders = orderService.findOrdersByUserId(userId);
        ApiResponse<List<BookOrder>> response = ApiResponse.<List<BookOrder>>builder()
                .isSuccess(true)
                .message("Books For User Fetched Successfully")
                .response(orders)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }


    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookOrder> updateOrderStatus(
            @PathVariable Integer orderId,
            @RequestParam String status) {
        log.info("Updating status for order ID: {} to {}", orderId, status);

        BookOrder updatedOrder = orderService.updateOrderStatus(orderId, status);
        if (updatedOrder != null) {
            return ResponseEntity.status(HttpStatus.OK).body(updatedOrder);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }


    @PutMapping("/{orderId}/cancel")
    @PreAuthorize("hasAnyRoles('ADMIN','USER')")
    public ResponseEntity<ApiResponse<BookOrder>> cancelOrderById(@PathVariable Integer orderId) {

        BookOrder order = orderService.cancelOrder(orderId);

        ApiResponse<BookOrder> response = ApiResponse.<BookOrder>builder()
                .response(order)
                .message("Order Cancelled Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> countOrders() {

        Integer count = orderService.countOrders();
        ApiResponse<Integer> response = ApiResponse.<Integer>builder()
                .response(count)
                .message("Count Successfully")
                .isSuccess(true)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
