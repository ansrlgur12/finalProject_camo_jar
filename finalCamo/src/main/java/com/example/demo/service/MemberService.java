package com.example.demo.service;

import com.example.demo.dto.MemberDto;
import com.example.demo.dto.MemberResponseDto;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@ToString
@Service
@Transactional
@RequiredArgsConstructor

public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final ReviewService reviewService;


    /**
     * JWT 회원 찾기(회원번호)
     */
    public List<Member> findMember() {
        return memberRepository.findAll();
    }

    public MemberResponseDto findMemberInfoById(Long memberId){
        return memberRepository.findById(memberId)
                .map(MemberResponseDto::of)
                //map(MemberResponseDto::of)는 Optional<Member>에 대해 MemberResponseDto로 변환합니다.
                // MemberResponseDto::of는 MemberResponseDto 클래스의 정적 메서드인 of를 참조합니다.

                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
        //이 코드는 memberId를 사용하여 회원 정보를 조회하고, 조회된 회원 정보를 MemberResponseDto 객체로 변환하여 반환합니다.
        //만약 memberId에 해당하는 회원이 없을 경우 예외를 발생시킵니다
    }

    /**
     * JWT 회원 찾기(이메일)
     */
    public MemberResponseDto findMemberInfoByEmail(String email){
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }


    /**
     * 비밀번호 변경
     */
    public boolean changePwd(Member member, HttpServletRequest request, UserDetails userDetails) {
        Member authUser = authService.validateTokenAndGetUser(request, userDetails);

        Member user = memberRepository.findById(authUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 없습니다."));
        if (member.getPassword() == null || member.getPassword().isEmpty()) {
            throw new IllegalArgumentException("비밀번호가 없어요.");
        }

        String encodedPassword = passwordEncoder.encode(member.getPassword());
        user.setPassword(encodedPassword);
        Member saveMember = memberRepository.save(user);
        log.info(saveMember.toString());

        return true;

    }

    /**
     * 닉네임 중복 확인
     */
    public boolean nickOverlap(String nickName) {
        Optional<Member> nickOver = memberRepository.findByNickName(nickName);
        if(nickOver.isPresent()){
            return false;
        }
        return true;
    }

    /**
     * 회원정보 가져오기
     */
    public MemberDto getUerInfo(HttpServletRequest request, UserDetails userDetails){
        Member authUser = authService.validateTokenAndGetUser(request, userDetails);
        Optional<Member> member = memberRepository.findById(authUser.getId());
        MemberDto memberDto = new MemberDto();
        memberDto.setId(member.get().getId());
        memberDto.setEmail(member.get().getEmail());
        memberDto.setUserImg(member.get().getUserImg());
        memberDto.setNickName(member.get().getNickName());
        memberDto.setUserAddr(member.get().getUserAddr());
        memberDto.setUserPhoneNm(member.get().getUserPhoneNm());
        return memberDto;
    }

    /**
     * 회원정보 수정
     */
    public boolean updateUserInfo(MemberDto memberDto, HttpServletRequest request, UserDetails userDetails) throws IllegalAccessError{
        Member authUser = authService.validateTokenAndGetUser(request, userDetails);
        Member user = memberRepository.findById(authUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원이 없습니다."));
        user.setUserImg(memberDto.getUserImg());
        user.setUserAddr(memberDto.getUserAddr());
        user.setUserPhoneNm(memberDto.getUserPhoneNm());
        memberRepository.save(user);

        return true;
    }

    /**
     * 회원 탈퇴
     */
    public void deleteUser(HttpServletRequest request, UserDetails userDetails) throws IllegalAccessException {
        Member authUser =  authService.validateTokenAndGetUser(request, userDetails);

        Member member = memberRepository.findById(authUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("회원이 없습니다."));
        memberRepository.delete(member);
    }


    /**
     * 계정 찾기
     */

}
