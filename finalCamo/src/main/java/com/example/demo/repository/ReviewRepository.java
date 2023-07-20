package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMember(Member member);

    List<Review> findByPostType(int postType);

    @Query("SELECT r FROM Review r WHERE r.title LIKE %:keyword% OR r.content LIKE %:keyword%")
    List<Review> search(@Param("keyword") String keyword);

    @Modifying
    @Transactional
    @Query("update Review r set r.viewCount = r.viewCount + 1 where r.id = :id")
    void incrementViewCount(@Param("id") Long id);
}



