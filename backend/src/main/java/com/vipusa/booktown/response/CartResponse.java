package com.vipusa.booktown.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CartResponse {
    private Integer cartId;

    private List<CartItemResponse> cartItemResponses = new ArrayList<>();

}
