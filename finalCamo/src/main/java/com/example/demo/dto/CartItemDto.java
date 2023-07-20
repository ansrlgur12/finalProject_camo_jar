package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter
@NoArgsConstructor
@ToString
public class CartItemDto {
    private Long cartItemId;
    private Long productId;
    private int quantity;
    private String email;
}
