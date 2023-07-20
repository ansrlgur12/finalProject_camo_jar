

package com.example.demo.service;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.CartItemDto;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Member;
import com.example.demo.entity.Product;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;



@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    // 장바구니에 상품을 추가하는 메소드
    public Long addCart(CartItemDto cartItemDto, String email) {
// 요청받은 상품 ID로 상품을 조회하고, 없다면 EntityNotFoundException 발생
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(EntityNotFoundException::new);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        // 사용자의 장바구니를 조회하고, 없다면 새로 생성 후 저장
        Cart cart = cartRepository.findByMemberId(member.getId());
        if (cart == null) {
            cart = Cart.createCart(member);
            cartRepository.save(cart);
        }
// 장바구니에 이미 상품이 있다면 수량을 추가, 없다면 새로운 CartItem을 생성하고 저장
        CartItem savedCartItem = cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId());

        if (savedCartItem != null) {
            savedCartItem.addQuantity(cartItemDto.getQuantity());
            return savedCartItem.getId();
        } else {
            CartItem cartItem = CartItem.createCartItem(cart, product, cartItemDto.getQuantity());
            cartItemRepository.save(cartItem);
            return cartItem.getId();
        }
    }
    // 사용자의 장바구니 목록을 조회하는 메소드
    @Transactional(readOnly = true)
    public List<CartDto> getCartList(String email) {
        List<CartDto> cartDetailDtoList = new ArrayList<CartDto>();

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        Cart cart = cartRepository.findByMemberId(member.getId());
        if (cart == null) {
            return cartDetailDtoList;
        }
      // 장바구니에 들어있는 상품들을 조회하고, DTO로 변환하여 반환
        cartDetailDtoList = cartItemRepository.findCartDtoList(cart.getId());
        return cartDetailDtoList;
    }
    /**
     * 장바구니  상품 수정 권한 검증
     */
    @Transactional(readOnly = true)
    public boolean validateCartItem(Long cartItemId, String email){
        // 요청한 이메일로 멤버 정보를 찾음
        Member curMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        // 요청한 장바구니 아이템 ID로 장바구니 아이템을 찾음
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);
        // 장바구니의 멤버 정보를 찾음
        Member savedMember = cartItem.getCart().getMember();
        // 요청한 멤버의 이메일과 장바구니의 멤버 이메일이 다르면 false 반환
        if(!StringUtils.equals(curMember.getEmail(), savedMember.getEmail())){
            return false;
        }

        return true;
    }
    /**
     * 장바구니 상품 수량 수정
     */
    public void updateCartItemCount(Long cartItemId, int quantity){
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);

        cartItem.updateQuantity(quantity);
    }
    /**
     * 장바구니 상품 삭제
     */
    public void deleteCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(EntityNotFoundException::new);
        cartItemRepository.delete(cartItem);
    }
    /**
     *  이메일로 cartId 찾기
     */
    @Transactional(readOnly = true)
    public Long findCartIdByEmail(String email){
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        Cart cart = cartRepository.findByMemberId(member.getId());
        if (cart == null) {
            throw new IllegalArgumentException("해당 회원의 장바구니가 존재하지 않습니다");
        }
        return cart.getId();
    }
}

