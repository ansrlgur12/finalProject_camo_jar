package com.example.demo.service;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.OjiNojiDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.Camp;
import com.example.demo.entity.Member;
import com.example.demo.entity.OjiNoji;
import com.example.demo.entity.Review;
import com.example.demo.repository.OjiNojiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OjiNojiService {


    @Autowired
    private OjiNojiRepository ojiNojiRepository;
    private OjiNojiDto ojiNojiDto;
    @Autowired
    private AuthService authService;

//    public Boolean save(Map<String, String> data){
//        OjiNoji ojiNoji = new OjiNoji();
//        System.out.println(data);
//        ojiNoji.setMemberId(data.get("memberId"));
//        ojiNoji.setMapX(data.get("mapX"));
//        ojiNoji.setMapY(data.get("mapY"));
//        ojiNoji.setSbrsCl(data.get("sbrsCl"));
//        ojiNoji.setDoNm(data.get("doNm"));
//        ojiNoji.setSigunguNm(data.get("sigunguNm"));
//        ojiNoji.setFacltNm(data.get("facltNm"));
//        ojiNoji.setDiff(data.get("diff"));
//        ojiNoji.setIntro(data.get("intro"));
//        ojiNoji.setAddr1(data.get("addr1"));
//        ojiNoji.setUrl(data.get("url"));
//
//        ojiNojiRepository.save(ojiNoji);
//        return true;
//    }

//    public boolean createMarker(Map<String, String> data, HttpServletRequest request, UserDetails userDetails) {
//        System.out.println(data);
//        Member member = authService.validateTokenAndGetUser(request, userDetails);
//        System.out.println(member);
//
//
//
//        OjiNoji ojiNoji = new OjiNoji();
//        System.out.println("OjiNoji 진입");
//        ojiNoji.setId(member.getId());
//        ojiNoji.setMember(member);
//        ojiNoji.setMapX(data.get("mapX"));
//        ojiNoji.setMapY(data.get("mapY"));
//        ojiNoji.setSbrsCl(data.get("sbrsCl"));
//        ojiNoji.setDoNm(data.get("doNm"));
//        ojiNoji.setSigunguNm(data.get("sigunguNm"));
//        ojiNoji.setFacltNm(data.get("facltNm"));
//        ojiNoji.setDiff(data.get("diff"));
//        ojiNoji.setIntro(data.get("intro"));
//        ojiNoji.setAddr1(data.get("addr1"));
//        ojiNoji.setUrl(data.get("url"));
//
//        OjiNoji savedOjinoji = ojiNojiRepository.save(ojiNoji);
//        return savedOjinoji != null;
//    }

    public boolean createMarker(OjiNojiDto ojiNojiDto, HttpServletRequest request, UserDetails userDetails) {
        System.out.println("service 부분");
        Member member = authService.validateTokenAndGetUser(request, userDetails);
        System.out.println(member);

        ojiNojiDto.setId(member.getId());

        OjiNoji ojiNoji = new OjiNoji();
        System.out.println("OjiNoji 진입");
        ojiNoji.setMember(member);
        ojiNoji.setMapX(ojiNojiDto.getMapX());
        ojiNoji.setMapY(ojiNojiDto.getMapY());
        ojiNoji.setSbrsCl(ojiNojiDto.getSbrsCl());
        ojiNoji.setDoNm(ojiNojiDto.getDoNm());
        ojiNoji.setSigunguNm(ojiNojiDto.getSigunguNm());
        ojiNoji.setFacltNm(ojiNojiDto.getFacltNm());
        ojiNoji.setDiff(ojiNojiDto.getDiff());
        ojiNoji.setIntro(ojiNojiDto.getIntro());
        ojiNoji.setAddr1(ojiNojiDto.getAddr1());
        ojiNoji.setUrl(ojiNojiDto.getUrl());

        OjiNoji savedOjinoji = ojiNojiRepository.save(ojiNoji);
        return savedOjinoji != null;
    }

    public List<OjiNojiDto> getOjiData(String dho, String sigungu){
        List<OjiNoji> items = ojiNojiRepository.findAll();
        List<OjiNoji> itemsBySelect = ojiNojiRepository.findByDoNmContainingAndSigunguNmContaining(dho, sigungu);
        List<OjiNoji> itemsByDho = ojiNojiRepository.findByDoNmContaining(dho);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();
        if("ALL".equals(dho) && "시.군.구".equals(sigungu)){
            for (OjiNoji camp : items) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);
            }
        } else if (!"ALL".equals(dho) && "시.군.구".equals(sigungu)) {
            for (OjiNoji camp : itemsByDho) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);

            }
        } else {
            for (OjiNoji camp : itemsBySelect) {
                OjiNojiDto campDto = new OjiNojiDto();
                campDto.setFacltNm(camp.getFacltNm());
                campDto.setDoNm(camp.getDoNm());
                campDto.setSigunguNm(camp.getSigunguNm());
                campDto.setMapX(camp.getMapX());
                campDto.setMapY(camp.getMapY());
                campDto.setIntro(camp.getIntro());
                campDto.setDiff(camp.getDiff());
                campDto.setSbrsCl(camp.getSbrsCl());
                campDto.setAddr1(camp.getAddr1());
                campDto.setUrl(camp.getUrl());
                campDto.setViewCount(camp.getViewCount());
                ojiNojiDtos.add(campDto);

            }
        }
        return ojiNojiDtos;
    }
    public List<OjiNojiDto> getOjiOverlay(String xValue, String yValue){
        List<OjiNoji> items = ojiNojiRepository.findByMapXAndMapY(xValue, yValue);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();
        for (OjiNoji camp : items ) {
            OjiNojiDto ojiNojiDto = new OjiNojiDto();
            ojiNojiDto.setFacltNm(camp.getFacltNm());
            ojiNojiDto.setAddr1(camp.getAddr1());
            ojiNojiDto.setMapX(camp.getMapX());
            ojiNojiDto.setMapY(camp.getMapY());
            ojiNojiDto.setIntro(camp.getIntro());
            ojiNojiDto.setDiff(camp.getDiff());
            ojiNojiDto.setSbrsCl(camp.getSbrsCl());
            ojiNojiDto.setUrl(camp.getUrl());
            ojiNojiDto.setViewCount(camp.getViewCount());
            ojiNojiDtos.add(ojiNojiDto);
        }
        return ojiNojiDtos;
    }

    public List<OjiNojiDto> getSearchData(String searchValue){

        List<OjiNoji> items = ojiNojiRepository.findByFacltNmContaining(searchValue);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();

            for (OjiNoji camp : items ) {
                OjiNojiDto ojinojiDto = new OjiNojiDto();
                ojinojiDto.setFacltNm(camp.getFacltNm());
                ojinojiDto.setAddr1(camp.getAddr1());
                ojinojiDto.setMapX(camp.getMapX());
                ojinojiDto.setMapY(camp.getMapY());
                ojinojiDto.setViewCount(camp.getViewCount());
                ojinojiDto.setUrl(camp.getUrl());
                ojiNojiDtos.add(ojinojiDto);
            }
        return ojiNojiDtos;
    }

    public List<OjiNojiDto> getMemberMarkedCampJwt(HttpServletRequest request, UserDetails userDetails) {
        Member member = authService.validateTokenAndGetUser(request, userDetails);
        List<OjiNojiDto> ojiNojiDtos = new ArrayList<>();

        List<OjiNoji> ojiNojis = ojiNojiRepository.findByMember(member);

        for (OjiNoji ojiNoji : ojiNojis) {
            OjiNojiDto ojiNojiDto = new OjiNojiDto();
            ojiNojiDto.setId(ojiNoji.getId());
            ojiNojiDto.setFacltNm(ojiNoji.getFacltNm());
            ojiNojiDto.setDoNm(ojiNoji.getDoNm());
            ojiNojiDto.setSigunguNm(ojiNoji.getSigunguNm());
            ojiNojiDto.setMapX(ojiNoji.getMapX());
            ojiNojiDto.setMapY(ojiNoji.getMapY());
            ojiNojiDto.setIntro(ojiNoji.getIntro());
            ojiNojiDto.setSbrsCl(ojiNoji.getSbrsCl());
            ojiNojiDto.setDiff(ojiNoji.getDiff());
            ojiNojiDto.setAddr1(ojiNoji.getAddr1());
            ojiNojiDto.setUrl(ojiNoji.getUrl());
            ojiNojiDtos.add(ojiNojiDto);
        }

        return ojiNojiDtos;
    }
}
