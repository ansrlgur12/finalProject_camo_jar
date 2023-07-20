package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OneLineReviewRepository extends JpaRepository<OneLineReview, Long> {
    List<OneLineReview> findByProduct(Product product);
    List<OneLineReview> findByMember(Member member);
    List<OneLineReview> findByCamp(Camp camp);

}