package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.entity.Member;
import com.example.demo.security.SecurityUtil;
import com.example.demo.service.AuthService;
import com.example.demo.service.EmailService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final EmailService emailService;

    /**
     * 회원가입
     */

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    /**
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    /**
     * 재발급
     */
    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    /**
     * 이메일이 데이터베이스에 존재하는지 확인
     */
    @GetMapping("/{email}")
    public ResponseEntity<Boolean> findMemberByEmail(@PathVariable String email) throws Exception {
        boolean isValid = authService.isValidEmail(email);
        return ResponseEntity.ok(isValid);
    }

    /**
     * 비밀번호 메일 전송
     */
    @GetMapping("/password/{email}")
    public ResponseEntity<?> newPasswordMail(@PathVariable String email) throws Exception {
        authService.updatePassword(email);
        return new ResponseEntity<>("임시 비밀번호 발송 ", HttpStatus.OK);
    }

}