package com.example.demo.service;

import com.example.demo.dto.CampDto;
import com.example.demo.entity.Camp;
import com.example.demo.repository.CampRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@EnableScheduling
@RequiredArgsConstructor
public class CampSchedular {
    @Autowired
    private CampRepository campRepository;
    private CampDto campDto;

    @Scheduled(cron = "0 0 4 * * *") // 매일 새벽 4시에 실행
    public void updateCampingData() throws JsonProcessingException {
        System.out.println("스케줄러 실행 !!!");
        // API 호출 및 응답 처리
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q/N6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg==&numOfRows=3507&MobileOS=ETC&MobileApp=AppTest&_type=json";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String jsonResponse = response.getBody();

        // JSON 응답 처리
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(jsonResponse);
        JsonNode arrayNode = root.get("response").get("body").get("items").get("item");

        List<CampDto> campingDTOList = new ArrayList<>();
        for (JsonNode item : arrayNode) {
            CampDto campDto = new CampDto();
            campDto.setFacltNm(item.get("facltNm").asText());
            campDto.setBrazierCl(item.get("brazierCl").asText());
            campDto.setSbrsCl(item.get("sbrsCl").asText());
            campDto.setSbrsEtc(item.get("sbrsEtc").asText());
            campDto.setWtrplCo(item.get("wtrplCo").asText());
            campDto.setToiletCo(item.get("toiletCo").asText());
            campDto.setSwrmCo(item.get("swrmCo").asText());
            campDto.setDoNm(item.get("doNm").asText());
            campDto.setSigunguNm(item.get("sigunguNm").asText());
            campDto.setAddr1(item.get("addr1").asText());
            campDto.setMapX(item.get("mapX").asText());
            campDto.setMapY(item.get("mapY").asText());
            campDto.setTel(item.get("tel").asText());
            campDto.setHomepage(item.get("homepage").asText());
            campDto.setResveCl(item.get("resveCl").asText());
            campDto.setIntro(item.get("intro").asText());
            campDto.setFeatureNm(item.get("featureNm").asText());
            campDto.setAnimalCmgCl(item.get("animalCmgCl").asText());
            campDto.setFirstImageUrl(item.get("firstImageUrl").asText());
            campDto.setCreatedtime(item.get("createdtime").asText());
            campDto.setLineIntro(item.get("lineIntro").asText());
            campDto.setEqpmnLendCl(item.get("eqpmnLendCl").asText());
            campDto.setContentId(item.get("contentId").asText());

            campingDTOList.add(campDto);
        }
        for (CampDto campingDTO : campingDTOList) {
            List<Camp> existingCamps = campRepository.findByFacltNm(campingDTO.getFacltNm()); // 기존 데이터 가져오기

            for (Camp existingCamp : existingCamps) {
                if (existingCamp.getFacltNm().equals(campingDTO.getFacltNm())
                        && existingCamp.getBrazierCl().equals(campingDTO.getBrazierCl())
                        && existingCamp.getSbrsCl().equals(campingDTO.getSbrsCl())
                        && existingCamp.getSbrsEtc().equals(campingDTO.getSbrsEtc())
                        && existingCamp.getWtrplCo().equals(campingDTO.getWtrplCo())
                        && existingCamp.getToiletCo().equals(campingDTO.getToiletCo())
                        && existingCamp.getSwrmCo().equals(campingDTO.getSwrmCo())
                        && existingCamp.getDoNm().equals(campingDTO.getDoNm())
                        && existingCamp.getSigunguNm().equals(campingDTO.getSigunguNm())
                        && existingCamp.getAddr1().equals(campingDTO.getAddr1())
                        && existingCamp.getMapX().equals(campingDTO.getMapX())
                        && existingCamp.getMapY().equals(campingDTO.getMapY())
                        && existingCamp.getTel().equals(campingDTO.getTel())
                        && existingCamp.getHomepage().equals(campingDTO.getHomepage())
                        && existingCamp.getResveCl().equals(campingDTO.getResveCl())
                        && existingCamp.getIntro().equals(campingDTO.getIntro())
                        && existingCamp.getFeatureNm().equals(campingDTO.getFeatureNm())
                        && existingCamp.getAnimalCmgCl().equals(campingDTO.getAnimalCmgCl())
                        && existingCamp.getFirstImageUrl().equals(campingDTO.getFirstImageUrl())
                        && existingCamp.getCreatedtime().equals(campingDTO.getCreatedtime())
                        && existingCamp.getLineIntro().equals(campingDTO.getLineIntro())
                        && existingCamp.getEqpmnLendCl().equals(campingDTO.getEqpmnLendCl())
                        && existingCamp.getContentId().equals(campingDTO.getContentId())) {

                    continue; // 변경사항 없음, 다음 객체로 이동
                }

                existingCamp.setFacltNm(campingDTO.getFacltNm());
                existingCamp.setBrazierCl(campingDTO.getBrazierCl());
                existingCamp.setSbrsCl(campingDTO.getSbrsCl());
                existingCamp.setSbrsEtc(campingDTO.getSbrsEtc());
                existingCamp.setWtrplCo(campingDTO.getWtrplCo());
                existingCamp.setToiletCo(campingDTO.getToiletCo());
                existingCamp.setSwrmCo(campingDTO.getSwrmCo());
                existingCamp.setDoNm(campingDTO.getDoNm());
                existingCamp.setSigunguNm(campingDTO.getSigunguNm());
                existingCamp.setAddr1(campingDTO.getAddr1());
                existingCamp.setMapX(campingDTO.getMapX());
                existingCamp.setMapY(campingDTO.getMapY());
                existingCamp.setTel(campingDTO.getTel());
                existingCamp.setHomepage(campingDTO.getHomepage());
                existingCamp.setResveCl(campingDTO.getResveCl());
                existingCamp.setIntro(campingDTO.getIntro());
                existingCamp.setFeatureNm(campingDTO.getFeatureNm());
                existingCamp.setAnimalCmgCl(campingDTO.getAnimalCmgCl());
                existingCamp.setFirstImageUrl(campingDTO.getFirstImageUrl());
                existingCamp.setCreatedtime(campingDTO.getCreatedtime());
                existingCamp.setLineIntro(campingDTO.getLineIntro());
                existingCamp.setEqpmnLendCl(campingDTO.getEqpmnLendCl());
                existingCamp.setContentId(campingDTO.getContentId());

                campRepository.saveAndFlush(existingCamp); // 변경된 데이터 저장 및 즉시 반영
            }
        }

    }

}

