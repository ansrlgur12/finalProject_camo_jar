package com.example.demo.service;

import com.example.demo.dto.ImageDto;
import com.example.demo.dto.WeatherDto;
import com.example.demo.repository.ImageRepository;
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
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    private ImageDto imageDto;

    public List<ImageDto> getImage(String contentId) throws JsonProcessingException {
        String endPoint = "https://apis.data.go.kr/B551011/GoCamping/imageList?";
        String key = "serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==";
        String request = "&numOfRows=9999&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=" + contentId;

        String url = endPoint + key + request;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        System.out.println(jsonResponse);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

            List<ImageDto> imageDtoList = new ArrayList<>();
            for(JsonNode item : arrayNode){
                ImageDto imageDto = new ImageDto();
                imageDto.setImageUrl(item.get("imageUrl").asText());
                imageDto.setSerialnum(item.get("serialnum").asText());
                imageDto.setContentId(item.get("contentId").asText());
                imageDtoList.add(imageDto);
            }
            return imageDtoList;
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace(); // 에러 메시지 출력 또는 로깅
            return new ArrayList<>(); // 빈 리스트 반환 또는 다른 처리 방식 선택
        }
    }
}
