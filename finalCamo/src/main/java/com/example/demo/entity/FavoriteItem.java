package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 찜목록 상품
 */
@Entity
@Getter
@Setter
@Table(name="favorite_item")
public class FavoriteItem {

    @Id
    @GeneratedValue
    @Column(name = "favorite_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "favorite_id")
    private Favorite favorite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    public static FavoriteItem createFavoriteItem(Favorite favorite, Product product) {
        FavoriteItem favoriteItem = new FavoriteItem();
        favoriteItem.setFavorite(favorite);
        favoriteItem.setProduct(product);
        return favoriteItem;
    }


}
