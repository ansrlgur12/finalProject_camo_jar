package com.example.demo.service;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.WeatherDto;
import com.example.demo.entity.Camp;
import com.example.demo.entity.Weather;
import com.example.demo.repository.WeatherRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WeatherService {

    @Autowired
    private WeatherRepository weatherRepository;
    private WeatherDto weatherDto;

    public void fetchAndSaveWeatherData() {
        String url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";
        String key = "q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==";
        String requestParm = "&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230629&base_time=0500&nx=55&ny=127";
        // Create an instance of RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Send GET request and retrieve the response
        String response = restTemplate.getForObject(url, String.class);

        // Parse the response and save it to the database
        WeatherDto weatherDto = parseResponse(response);
        Weather weather = convertToEntity(weatherDto);
        weatherRepository.save(weather);
    }

    private WeatherDto parseResponse(String response) {
        return new WeatherDto();
    }

    private Weather convertToEntity(WeatherDto weatherDto) {
        return new Weather();
    }


    public List<WeatherDto> getWeatherData(String mapX, String mapY, String date) throws JsonProcessingException {
        String endPoint = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?";
        String key = "serviceKey=" +
                "q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==";
        String request = "&pageNo=1&numOfRows=1000&dataType=JSON";
        String time = "&base_date=" + date + "&base_time=0500";
        String loc = "&nx=" + mapX + "&ny=" + mapY;

        String url = endPoint + key + request + time + loc;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        System.out.println(jsonResponse);

        ObjectMapper objectMapper = new ObjectMapper();

        try{
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

            List<WeatherDto> weatherDtoList = new ArrayList<>();
            for (JsonNode item : arrayNode){
                WeatherDto weatherDto = new WeatherDto();
                weatherDto.setFcstDate(item.get("fcstDate").asText());
                weatherDto.setFcstTime(item.get("fcstTime").asText());
                weatherDto.setCategory(item.get("category").asText());
                weatherDto.setFcstValue(item.get("fcstValue").asText());
                weatherDto.setNx(item.get("nx").asText());
                weatherDto.setNy(item.get("ny").asText());
                weatherDtoList.add(weatherDto);
            }
            return weatherDtoList;
        } catch(Exception e){
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
