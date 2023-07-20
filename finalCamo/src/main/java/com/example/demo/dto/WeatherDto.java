package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class WeatherDto {
    private String fcstDate; // 예보날짜
    private String fcstTime; // 예보시간
    private String category; // 예보유형
    private String fcstValue; // 예보값
    private String nx; // x좌표값
    private String ny; // y좌표값
}
