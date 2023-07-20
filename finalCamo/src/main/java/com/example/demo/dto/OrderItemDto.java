package com.example.demo.dto;

import com.example.demo.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderItemDto {


    private String productName;

    private int quantity;

    private double orderPrice;

    private String imageUrl;

    public OrderItemDto(OrderItem orderItem, String imageUrl) {
        this.productName = orderItem.getProduct().getProductName();
        this.quantity = orderItem.getQuantity();
        this.orderPrice = orderItem.getOrderPrice();
        this.imageUrl = orderItem.getProduct().getImageUrl();
    }

}
