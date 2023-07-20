package com.example.demo.repository;

import com.example.demo.entity.Camp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampRepository extends JpaRepository<Camp, Long> {
    @Query("SELECT c FROM Camp c WHERE c.facltNm LIKE %:faclt_nm%")
    List<Camp> searchByFacltNmAndDoNmAndSigunguNm(@Param("faclt_nm") String facltNm);

    List<Camp> findByMapXAndMapY(String mapX, String mapY);

    List<Camp> findByFacltNmContaining(String facltNm);

    List<Camp> findByAnimalCmgClNotContainingAndFacltNmContaining(String animalCmgCl, String facltNm);

    //검색바
    List<Camp> findTop32ByOrderById();
    List<Camp> findTop32ByDoNmContainingAndSigunguNmContaining(String doNm, String sigunguNm);
    List<Camp> findTop32ByDoNmContaining(String doNm);
    List<Camp> findTop32ByAnimalCmgClNot(String animalCmgCl);
    List<Camp> findTop32ByDoNmContainingAndSigunguNmContainingAndAnimalCmgClNotContaining(String doNm, String sigunguNm, String animalCmgCl);
    List<Camp> findTop32ByDoNmContainingAndAnimalCmgClNotContaining(String doNm, String animalCmgCl);

    List<Camp> findByFacltNm(String facltNm);
    List<Camp> findByContentId(String contentId);

    @Query(value = "SELECT * FROM camp " +
            "ORDER BY SQRT(POW((mapX - :mapX), 2) + POW((mapY - :mapY), 2)) " +
            "LIMIT :limit",
            nativeQuery = true)
    List<Camp> findClosestCampsByCoordinates(@Param("mapX") double mapX,
                                             @Param("mapY") double mapY,
                                             @Param("limit") int limit);


    // 페이지네이션 테스트

    Page<Camp> findAll(Pageable pageable);

    Page<Camp> findByDoNmContaining(String doNm, Pageable pageable);

    Page<Camp> findByDoNmContainingAndSigunguNmContaining(String doNm, String sigunguNm, Pageable pageable);
}
