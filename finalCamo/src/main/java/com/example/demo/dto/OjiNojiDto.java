package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OjiNojiDto {
    private Long Id;
    private String facltNm;
    private String doNm;
    private String sigunguNm;
    private String mapX;
    private String mapY;
    private String intro;
    private String sbrsCl;
    private String diff;
    private String addr1;
    private String url;
    private Integer viewCount;
    private Long memberId;
}
