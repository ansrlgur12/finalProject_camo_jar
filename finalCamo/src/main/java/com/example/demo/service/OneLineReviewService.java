package com.example.demo.service;

import com.example.demo.dto.OneLineReviewDto;
import com.example.demo.entity.*;
import com.example.demo.repository.CampRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.OneLineReviewRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class OneLineReviewService {

    private final OneLineReviewRepository oneLineReviewRepository;
    private final MemberRepository member1Repository;
    private final ProductRepository productRepository;
    private final CampRepository campRepository;

    @Autowired
    public OneLineReviewService(OneLineReviewRepository oneLineReviewRepository, MemberRepository member1Repository, ProductRepository productRepository,
                                CampRepository campRepository){
        this.oneLineReviewRepository = oneLineReviewRepository;
        this.member1Repository = member1Repository;
        this.campRepository = campRepository;
        this.productRepository = productRepository;
    }

    /**
     * 특정 상품 한줄평 생성
     */
    public OneLineReviewDto createOneLineReview(Long productId, Long memberId, String comment, int rating) {
        Member member = member1Repository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("제품이 없습니다."));

        OneLineReview oneLineReview = new OneLineReview();
        oneLineReview.setProduct(product);
        oneLineReview.setMember(member);
        oneLineReview.setComment(comment);
        oneLineReview.setRating(rating);

        OneLineReview savedOneLineReview = oneLineReviewRepository.save(oneLineReview);

        return OneLineReviewDto.builder()
                .id(savedOneLineReview.getId())
                .productId(savedOneLineReview.getProduct().getId())
                .memberId(savedOneLineReview.getMember().getId())
                .comment(savedOneLineReview.getComment())
                .rating(savedOneLineReview.getRating())
                .build();
    }


    /**
     * 특정 상품 한줄평 조회
     */
    public List<OneLineReviewDto> getOneLineReviewsByProduct(Product product) {
        List<OneLineReview> oneLineReviews = oneLineReviewRepository.findByProduct(product);
        List<OneLineReviewDto> oneLineReviewDtos = new ArrayList<>();

        for (OneLineReview oneLineReview : oneLineReviews) {
            OneLineReviewDto oneLineReviewDto = OneLineReviewDto.builder()
                    .id(oneLineReview.getId())
                    .productId(oneLineReview.getProduct().getId())
                    .memberId(oneLineReview.getMember().getId())
                    .comment(oneLineReview.getComment())
                    .rating(oneLineReview.getRating())
                    .build();
            oneLineReviewDtos.add(oneLineReviewDto);
        }

        return oneLineReviewDtos;
    }

    /**
     * 특정 회원 한줄평 조회
     */
    public List<OneLineReviewDto> getOneLineReviewsByMember(Member member) {
        List<OneLineReview> oneLineReviews = oneLineReviewRepository.findByMember(member);
        List<OneLineReviewDto> oneLineReviewDtos = new ArrayList<>();

        for (OneLineReview oneLineReview : oneLineReviews) {
            OneLineReviewDto oneLineReviewDto = OneLineReviewDto.builder()
                    .id(oneLineReview.getId())
                    .productId(oneLineReview.getProduct().getId())
                    .memberId(oneLineReview.getMember().getId())
                    .comment(oneLineReview.getComment())
                    .rating(oneLineReview.getRating())
                    .build();
            oneLineReviewDtos.add(oneLineReviewDto);
        }

        return oneLineReviewDtos;
    }

//    /**
//     * 특정 캠핑장 한줄평 조회
//     */
//    public List<OneLineReviewDto> getOneLineReviewsByCamp(Camp camp) {
//        List<OneLineReview> oneLineReviews = oneLineReviewRepository.findByCamp(camp);
//        List<OneLineReviewDto> oneLineReviewDtos = new ArrayList<>();
//
//        for (OneLineReview oneLineReview : oneLineReviews) {
//            OneLineReviewDto oneLineReviewDto = OneLineReviewDto.builder()
//                    .id(oneLineReview.getId())
//                    .productId(oneLineReview.getProduct().getId())
//                    .memberId(oneLineReview.getMember1().getId())
//                    .campId(oneLineReview.getCamp().getId())
//                    .comment(oneLineReview.getComment())
//                    .rating(oneLineReview.getRating())
//                    .build();
//            oneLineReviewDtos.add(oneLineReviewDto);
//        }
//
//        return oneLineReviewDtos;
//    }

    /**
     * 한줄평 수정
     */
    public OneLineReviewDto updateOneLineReview(Long id, OneLineReviewDto updatedReview) {
        OneLineReview existingReview = oneLineReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("한줄평이 없습니다."));
        existingReview.setComment(updatedReview.getComment());
        existingReview.setRating(updatedReview.getRating());
        OneLineReview savedReview = oneLineReviewRepository.save(existingReview);

        return OneLineReviewDto.builder()
                .id(savedReview.getId())
                .productId(savedReview.getProduct().getId())
                .memberId(savedReview.getMember().getId())
                .comment(savedReview.getComment())
                .rating(savedReview.getRating())
                .build();
    }

    /**
     * 한줄평 삭제
     */
    public void deleteOneLineReview(Long id) {
        OneLineReview oneLineReview = oneLineReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("한줄평이 없습니다."));

        oneLineReviewRepository.delete(oneLineReview);
    }

    /**
     * 한줄평 평점
     */
    public double calculateAverageRating(Product product) {
        List<OneLineReview> reviews = oneLineReviewRepository.findByProduct(product);

        if (reviews.isEmpty()) {
            throw new NoSuchElementException("리뷰 할 제품이 없습니다.");
        }

        int totalRating = 0;
        for (OneLineReview review : reviews) {
            totalRating += review.getRating();
        }

        return (double) totalRating / reviews.size();
    }

}
