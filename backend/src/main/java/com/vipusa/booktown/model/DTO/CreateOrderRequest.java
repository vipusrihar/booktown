package com.vipusa.booktown.model.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {

    private List<OrderItemDTO> orderItems;

    private LocalDate preferredDate;

    private String preferredTime;

    private String preferredLocation;

    private String message;
}
