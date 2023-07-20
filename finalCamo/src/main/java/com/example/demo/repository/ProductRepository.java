package com.example.demo.repository;


import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findById(Long id);

    @Query("SELECT p FROM Product p WHERE p.brand LIKE %:brand% OR p.productName LIKE %:productName%")
    List<Product> searchByBrandAndProductName(@Param("brand") String brand, @Param("productName") String productName);
}

