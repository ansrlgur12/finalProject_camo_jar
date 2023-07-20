package com.example.demo.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReviewDto {
    private Long id;
    private Long memberId;
    private String title;
    private String content;
    private LocalDate date;
    private int postType;
    private Long viewCount;
    private String img;
}
