package com.example.demo.repository;

import com.example.demo.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    Optional<Likes> findByMemberAndReview(Member member, Review review);
    Optional<Likes> findByMemberAndCamp(Member member, Camp camp);
    int countByProduct(Product product);
    void deleteByMemberAndProduct(Member member, Product product);

    int countByCamp(Camp camp);
    void deleteByMemberAndCamp(Member member, Camp camp);
    void deleteByMemberAndReview(Member member, Review review);
    int countByReview(Review review);
    boolean existsByCampAndMember(Camp camp, Member member);
}