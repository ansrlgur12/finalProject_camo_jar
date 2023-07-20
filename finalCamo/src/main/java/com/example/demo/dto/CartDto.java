package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CartDto {
    private Long cartItemId;
    private Long productId;
    private String productName;
    private int quantity;
    private double price;
    private String imageUrl;


    public CartDto(Long cartItemId,Long productId, String productName, double price, int quantity, String imageUrl) {
        this.cartItemId = cartItemId;
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
    }
}
