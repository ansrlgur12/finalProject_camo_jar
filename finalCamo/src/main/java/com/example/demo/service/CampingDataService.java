package com.example.demo.service;


import com.example.demo.dto.CampDto;
import com.example.demo.entity.Camp;
import com.example.demo.repository.CampRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CampingDataService {
    @Autowired
    private CampRepository campRepository;
    private CampDto campDto;




    public void fetchAndSaveCampingData() {
        String url = "http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=q%2FN6THt6wGszjSEFU5zzQVQIq44LTMRAzwL8RLnLtj7YRmwQec87Tx1SMf48wKbaOH2LLcoHyXVnR8YTfHapdg%3D%3D&numOfRows=3507&MobileOS=ETC&MobileApp=AppTest";

        // Create an instance of RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Send GET request and retrieve the response
        String response = restTemplate.getForObject(url, String.class);

        // Parse the response and save it to the database
        CampDto campDto = parseResponse(response);
        Camp campingDataEntity = convertToEntity(campDto);
        campRepository.save(campingDataEntity);
    }

    public List<CampDto> searchCamp(String facltNm) {
        List<Camp> camps = campRepository.searchByFacltNmAndDoNmAndSigunguNm(facltNm);
        List<CampDto> dtos = new ArrayList<>();

        for (Camp camp : camps) {
            CampDto dto = new CampDto();
            dto.setId(camp.getId());
            dto.setFacltNm(camp.getFacltNm());
            dtos.add(dto);
        }

        return dtos;
    }


    private CampDto parseResponse(String response) {
        // 공공 API 응답 데이터를 파싱하여 CampingDataDTO 객체로 변환하는 로직을 구현해야 합니다.
        // 실제로는 응답 데이터에 맞게 적절한 파싱 로직을 작성해야 합니다.
        return new CampDto();
    }

    private Camp convertToEntity(CampDto campingDataDTO) {
        // CampingDataDTO 객체를 CampingDataEntity 객체로 변환하는 로직을 구현해야 합니다.
        // 실제로는 필드 값을 복사하거나 매핑하는 작업을 수행해야 합니다.
        return new Camp();
    }

    public Camp save(CampDto campDto){
        Camp camp = new Camp(); // 객체 생성
        camp.setFacltNm(campDto.getFacltNm());
        camp.setBrazierCl(campDto.getBrazierCl());
        camp.setSbrsCl(campDto.getSbrsCl());
        camp.setSbrsEtc(campDto.getSbrsEtc());
        camp.setWtrplCo(campDto.getWtrplCo());
        camp.setToiletCo(campDto.getToiletCo());
        camp.setSwrmCo(campDto.getSwrmCo());
        camp.setDoNm(campDto.getDoNm());
        camp.setSigunguNm(campDto.getSigunguNm());
        camp.setAddr1(campDto.getAddr1());
        camp.setMapX(campDto.getMapX());
        camp.setMapY(campDto.getMapY());
        camp.setTel(campDto.getTel());
        camp.setHomepage(campDto.getHomepage());
        camp.setResveCl(campDto.getResveCl());
        camp.setFeatureNm(campDto.getFeatureNm());
        camp.setIntro(campDto.getIntro());
        camp.setAnimalCmgCl(campDto.getAnimalCmgCl());
        camp.setFirstImageUrl(campDto.getFirstImageUrl());
        camp.setCreatedtime(campDto.getCreatedtime());
        camp.setLineIntro(campDto.getLineIntro());
        camp.setEqpmnLendCl(campDto.getEqpmnLendCl());
        camp.setContentId(campDto.getContentId());
        return campRepository.save(camp);
    }

    public void saveCampingData(JsonNode arrayNode) {
        List<CampDto> campingDTOList = new ArrayList<>();
        for (JsonNode item : arrayNode) {
            CampDto campingDTO = new CampDto();
            campingDTO.setFacltNm(item.get("facltNm").asText());
            campingDTO.setBrazierCl(item.get("brazierCl").asText());
            campingDTO.setSbrsCl(item.get("sbrsCl").asText());
            campingDTO.setSbrsEtc(item.get("sbrsEtc").asText());
            campingDTO.setWtrplCo(item.get("wtrplCo").asText());
            campingDTO.setToiletCo(item.get("toiletCo").asText());
            campingDTO.setSwrmCo(item.get("swrmCo").asText());
            campingDTO.setDoNm(item.get("doNm").asText());
            campingDTO.setSigunguNm(item.get("sigunguNm").asText());
            campingDTO.setAddr1(item.get("addr1").asText());
            campingDTO.setMapX(item.get("mapX").asText());
            campingDTO.setMapY(item.get("mapY").asText());
            campingDTO.setTel(item.get("tel").asText());
            campingDTO.setHomepage(item.get("homepage").asText());
            campingDTO.setResveCl(item.get("resveCl").asText());
            campingDTO.setIntro(item.get("intro").asText());
            campingDTO.setFeatureNm(item.get("featureNm").asText());
            campingDTO.setAnimalCmgCl(item.get("animalCmgCl").asText());
            campingDTO.setFirstImageUrl(item.get("firstImageUrl").asText());
            campingDTO.setCreatedtime(item.get("createdtime").asText());
            campingDTO.setLineIntro(item.get("lineIntro").asText());
            campingDTO.setEqpmnLendCl(item.get("eqpmnLendCl").asText());
            campingDTO.setContentId(item.get("contentId").asText());

            campingDTOList.add(campingDTO);
        }
        for (CampDto campingDTO : campingDTOList) {
            save(campingDTO);
        }
    }

    public List<CampDto> getCampData(String dho, String sigungu){
        List<Camp> items = campRepository.findTop32ByOrderById();
        List<Camp> itemsBySelect = campRepository.findTop32ByDoNmContainingAndSigunguNmContaining(dho, sigungu);
        List<Camp> itemsByDho = campRepository.findTop32ByDoNmContaining(dho);
        List<CampDto> campDtos = new ArrayList<>();
        if("ALL".equals(dho) && "시.군.구".equals(sigungu)){
            for (Camp camp : items) {
                CampDto campDto = new CampDto();
                campDto.setId(camp.getId());
                campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        } else if (!"ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            for (Camp camp : itemsByDho) {
                CampDto campDto = new CampDto();
                campDto.setId(camp.getId());
                campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        } else {
            for (Camp camp : itemsBySelect) {
                CampDto campDto = new CampDto();
                campDto.setId(camp.getId());
                campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        }
        return campDtos;
    }

    public List<CampDto> getOverlay(String xValue, String yValue){
        List<Camp> items = campRepository.findByMapXAndMapY(xValue, yValue);
        List<CampDto> campDtos = new ArrayList<>();
        for (Camp camp : items ) {
            CampDto campDto = new CampDto();
            campDto.setId(camp.getId());
            campDto.setFacltNm(camp.getFacltNm());
            campDto.setAddr1(camp.getAddr1());
            campDto.setTel(camp.getTel());
            campDto.setFirstImageUrl(camp.getFirstImageUrl());
            campDto.setMapX(camp.getMapX());
            campDto.setMapY(camp.getMapY());
            campDto.setViewCount(camp.getViewCount());
            campDto.setIntro(camp.getIntro());
            campDto.setFeatureNm(camp.getFeatureNm());
            campDto.setContentId(camp.getContentId());
            campDto.setResveCl(camp.getResveCl());
            campDto.setHomepage(camp.getHomepage());
            campDto.setComments(camp.getCampComments().size());
            campDtos.add(campDto);
        }
        return campDtos;
    }
    public List<CampDto> getAnimalData(String dho, String sigungu) {
        List<Camp> items = campRepository.findTop32ByAnimalCmgClNot("불가능");
        List<Camp> itemsBySelect = campRepository.findTop32ByDoNmContainingAndSigunguNmContainingAndAnimalCmgClNotContaining(dho, sigungu, "불가능");
        List<Camp> itemsByDho = campRepository.findTop32ByDoNmContainingAndAnimalCmgClNotContaining(dho, "불가능");
        List<CampDto> campDtos = new ArrayList<>();
        if("ALL".equals(dho) && "시.군.구".equals(sigungu)){
            for (Camp camp : items) {
                CampDto campDto = new CampDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        } else if (!"ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            for (Camp camp : itemsByDho) {
                CampDto campDto = new CampDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        } else {
            for (Camp camp : itemsBySelect) {
                CampDto campDto = new CampDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDto.setLikes(camp.getLikes().size());
                campDto.setComments(camp.getCampComments().size());
                campDtos.add(campDto);
            }
        }
        return campDtos;
    }
    public List<CampDto> getSearchData(String searchValue, String currentData){

        List<Camp> items = campRepository.findByFacltNmContaining(searchValue);
        List<Camp> itemsAnimal = campRepository.findByAnimalCmgClNotContainingAndFacltNmContaining("불가능", searchValue);
        List<CampDto> campDtos = new ArrayList<>();

        if("normal".equals(currentData)){
            for (Camp camp : items ) {
                CampDto campDto = new CampDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY()); campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDtos.add(campDto);
            }
        }
        if("animal".equals(currentData)){
            for (Camp camp : itemsAnimal ) {
                CampDto campDto = new CampDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setAddr1(camp.getAddr1());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setFirstImageUrl(camp.getFirstImageUrl());
                campDto.setCreatedtime(camp.getCreatedtime());
                campDto.setViewCount(camp.getViewCount());
                campDtos.add(campDto);
            }
        }
        return campDtos;
    }
    public List<CampDto> getIcon(String contentId){
        List<Camp> items = campRepository.findByContentId(contentId);
        List<CampDto> campDtos = new ArrayList<>();
        for (Camp camp : items ) {
            CampDto campDto = new CampDto();
            campDto.setBrazierCl(camp.getBrazierCl());
            campDto.setSbrsCl(camp.getSbrsCl());
            campDto.setSbrsEtc(camp.getSbrsEtc());
            campDto.setSwrmCo(camp.getSwrmCo());
            campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
            campDto.setEqpmnLendCl(camp.getEqpmnLendCl());
            campDto.setContentId(camp.getContentId());
            campDtos.add(campDto);
        }
        return campDtos;
    }

    public List<CampDto> getClosestCampData(double mapX, double mapY, int limit) {
        List<Camp> closestCamps = campRepository.findClosestCampsByCoordinates(mapX, mapY, limit);
        List<CampDto> campDtos = new ArrayList<>();

        for (Camp camp : closestCamps) {
            CampDto campDto = new CampDto();
            campDto.setFacltNm(camp.getFacltNm());
            campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
            campDto.setAddr1(camp.getAddr1());
            campDto.setMapX(camp.getMapX());
            campDto.setMapY(camp.getMapY());
            campDtos.add(campDto);
        }

        return campDtos;
    }

    // 페이지네이션 테스트
    public List<CampDto> getCampDataWithPagination(String dho, String sigungu, int page, int size, String sortBy) {
        Pageable pageable;
        if("이름순".equals(sortBy)) {
            pageable = PageRequest.of(page, size, Sort.by("facltNm").ascending());
        } else if("등록순".equals(sortBy)){
            pageable = PageRequest.of(page, size, Sort.by("createdtime").ascending());
        } else if("조회순".equals(sortBy)){
            pageable = PageRequest.of(page, size, Sort.by("viewCount").descending());
        } else if("인기순".equals(sortBy)){
            pageable = PageRequest.of(page, size, Sort.by("likes").descending());
        } else{
            pageable = PageRequest.of(page, size, Sort.by("campComments").descending());
        }


        Page<Camp> campPage;
        if ("ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            campPage = campRepository.findAll(pageable);
        } else if (!"ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            campPage = campRepository.findByDoNmContaining(dho, pageable);
        } else {
            campPage = campRepository.findByDoNmContainingAndSigunguNmContaining(dho, sigungu, pageable);
        }

        List<CampDto> campDtos = new ArrayList<>();
        for (Camp camp : campPage) {
            CampDto campDto = new CampDto();
            campDto.setId(camp.getId());
            campDto.setAnimalCmgCl(camp.getAnimalCmgCl());
            campDto.setFacltNm(camp.getFacltNm());
            campDto.setAddr1(camp.getAddr1());
            campDto.setMapX(camp.getMapX());
            campDto.setMapY(camp.getMapY());
            campDto.setFirstImageUrl(camp.getFirstImageUrl());
            campDto.setCreatedtime(camp.getCreatedtime());
            campDto.setViewCount(camp.getViewCount());
            campDto.setLikes(camp.getLikes().size());
            campDto.setComments(camp.getCampComments().size());
            campDtos.add(campDto);
        }

        return campDtos;
    }


}