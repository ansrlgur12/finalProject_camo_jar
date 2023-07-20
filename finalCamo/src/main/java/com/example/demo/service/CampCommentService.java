package com.example.demo.service;

import com.example.demo.dto.CampCommentDto;
import com.example.demo.dto.CommentDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional //@Transactional 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소한다.
public class CampCommentService {
    private final CampCommentRepository campCommentRepository;
    private final CampRepository campRepository;

    @Autowired
    public CampCommentService(CampCommentRepository campCommentRepository, CampRepository campRepository) {
        this.campCommentRepository = campCommentRepository;
        this.campRepository = campRepository;
    }

    public CampCommentDto createComment(Long campId, String content) {
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠핑장이 없습니다.")); // 에러처리

        CampComment comment = new CampComment();
        comment.setCamp(camp);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        CampComment savedComment = campCommentRepository.save(comment);

        return CampCommentDto.builder()
                .id(savedComment.getId())
                .campId(savedComment.getCamp().getId())
                .content(savedComment.getContent())
                .createdAt(savedComment.getCreatedAt())
                .build();
    }
    public List<CampCommentDto> getComment(Long campId) {
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠핑장이 없습니다.")); // 에러처리

        List<CampComment> comments = campCommentRepository.findByCamp(camp);
        List<CampCommentDto> commentDtos = new ArrayList<>();

        for (CampComment comment : comments) {
            CampCommentDto commentDto = CampCommentDto.builder()
                    .id(comment.getId())
                    .campId(comment.getCamp().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
            commentDtos.add(commentDto);
        }

        return commentDtos;
    }

    public int getCount(Long campId) {
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("캠핑장이 없습니다.")); // 에러처리
        int commentCount = campCommentRepository.countByCamp(camp);
        return commentCount;
    }
}
