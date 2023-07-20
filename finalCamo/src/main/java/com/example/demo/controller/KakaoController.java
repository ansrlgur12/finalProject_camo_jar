package com.example.demo.controller;

import com.example.demo.dto.KakaoDTO;
import com.example.demo.service.KakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class KakaoController {

    private final KakaoService kakaoService;

//    @GetMapping("/intro/kakaologin")
//    public @ResponseBody KakaoDTO kakaoCallback(String code) {
//        System.out.println("출력할 값 : " + code);
//        try {
//            KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(code);
//            return kakaoInfo;
//        } catch (Exception e){
//            System.out.println("동작 안됨");
//        }
//        return null;
//    }

    @GetMapping("/intro/kakaologin")
    public ResponseEntity<KakaoDTO> kakaoCallback(String code) {
        try {
            KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(code);
            return ResponseEntity.ok(kakaoInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).build();
        }
    }


}
