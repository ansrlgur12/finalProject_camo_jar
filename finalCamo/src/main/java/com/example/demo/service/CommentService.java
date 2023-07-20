package com.example.demo.service;

import com.example.demo.dto.CommentDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional //@Transactional 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소한다.
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final AuthService authService;

    @Autowired
    public CommentService(CommentRepository commentRepository, MemberRepository member1Repository,
                          ReviewRepository reviewRepository, AuthService authService) {
        this.commentRepository = commentRepository;
        this.memberRepository = member1Repository;
        this.reviewRepository = reviewRepository;
        this.authService = authService;
    }

    /**
     * 특정 회원 댓글 생성
     */
    public boolean createComment(Long id, CommentDto commentDto,
                                 HttpServletRequest request, UserDetails userDetails) {

        Member member = authService.validateTokenAndGetUser(request, userDetails);

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));

        Comment comment = new Comment();
        comment.setReview(review);
        comment.setMember(member);
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);

        if (savedComment != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 특정 회원 댓글 수정
     */
    public boolean updateComment(Long id, CommentDto commentDto,
                                    HttpServletRequest request, UserDetails userDetails) {

        Member member = authService.validateTokenAndGetUser(request, userDetails);

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));

        Comment comment = new Comment();
        comment.setReview(review);
        comment.setMember(member);
        comment.setContent(commentDto.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);

        if (savedComment != null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 특정 회원 댓글 삭제
     */
    public void deleteComment(Long id, HttpServletRequest request, UserDetails userDetails) {
        Member member = authService.validateTokenAndGetUser(request, userDetails);

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다."));

        if (member.getId().equals(comment.getMember().getId())){
            commentRepository.delete(comment);
        } else {
            throw new IllegalArgumentException("댓글 작성자가 아닙니다.");
        }
    }


    /**
     * 특정 게시글 댓글 조회
     */
    public List<CommentDto> getCommentsByReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("리뷰가 없습니다.")); // 에러처리

        List<Comment> comments = commentRepository.findByReview(review);
        List<CommentDto> commentDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.builder()
                    .id(comment.getId())
                    .postType(comment.getPostType())
                    .reviewId(comment.getReview().getId())
                    .memberId(comment.getMember().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
            commentDtos.add(commentDto);
        }

        return commentDtos;
    }

    /**
     * 특정 회원이 작성한 댓글 가져오기
     */
    public List<CommentDto> getCommentsByMember(HttpServletRequest request,
                                                UserDetails userDetails) {
        Member member = authService.validateTokenAndGetUser(request,userDetails);
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

}

