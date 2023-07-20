package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class Weather {
    @Id
    @Column(name = "weather_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fcstDate; // 예보날짜
    private String fcstTime; // 예보시간
    private String category; // 예보유형
    private String fcstValue; // 예보값
    private String nx; // x좌표값
    private String ny; // y좌표값

}
