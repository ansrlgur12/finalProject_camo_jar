package com.example.demo.repository;

import com.example.demo.entity.Camp;
import com.example.demo.entity.CampComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampCommentRepository extends JpaRepository<CampComment, Long> {
    List<CampComment> findByCamp(Camp camp);
    int countByCamp(Camp camp);
}
