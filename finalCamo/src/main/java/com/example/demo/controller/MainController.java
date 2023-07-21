package com.example.demo.controller;

import com.example.demo.dto.CampDto;
import com.example.demo.repository.CampRepository;
import com.example.demo.service.CampingDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class MainController {

    private final CampingDataService campingDataService;
    private final CampRepository campRepository;


    @GetMapping("/mainsection2/{lt}/{sigungu}")
    public ResponseEntity<List<CampDto>> campData(@PathVariable String lt, @PathVariable String sigungu) {
        List<CampDto> list = campingDataService.getCampData(lt, sigungu);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
