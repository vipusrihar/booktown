package com.vipusa.booktown.model.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDTO {

    private Integer bookId;

    private Integer quantity;
}