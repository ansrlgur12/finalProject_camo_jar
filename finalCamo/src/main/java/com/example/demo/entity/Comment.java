package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 댓글
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //댓글 번호

    private int postType; // 글타입

    @ManyToOne
    @JoinColumn(name = "review")
    private Review review;

    @ManyToOne
    @JoinColumn(name = "member")
    private Member member;

    @Column(nullable = false)
    private String content; //댓글 내용

    @Column(nullable = false)
    private LocalDateTime createdAt; //작성일자
}