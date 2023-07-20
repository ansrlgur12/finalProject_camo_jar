package com.example.demo.controller;

import com.example.demo.dto.ImageDto;
import com.example.demo.dto.WeatherDto;
import com.example.demo.repository.ImageRepository;
import com.example.demo.service.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    @GetMapping("/getImage/{contentId}")
    public ResponseEntity<List<ImageDto>> getImage(@PathVariable String contentId) throws JsonProcessingException {
        List<ImageDto> list = imageService.getImage(contentId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
