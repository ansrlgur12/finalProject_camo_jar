package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderDto {

    private Long productId;
    private int quantity;
    private String email;
    private Long orderId;

}
