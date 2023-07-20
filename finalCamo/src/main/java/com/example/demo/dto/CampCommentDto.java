package com.example.demo.dto;

import com.example.demo.entity.CampComment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CampCommentDto {
    private Long id;
    private Long campId;
    private String content;
    private LocalDateTime createdAt;

    public CampCommentDto(CampComment comment) {
        this.id = comment.getId();
        this.campId = comment.getCamp().getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
    }
}
