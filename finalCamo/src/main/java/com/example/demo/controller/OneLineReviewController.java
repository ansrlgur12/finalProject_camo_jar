package com.example.demo.controller;

import com.example.demo.dto.OneLineReviewDto;
import com.example.demo.entity.Member;
import com.example.demo.entity.Product;
import com.example.demo.service.OneLineReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/one-Line")
public class OneLineReviewController {

    private final OneLineReviewService oneLineReviewService;

    @Autowired
    public OneLineReviewController(OneLineReviewService oneLineReviewService) {
        this.oneLineReviewService = oneLineReviewService;
    }

    /**
     * 특정 상품 한줄평 생성
     */
    @PostMapping
    public ResponseEntity<OneLineReviewDto> createOneLineReview(
            @RequestParam Long productId,
            @RequestParam Long memberId,
            @RequestParam String comment,
            @RequestParam int rating) {
        OneLineReviewDto createdReview = oneLineReviewService.createOneLineReview(
                productId, memberId, comment, rating);
        return ResponseEntity.ok(createdReview);
    }

    /**
     * 특정 상품 한줄평 조회
     */
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<OneLineReviewDto>> getOneLineReviewsByProduct(@PathVariable Long productId) {
        Product product = new Product();
        product.setId(productId);
        List<OneLineReviewDto> reviews = oneLineReviewService.getOneLineReviewsByProduct(product);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 특정 회원 한줄평 조회
     */
    @GetMapping("/member/{memberId}")
    public ResponseEntity<List<OneLineReviewDto>> getOneLineReviewsByMember(@PathVariable Long memberId) {
        Member member = new Member();
        member.setId(memberId);
        List<OneLineReviewDto> reviews = oneLineReviewService.getOneLineReviewsByMember(member);
        return ResponseEntity.ok(reviews);
    }

//    /**
//     * 특정 캠핑장 한줄평 조회
//     */
//    @GetMapping("/camp/{campId}")
//    public ResponseEntity<List<OneLineReviewDto>> getOneLineReviewsByCamp(@PathVariable Long campId) {
//        Camp camp = new Camp();
//        camp.setId(campId);
//        List<OneLineReviewDto> reviews = oneLineReviewService.getOneLineReviewsByCamp(camp);
//        return ResponseEntity.ok(reviews);
//    }

    /**
     * 한줄평 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<OneLineReviewDto> updateOneLineReview(
            @PathVariable Long id,
            @RequestBody OneLineReviewDto updatedReview) {
        OneLineReviewDto updatedReviewDto = oneLineReviewService.updateOneLineReview(id, updatedReview);
        return ResponseEntity.ok(updatedReviewDto);
    }

    /**
     * 한줄평 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<OneLineReviewDto> deleteOneLineReview(@PathVariable Long id) {
        oneLineReviewService.deleteOneLineReview(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * 한줄평 평점
     */
    @GetMapping("/product/{productId}/average-rating")
    public ResponseEntity<Double> calculateAverageRating(@PathVariable Long productId) {
        Product product = new Product();
        product.setId(productId);
        double averageRating = oneLineReviewService.calculateAverageRating(product);
        return ResponseEntity.ok(averageRating);
    }
}
