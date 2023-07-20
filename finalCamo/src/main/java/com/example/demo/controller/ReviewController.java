package com.example.demo.controller;

import com.example.demo.dto.ReviewDto;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.ReviewService;
import lombok.NoArgsConstructor;
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
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * 리뷰 작성
     */
    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewDto reviewDto, @AuthenticationPrincipal UserDetails userDetails,
                                          HttpServletRequest request){

     boolean isCreate = reviewService.createReview(reviewDto, request, userDetails);
     if (isCreate) return new ResponseEntity<>("글 작성 성공", HttpStatus.OK);
     else return new ResponseEntity<>("글 작성 실패", HttpStatus.NO_CONTENT);
    }

    /**
     * 리뷰 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable("id") Long id, @RequestBody ReviewDto reviewDto,
                                          @AuthenticationPrincipal UserDetails userDetails,
                                          HttpServletRequest request) {
        try {
            ReviewDto updatedReview = reviewService.updateReview(id, reviewDto, request, userDetails);
            return ResponseEntity.ok(updatedReview);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }


    /**
     * 리뷰삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id,
                                               @AuthenticationPrincipal UserDetails userDetails,
                                               HttpServletRequest request) {
        reviewService.deleteReview(id, request, userDetails);

        return new ResponseEntity<>("게시글 삭제", HttpStatus.ACCEPTED);
    }

    /**
     * 모든 리뷰 가져오기
     */
    @GetMapping
    public ResponseEntity<List<ReviewDto>> getAllReviews(HttpServletRequest request,
                                                         @AuthenticationPrincipal UserDetails userDetails) throws IllegalAccessException {
        List<ReviewDto> reviews = reviewService.getAllReviews(request, userDetails);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 특정 회원이 작성한 리뷰 가져오기
     */
    @GetMapping("/member/")
    public ResponseEntity<List<ReviewDto>> getReviewsByMember(@AuthenticationPrincipal UserDetails userDetails,
                                                              HttpServletRequest request) {
        List<ReviewDto> reviews = reviewService.getReviewsByMember(request, userDetails);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 특정 게시글번호에 맞는 글 가져오기 이거임
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id,
                                                   @AuthenticationPrincipal UserDetails userDetails,
                                                   HttpServletRequest request) {
        ReviewDto reviewDto = reviewService.getReviewById(id, request, userDetails);
        return ResponseEntity.ok(reviewDto);
    }

    /**
     * 특정 게시글에 맞는 글 가져오기
     */
    @GetMapping("/postType/{postType}")
    public ResponseEntity<List<ReviewDto>> getReviewsByPostType(@PathVariable("postType") int postType) {
        List<ReviewDto> reviews = reviewService.getReviewsByPostType(postType);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 리뷰 검색(제목, 내용)
     */
    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<ReviewDto>> searchReviewsByKeyword(@PathVariable("keyword") String keyword) {
        List<ReviewDto> reviews = reviewService.searchReviews(keyword);
        return ResponseEntity.ok(reviews);
    }

}
