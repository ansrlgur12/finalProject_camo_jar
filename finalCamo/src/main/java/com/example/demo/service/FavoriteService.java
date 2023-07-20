package com.example.demo.service;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.CartItemDto;
import com.example.demo.dto.FavoriteDto;
import com.example.demo.dto.FavoriteItemDto;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final FavoriteItemRepository favoriteItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository,
                           FavoriteItemRepository favoriteItemRepository,
                           CartItemRepository cartItemRepository,
                           CartRepository cartRepository,
                           ProductRepository productRepository,
                           MemberRepository memberRepository) {
        this.favoriteRepository = favoriteRepository;
        this.favoriteItemRepository = favoriteItemRepository;
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.memberRepository = memberRepository;
    }


    public Long addFavorite(FavoriteItemDto favoriteItemDto, String email) {
// 요청받은 상품 ID로 상품을 조회하고, 없다면 EntityNotFoundException 발생
        Product product = productRepository.findById(favoriteItemDto.getProductId())
                .orElseThrow(EntityNotFoundException::new);
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        // 사용자의 찜목록을 조회하고, 없다면 새로 생성 후 저장
        Favorite favorite = favoriteRepository.findByMemberId(member.getId());
        if (favorite == null) {
            favorite = favorite.createFavorite(member);
            favoriteRepository.save(favorite);
        }
        // 찜목록에 이미 상품이 있다면 아무런 동작도 하지 않음, 없다면 새로운 FavoriteItem을 생성하고 저장
        FavoriteItem existingFavoriteItem = favoriteItemRepository.findByFavoriteIdAndProductId(favorite.getId(), product.getId());

        if (existingFavoriteItem != null) {

            return null;
        } else {
            FavoriteItem favoriteItem = FavoriteItem.createFavoriteItem(favorite, product);
            favoriteItemRepository.save(favoriteItem);
            return favoriteItem.getId();
        }
    }

    // 사용자의 찜 목록을 조회하는 메소드
    @Transactional(readOnly = true)
    public List<FavoriteDto> getFavoriteList(String email) {
        List<FavoriteDto> favoriteDetailDtoList = new ArrayList<FavoriteDto>();

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        Favorite favorite = favoriteRepository.findByMemberId(member.getId());

        if (favorite == null) {
            return favoriteDetailDtoList;
        }
        // 장바구니에 들어있는 상품들을 조회하고, DTO로 변환하여 반환
        favoriteDetailDtoList = favoriteItemRepository.findFavoriteDtoList(favorite.getId());
        return favoriteDetailDtoList;
    }
    @Transactional(readOnly = true)
    public boolean validateFavoriteItem(Long favoriteItemId, String email){
        // 요청한 이메일로 멤버 정보를 찾음
        Member curMember = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("회원이 아닙니다"));
        // 요청한 찜목록 아이템 ID로 찜목록 아이템을 찾음
        FavoriteItem favoriteItem = favoriteItemRepository.findById(favoriteItemId)
                .orElseThrow(EntityNotFoundException::new);
        // 찜목록의 멤버 정보를 찾음
        Member savedMember = favoriteItem.getFavorite().getMember();
        // 요청한 멤버의 이메일과 찜목록의 멤버 이메일이 다르면 false 반환
        if(!StringUtils.equals(curMember.getEmail(), savedMember.getEmail())){
            return false;
        }

        return true;
    }


    @Transactional
    public void moveToCart(Long favoriteItemId, Long cartId) {
        FavoriteItem favoriteItem = favoriteItemRepository.findById(favoriteItemId)
                .orElseThrow(() -> new IllegalArgumentException("id가 다릅니다"));
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("cart id가 다릅니다"));

        // Check if the product already exists in the cart
        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct(cart, favoriteItem.getProduct());

        if (existingCartItem.isPresent()) {
            // If the product already exists in the cart, increase the quantity
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItemRepository.save(cartItem);
        } else {
            // If the product does not exist in the cart, create a new cart item
            CartItem cartItem = CartItem.createCartItem(cart, favoriteItem.getProduct(), 1);
            cartItemRepository.save(cartItem);
        }

        favoriteItemRepository.delete(favoriteItem);
    }

    public void deleteFavoriteItem(Long favoriteItemId) {
       FavoriteItem favoriteItem= favoriteItemRepository.findById(favoriteItemId)
                .orElseThrow(EntityNotFoundException::new);
        favoriteItemRepository.delete(favoriteItem);
    }
}
