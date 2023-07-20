package com.example.demo.repository;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // 특정 게시물의 모든 댓글 조회
    List<Comment> findByReview(Review review);
    List<Comment> findByMember(Member member);

}
