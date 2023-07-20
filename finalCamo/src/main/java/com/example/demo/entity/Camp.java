package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Camp {
    @Id
    @Column(name = "gocamping_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String facltNm;
    private String brazierCl; // 화로대
    private String sbrsCl; // 부대시설 -> 아이콘
    private String sbrsEtc; // 부대시설 기타 -> 아이콘
    private String wtrplCo; // 개수대 개수
    private String toiletCo; // 화장실 개수
    private String swrmCo; // 샤워실 개수 -> 아이콘
    private String doNm; // 도
    private String sigunguNm; // 시군구
    private String addr1;
    private String mapX;
    private String mapY;
    private String tel;
    private String homepage;
    private String resveCl; // 예약 구분

    @Lob
    @Column(columnDefinition = "TEXT")
    private String intro; // 소개

    @Column(length = 2000)
    private String featureNm; // 특징

    private String animalCmgCl; // 애완동물 -> 아이콘
    private String firstImageUrl;
    private String createdtime;
    private String lineIntro;
    private String eqpmnLendCl; // 캠핑장비 대여 -> 아이콘

    @OneToMany(mappedBy = "camp")
    private List<Likes> likes;

    @OneToMany(mappedBy = "camp")
    private List<OneLineReview> oneLineReview; // 한줄평

    @OneToMany(mappedBy = "camp")
    private List<CampComment> campComments;

    @Column
    private Integer viewCount = 0; // 조회수
    private String contentId;
    private String induty;
}
