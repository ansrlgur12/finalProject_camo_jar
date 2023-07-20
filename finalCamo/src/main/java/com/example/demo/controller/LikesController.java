package com.example.demo.controller;

import com.example.demo.dto.CampDto;
import com.example.demo.dto.LikesDto;
import com.example.demo.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/likes")
public class LikesController {

    private final LikesService likesService;

    @Autowired
    public LikesController(LikesService likesService) {
        this.likesService = likesService;
    }

    /**
     * 특정 리뷰 좋아요(JWT적용)
     */
    @PostMapping("/review/{reviewId}")
    public ResponseEntity<?> likeReview(@PathVariable Long reviewId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(likesService.likeReviewByMember(reviewId, request, userDetails));
    }

    /**
     * 특정 리뷰 좋아요 갯수 확인(JWT적용)
     */
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Integer> countReviewLikes(@PathVariable Long reviewId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(likesService.countLikesByReview(reviewId, request, userDetails));
    }

    /**
     * 특정 상품 좋아요
     */
    @PostMapping("/product/{productId}/member/{memberId}")
    public ResponseEntity<LikesDto> likeProduct(@PathVariable Long memberId, @PathVariable Long productId) {
        return ResponseEntity.ok(likesService.likeProductByMember(memberId, productId));
    }

    /**
     * 특정 상품 좋아요 취소
     */
    @DeleteMapping("/product/{productId}/member/{memberId}")
    public ResponseEntity<Void> unlikeProduct(@PathVariable Long memberId, @PathVariable Long productId) {
        likesService.unlikeProductByMember(memberId, productId);
        return ResponseEntity.ok().build();
    }

    /**
     * 특정 상품 좋아요 갯수 확인
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<Integer> countProductLikes(@PathVariable Long productId) {
        return ResponseEntity.ok(likesService.countLikesByProduct(productId));
    }

//    /**
//     * 특정 캠핑장 좋아요
//     */
//    @PostMapping("/camp/{campId}/member/{memberId}")
//    public ResponseEntity<LikesDto> likeCamp(@PathVariable Long memberId, @PathVariable Long campId) {
//        return ResponseEntity.ok(likesService.likeCampByMember(memberId, campId));
//    }


    /**
     * 특정 캠핑장 좋아요 갯수 확인(JWT적용)
     */
    @GetMapping("/camp/{campId}")
    public ResponseEntity<Integer> countCampLikesJwt(@PathVariable Long campId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(likesService.countLikesByCampJwt(campId, request, userDetails));
    }


    /**
     * 특정 캠핑장 좋아요(JWT적용)
     */
    @PostMapping("/camp/{campId}")
    public ResponseEntity<?> likeCampJwt(@PathVariable Long campId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(likesService.likeCampByMemberJwt(campId, request, userDetails));
    }

    /**
     * 특정 캠핑장 좋아요 취소(JWT 적용)
     */
    @DeleteMapping("/camp/{campId}")
    public ResponseEntity<Void> unlikeCamp(@PathVariable Long campId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        likesService.unlikeCampByMemberJwt(campId, request, userDetails);
        return ResponseEntity.ok().build();
    }
//    /**
//     * 특정 캠핑장 좋아요 취소
//     */
//    @DeleteMapping("/camp/{campId}/member/{memberId}")
//    public ResponseEntity<Void> unlikeCamp(@PathVariable Long memberId, @PathVariable Long campId) {
//        likesService.unlikeCampByMember(memberId, campId);
//        return ResponseEntity.ok().build();
//    }

//    /**
//     * 특정 캠핑장 갯수 확인
//     */
//    @GetMapping("/camp/{campId}")
//    public ResponseEntity<Integer> countCampLikes(@PathVariable Long campId) {
//        return ResponseEntity.ok(likesService.countLikesByCamp(campId));
//    }

    /**
     * 특정 리뷰 좋아요 취소
     */
    @DeleteMapping("/review/{reviewId}/member/{memberId}")
    public ResponseEntity<Void> unlikeReview(@PathVariable Long memberId, @PathVariable Long reviewId) {
        likesService.unlikeReviewByMember(memberId, reviewId);
        return ResponseEntity.ok().build();
    }

//    /**
//     * 특정 회원 좋아요 클릭 여부
//     */
//    @GetMapping("/checkLike/{campId}/{memberId}")
//    public ResponseEntity<Integer> checkLike(@PathVariable Long campId, @PathVariable Long memberId) {
//        int count = likesService.checkLike(campId, memberId);
//        return new ResponseEntity<>(count, HttpStatus.OK);
//    }

    /**
     * 특정 회원 좋아요 클릭 여부 JWT
     */
    @GetMapping("/checkLike/{campId}")
    public ResponseEntity<Integer> checkLikeJwt(@PathVariable Long campId, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        int count = likesService.checkLikeJwt(campId, request, userDetails);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

//    /**
//     * 특정 회원 좋아요 클릭한 캠핑장 목록
//     */
//    @GetMapping("/memberLikedCamp/{memberId}")
//    public ResponseEntity<List<CampDto>> getMemberLikedCamps(@PathVariable Long memberId) {
//        List<CampDto> campDtos = likesService.getMemberLikedCamps(memberId);
//        return ResponseEntity.ok(campDtos);
//    }
    /**
     * 특정 회원 좋아요 클릭한 캠핑장 목록
     */
    @GetMapping("/memberLikedCamp")
    public ResponseEntity<List<CampDto>> getMemberLikedCampsJwt(HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        List<CampDto> campDtos = likesService.getMemberLikedCampsJwt(request, userDetails);
        return ResponseEntity.ok(campDtos);
    }
}
