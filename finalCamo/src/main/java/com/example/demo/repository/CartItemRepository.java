package com.example.demo.repository;

import com.example.demo.dto.CartDto;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartIdAndProductId(Long cartId, Long productId);
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

    @Query(value = "select new com.example.demo.dto.CartDto(ci.id,p.id, p.productName, p.price, ci.quantity, p.imageUrl) " +
            "from CartItem ci " +
            "join ci.product p " +
            "where ci.cart.id = :cartId")
    List<CartDto> findCartDtoList(@Param("cartId") Long cartId);


}

