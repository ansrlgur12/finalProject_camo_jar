package com.example.demo.entity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * 리뷰
 */
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "review")
    private List<Comment> comment;

    @OneToMany(mappedBy = "review", cascade = CascadeType.REMOVE)
    private List<Likes> likes;

    @Column(nullable = false) //게시글 제목
    private String title;

    @Column(nullable = false) //게시글 내용
    private String content;

    @Column(nullable = false) //작성일자
    private LocalDate date;

    @Column(nullable = false) //글타입
    private int postType;

    @Column(nullable = false)
    private Long viewCount; // 조회수

    @Column(nullable = false)
    private String img; // 이미지
}