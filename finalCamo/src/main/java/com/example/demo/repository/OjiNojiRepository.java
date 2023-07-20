package com.example.demo.repository;

import com.example.demo.entity.Camp;
import com.example.demo.entity.Member;
import com.example.demo.entity.OjiNoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OjiNojiRepository extends JpaRepository<OjiNoji, Long> {

    List<OjiNoji> findByDoNmContainingAndSigunguNmContaining(String doNm, String sigunguNm);

    List<OjiNoji> findByDoNmContaining(String doNm);

    List<OjiNoji> findByMapXAndMapY(String mapX, String mapY);

    List<OjiNoji> findByFacltNmContaining(String facltNm);

    List<OjiNoji> findByFacltNm(String facltNm);

    List<OjiNoji> findByMember(Member member);

}
