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


    @GetMapping("/campData/{dho}/{sigungu}")
    public ResponseEntity<List<CampDto>> campData(@PathVariable String dho, @PathVariable String sigungu) {
        List<CampDto> list = campingDataService.getCampData(dho, sigungu);
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

    @GetMapping("/searchData/{searchValue}/{currentData}")
    public ResponseEntity<List<CampDto>> searchData(@PathVariable String searchValue, @PathVariable String currentData){
        System.out.println(searchValue + " : searchValue 값");
        System.out.println(currentData + " : currentData 값");
        List<CampDto> list = campingDataService.getSearchData(searchValue, currentData);
        return new ResponseEntity<>(list, HttpStatus.OK);
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
    public ResponseEntity<List<CampDto>> getSidebarList(@PathVariable String dho, @PathVariable String sigungu, @PathVariable int page, @PathVariable int size, @PathVariable String sortBy) {
        List<CampDto> list = campingDataService.getCampDataWithPagination(dho, sigungu, page, size, sortBy);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}



