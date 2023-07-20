package com.example.demo.dto;

import com.example.demo.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CommentDto {
    private Long id;
    private int postType;
    private Long reviewId;
    private Long memberId;
    private String content;
    private LocalDateTime createdAt;

    public CommentDto(Comment comment) {
        this.id = comment.getId();
        this.postType = comment.getPostType();
        this.reviewId = comment.getReview().getId();
        this.memberId = comment.getMember().getId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
    }
}
