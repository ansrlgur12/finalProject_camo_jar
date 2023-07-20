package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class LikesDto {
    private Long count;
    private Long productId;
    private Long memberId;
    private Long campId;
    private Long reviewId;
}
