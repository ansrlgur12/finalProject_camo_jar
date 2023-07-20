package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final AuthService authService;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, MemberRepository memberRepository,
                         CommentRepository commentRepository, AuthService authService) {
        this.reviewRepository = reviewRepository;
        this.memberRepository = memberRepository;
        this.commentRepository = commentRepository;
        this.authService = authService;
    }

    /**
     * 리뷰 작성
     */
    public boolean createReview(ReviewDto reviewDto, HttpServletRequest request, UserDetails userDetails) {
        Member member = authService.validateTokenAndGetUser(request, userDetails);

        reviewDto.setId(member.getId());

        Review review = new Review();
        review.setMember(member);
        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setDate(reviewDto.getDate());
        review.setPostType(reviewDto.getPostType());
        review.setViewCount(reviewDto.getViewCount());
        review.setImg(reviewDto.getImg());

        Review savedReview = reviewRepository.save(review);
        return savedReview != null;
    }


    /**
     * 리뷰 수정
     */
    @Transactional
    public ReviewDto updateReview(Long id, ReviewDto reviewDto, HttpServletRequest request,
                                  UserDetails userDetails) {

        Member member = authService.validateTokenAndGetUser(request, userDetails);
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        review.setTitle(reviewDto.getTitle());
        review.setContent(reviewDto.getContent());
        review.setDate(reviewDto.getDate());
        review.setPostType(reviewDto.getPostType());
        review.setViewCount(review.getViewCount());
        review.setImg(review.getImg());

        Review updatedReview = reviewRepository.save(review);

        return ReviewDto.builder()
                .id(updatedReview.getId())
                .memberId(updatedReview.getMember().getId())
                .title(updatedReview.getTitle())
                .content(updatedReview.getContent())
                .date(updatedReview.getDate())
                .postType(updatedReview.getPostType())
                .img(updatedReview.getImg())
                .viewCount(review.getViewCount() + 1)
                .build();
    }

    /**
     * 리뷰 삭제
     */
    public void deleteReview(Long id, HttpServletRequest request,
                             UserDetails userDetails) {

        Member member = authService.validateTokenAndGetUser(request, userDetails);

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 리뷰가 없습니다."));

        // 관련된 댓글 삭제
        List<Comment> comments = review.getComment();
        commentRepository.deleteAll(comments);

        // 리뷰 삭제
        reviewRepository.deleteById(id);
    }

    /**
     * 모든 리뷰 가져오기
     */
    @Transactional(readOnly = true)
    public List<ReviewDto> getAllReviews(HttpServletRequest request, UserDetails userDetails) throws IllegalAccessException {
        Member member = authService.validateTokenAndGetUser(request, userDetails);

        List<Review> reviews = reviewRepository.findAll();
        List<ReviewDto> reviewDtoList = new ArrayList<>();

        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }

        return reviewDtoList;
    }


    /**
     * 특정 회원이 작성한 리뷰 가져오기
     */
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviewsByMember(HttpServletRequest request,
                                              UserDetails userDetails)
    {
        Member member = authService.validateTokenAndGetUser(request, userDetails);

        List<Review> reviews = reviewRepository.findByMember(member);
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount())
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    /**
     * 특정 게시글에 맞는 리뷰 가져오기
     */
    @Transactional
    public List<ReviewDto> getReviewsByPostType(int postType) {
        List<Review> reviews = reviewRepository.findByPostType(postType);
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }

    /**
     * 특정 게시글번호에 해당하는 리뷰 가져오기 및 조회수 증가 이거임
     */
    @Transactional
    public ReviewDto getReviewById(Long id, HttpServletRequest request, UserDetails userDetails) {
        Member member = authService.validateTokenAndGetUser(request, userDetails);
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));
        return ReviewDto.builder()
                .id(review.getId())
                .memberId(review.getMember().getId())
                .title(review.getTitle())
                .content(review.getContent())
                .date(review.getDate())
                .postType(review.getPostType())
                .img(review.getImg())
                .viewCount(review.getViewCount() + 1)
                .build();
    }

    /**
     * 특정 회원이 작성한 댓글 가져오기
     */
    public List<CommentDto> getCommentsByMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원이 없습니다."));

        List<Comment> comments = commentRepository.findByMember(member);
        List<CommentDto> commentDtoList = new ArrayList<>();
        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.builder()
                    .id(comment.getId())
                    .reviewId(comment.getReview().getId())
                    .memberId(comment.getMember().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
            commentDtoList.add(commentDto);
        }
        return commentDtoList;
    }

    /**
     * 리뷰 검색(제목, 내용)
     */
    @Transactional(readOnly = true)
    public List<ReviewDto> searchReviews(String keyword) {
        List<Review> reviews = reviewRepository.search(keyword);
        List<ReviewDto> reviewDtoList = new ArrayList<>();
        for (Review review : reviews) {
            ReviewDto reviewDto = ReviewDto.builder()
                    .id(review.getId())
                    .memberId(review.getMember().getId())
                    .title(review.getTitle())
                    .content(review.getContent())
                    .date(review.getDate())
                    .postType(review.getPostType())
                    .img(review.getImg())
                    .viewCount(review.getViewCount() + 1)
                    .build();
            reviewDtoList.add(reviewDto);
        }
        return reviewDtoList;
    }
}