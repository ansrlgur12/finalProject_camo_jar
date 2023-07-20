
package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class OneLineReviewDto {
    private Long id;
    private Long productId;
    private Long memberId;
    private Long campId;
    private String comment;
    private int rating;
}