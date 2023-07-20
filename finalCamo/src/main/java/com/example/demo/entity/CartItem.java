package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
/**
 * 장바구니 상품
 */
@Entity
@Getter
@Setter
@Table(name="cart_item")
public class CartItem {

    @Id
    @GeneratedValue
    @Column(name = "cart_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)          // 하나의 장바구니에는 여러 개의 상품을 담을 수 있으므로 @ManyToOne 어노테이션을 이용하여
    @JoinColumn(name = "cart_id")               // 다대일 관계로 매핑
    private Cart cart;


    @ManyToOne(fetch = FetchType.LAZY)          // 하나의 상품은 여러 장바구니의 장바구니 상품으로 담길 수 있으므로 @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;                        // 장바구니에 담을 상품의 정보를 알아야하므로 상품 엔티티 매핑

    private int quantity;

    public static CartItem createCartItem(Cart cart, Product product, int quantity) {
        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        return cartItem;
    }

    public void addQuantity(int quantity) {
        this.quantity += quantity;
    }

    public void updateQuantity(int quantity) {
        this.quantity = quantity;
    }
}

