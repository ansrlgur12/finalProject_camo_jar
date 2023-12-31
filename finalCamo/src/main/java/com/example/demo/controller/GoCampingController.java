package com.example.demo.controller;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.entity.Camp;
import com.example.demo.repository.CampRepository;
import com.example.demo.service.CampingDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/camp")
public class GoCampingController {

    private final CampingDataService campingDataService;
    private final CampRepository campRepository;

    /**
     * 캠핑장 검색
     */
    @GetMapping("/search")
    public ResponseEntity<List<CampDto>> searchCamps(@RequestParam String facltNm) {
        List<CampDto> camps = campingDataService.searchCamp(facltNm);
        return ResponseEntity.ok(camps);
    }

    @GetMapping("/camping-data") // 캠핑장 정보 불러오기
    public String getCampingData() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=3507&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }


    @GetMapping("/campData/{sortBy}")
    public ResponseEntity<List<CampDto>> campData(@PathVariable String sortBy) {
        List<CampDto> list = campingDataService.getCampData(sortBy);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/overlay/{xValue}/{yValue}")
    public ResponseEntity<List<CampDto>> overlay(@PathVariable String xValue, @PathVariable String yValue){
        List<CampDto> list = campingDataService.getOverlay(xValue, yValue);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/animalData/{dho}/{sigungu}")
    public ResponseEntity<List<CampDto>> animalData(@PathVariable String dho, @PathVariable String sigungu) {
        List<CampDto> list = campingDataService.getAnimalData(dho, sigungu);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 검색결과 페이지네이션
    @GetMapping("/searchData/{searchValue}/{currentData}/{page}/{size}")
    public ResponseEntity<Page<CampDto>> searchDataPN(@PathVariable String searchValue, @PathVariable String currentData, @PathVariable int page, @PathVariable int size){
        System.out.println(searchValue + " : searchValue 값");
        System.out.println(currentData + " : currentData 값");
        Page<CampDto> campPage = campingDataService.getSearchDataPn(searchValue, currentData, page, size);
        return new ResponseEntity<>(campPage, HttpStatus.OK);
    }

    @GetMapping("/viewCount/{facltNm}")
    @Transactional
    public ResponseEntity<String> viewCount(@PathVariable String facltNm) {
        List<Camp> camps = campRepository.findByFacltNm(facltNm);
        if (camps.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Camp camp = camps.get(0);
        camp.setViewCount(camp.getViewCount() + 1);
        campRepository.save(camp);
        return ResponseEntity.ok(facltNm + "의 조회수가 증가되었습니다.");
    }

    @GetMapping("/getIcon/{contentId}")
    public ResponseEntity<List<CampDto>> getImage(@PathVariable String contentId){
        List<CampDto> list = campingDataService.getIcon(contentId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/viewCampMarker/{markerLat}/{markerLng}")
    public ResponseEntity<List<CampDto>> viewCampMarker(@PathVariable String markerLat, @PathVariable String markerLng) {
        double mapXCord = Double.parseDouble(markerLng);
        double mapYCord = Double.parseDouble(markerLat);
        List<CampDto> list = campingDataService.getClosestCampData(mapXCord, mapYCord, 100);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 페이지네이션 테스트

    @GetMapping("/sideBarList/{dho}/{sigungu}/{page}/{size}/{sortBy}")
    public ResponseEntity<Page<CampDto>> getSidebarList(@PathVariable String dho, @PathVariable String sigungu, @PathVariable int page, @PathVariable int size, @PathVariable String sortBy) {
        Page<CampDto> campPage = campingDataService.getCampDataWithPagination(dho, sigungu, page, size, sortBy);
        return new ResponseEntity<>(campPage, HttpStatus.OK);
    }

    @GetMapping("/camping-data/1") // 캠핑장 정보 불러오기
    public String getCampingData1() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=2&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

    @GetMapping("/camping-data/2") // 캠핑장 정보 불러오기
    public String getCampingData2() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=3&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

    @GetMapping("/camping-data/3") // 캠핑장 정보 불러오기
    public String getCampingData3() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=4&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

    @GetMapping("/camping-data/4") // 캠핑장 정보 불러오기
    public String getCampingData4() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=5&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

    @GetMapping("/camping-data/5") // 캠핑장 정보 불러오기
    public String getCampingData5() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=6&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

    @GetMapping("/camping-data/6") // 캠핑장 정보 불러오기
    public String getCampingData6() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=7&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }
    @GetMapping("/camping-data/7") // 캠핑장 정보 불러오기
    public String getCampingData7() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=8&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }
    @GetMapping("/camping-data/8") // 캠핑장 정보 불러오기
    public String getCampingData8() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=9&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }
    @GetMapping("/camping-data/9") // 캠핑장 정보 불러오기
    public String getCampingData9() throws JsonProcessingException {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=377&pageNo=10&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        campingDataService.saveCampingData(arrayNode);
        return null;
    }

}



