package com.example.demo.controller;

import com.example.demo.dto.CampCommentDto;
import com.example.demo.dto.CommentDto;
import com.example.demo.service.CampCommentService;
import com.example.demo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campcomment")
public class CampCommentController {
    private final CampCommentService campCommentService;

    @Autowired
    public CampCommentController(CampCommentService campCommentService) {
        this.campCommentService = campCommentService;
    }

    @PostMapping
    public ResponseEntity<CampCommentDto> createComment(@RequestBody CampCommentDto request) {
        CampCommentDto createdComment = campCommentService.createComment(request.getCampId(), request.getContent());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    @GetMapping("/{campId}")
    public ResponseEntity<List<CampCommentDto>> getComment(@PathVariable Long campId) {
        List<CampCommentDto> comments = campCommentService.getComment(campId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/checkCount/{campId}")
    public ResponseEntity<Integer> checkCount(@PathVariable Long campId) {
        int count = campCommentService.getCount(campId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
