package com.example.demo.controller;

import com.example.demo.dto.WeatherDto;
import com.example.demo.repository.WeatherRepository;
import com.example.demo.service.WeatherService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/weather")
public class WeatherController {
    private final WeatherService weatherService;
    private final WeatherRepository weatherRepository;

    @GetMapping("/getWeather/{mapX}/{mapY}/{date}")
    public ResponseEntity<List<WeatherDto>> weatherData(@PathVariable String mapX, @PathVariable String mapY, @PathVariable String date) throws JsonProcessingException {
        List<WeatherDto> list = weatherService.getWeatherData(mapX, mapY, date);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
