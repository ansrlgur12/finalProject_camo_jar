package com.example.demo.repository;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.FavoriteDto;
import com.example.demo.entity.FavoriteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteItemRepository extends JpaRepository<FavoriteItem, Long> {

    FavoriteItem findByFavoriteIdAndProductId(Long favoriteId, Long productId);

    @Query(value = "select new com.example.demo.dto.FavoriteDto(fi.id, p.id,p.productName, p.price, p.imageUrl) " +
            "from FavoriteItem fi " +
            "join fi.product p " +
            "where fi.favorite.id = :favoriteId")
    List<FavoriteDto> findFavoriteDtoList(@Param("favoriteId") Long favoriteId);
}
