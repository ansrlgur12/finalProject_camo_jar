package com.example.demo.controller;

import com.example.demo.dto.CommentDto;
import com.example.demo.dto.ReviewDto;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.service.AuthService;
import com.example.demo.service.CommentService;
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
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService){

        this.commentService = commentService;
    }

    /**
     * 특정 회원 댓글 작성
     */
    @PostMapping("/{id}")
    public ResponseEntity<?> createComment(@PathVariable Long id, @RequestBody CommentDto commentDto,
                                           @AuthenticationPrincipal UserDetails userDetails,
                                           HttpServletRequest httpRequest) {
        boolean createdComment = commentService.createComment(id ,commentDto, httpRequest, userDetails);
        if (createdComment) return new ResponseEntity<>(true, HttpStatus.OK);
        else return new ResponseEntity<>("댓글 작성 실패!", HttpStatus.BAD_REQUEST);
    }

    /**
     * 특정 회원 댓글 수정
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable Long id, @RequestBody CommentDto commentDto,
                                           @AuthenticationPrincipal UserDetails userDetails,
                                           HttpServletRequest request) {
        boolean updatedComment = commentService.updateComment(id, commentDto, request, userDetails);
        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.OK);
    }

    /**
     * 특정 회원 댓글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails,
                                           HttpServletRequest request) {
        commentService.deleteComment(id, request, userDetails);
        return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.OK);
    }

    /**
     * 특정 게시글 댓글 조회 이거임
     */
    @GetMapping("/review/{reviewId}")
    public ResponseEntity<?> getCommentsByReview(@PathVariable Long reviewId) {
        List<CommentDto> comments = commentService.getCommentsByReview(reviewId);
        return ResponseEntity.ok(comments);
    }

    /**
     * 특정 회원 댓글 조회
     */
    @GetMapping("/member")
    public ResponseEntity<List<CommentDto>> getCommentsByMember(@AuthenticationPrincipal UserDetails userDetails,
                                                                HttpServletRequest request) {
        List<CommentDto> comments = commentService.getCommentsByMember(request, userDetails);
        return ResponseEntity.ok(comments);
    }
}
