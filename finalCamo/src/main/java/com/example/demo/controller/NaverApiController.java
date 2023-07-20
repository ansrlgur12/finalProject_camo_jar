package com.example.demo.controller;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.NaverApiService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/open")
public class NaverApiController {

    private final NaverApiService naver;

    @ResponseBody
    @GetMapping("naver/blog")
    public ResponseEntity<JSONObject> getPlace(@RequestParam("query") String query) throws Exception {
        JSONParser parser = new JSONParser();
        Object obj = parser.parse( naver.search(query) );
        JSONObject jsonObj = (JSONObject) obj;
        return ResponseEntity.ok(jsonObj);
    }
}
