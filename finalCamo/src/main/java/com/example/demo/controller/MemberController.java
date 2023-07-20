package com.example.demo.controller;

import com.example.demo.dto.MemberDto;
import com.example.demo.dto.MemberResponseDto;
import com.example.demo.entity.Member;
import com.example.demo.security.SecurityUtil;
import com.example.demo.service.EmailService;
import com.example.demo.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/api/v1")
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    @Autowired
    public MemberController(MemberService memberService, EmailService emailService) {
        this.memberService = memberService;
        this.emailService = emailService;
    }

    /**
     *  email전송 이메일중복여부체크, 중복안되면 새로 생성해서이메일전송
     */
    @PostMapping("/intro/email")
    @ResponseBody
    public Object findEmailOverlap(@RequestBody Map<String, String> findEmailOver) throws Exception {
        String email = findEmailOver.get("emailOverlap");
        boolean isOverlap = emailService.emailOverlap(email);
        if (isOverlap) {
            return false;
        } else {
            String code = emailService.sendSimpleMessage(email);
            log.info("인증 코드: " + code);
            return code;
        }
    }

    /**
     *  사용자 ID를 이용해서 중복여부 체크
     */
    @GetMapping("/intro/nickName")
    public ResponseEntity<Boolean> overlapNick(@RequestParam String nickName){
        boolean isOverlap = memberService.nickOverlap(nickName);
        return new ResponseEntity<>(isOverlap, HttpStatus.OK);
    }

    /**
     *  사용자 ID를 이용해서 회원 정보를 조회
     */
    @GetMapping("/intro/me")
    public ResponseEntity<MemberResponseDto> findMemberById(){
        return ResponseEntity.ok(memberService.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }

    /**
     *  비밀번호 변경
     */
    @PutMapping("/changePwd")
    public ResponseEntity<?> changePwd(@RequestBody Member member, HttpServletRequest request,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        try {
            boolean isUpdate = memberService.changePwd(member, request, userDetails);
            return ResponseEntity.ok("비밀번호 변경 ");
        } catch (IllegalAccessError e) {
            return ResponseEntity.badRequest().body("비밀번호 변경 실패.. 😰" + e.getMessage());
        }
    }

    /**
     * 회원정보 가져오기
     */
    @GetMapping("/userinfo")
    public MemberDto getUerInfo(HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        return memberService.getUerInfo(request, userDetails);
    }

    /**
     * 회원정보 수정
     */
    @PutMapping("/updateUserInfo")
    public ResponseEntity<Boolean> updateUserInfo(@RequestBody MemberDto memberDto, HttpServletRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        boolean result = memberService.updateUserInfo(memberDto, request, userDetails);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * 회원 탈퇴
     */
    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetails userDetails, HttpServletRequest request) {
        try {
            memberService.deleteUser(request, userDetails);
            return new ResponseEntity<>("회원 탈퇴", HttpStatus.ACCEPTED);
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>("회원 탈퇴 실패" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }


    }

}
