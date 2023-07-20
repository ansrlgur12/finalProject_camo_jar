package com.example.demo.controller;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.CartItemDto;
import com.example.demo.dto.FavoriteDto;
import com.example.demo.dto.FavoriteItemDto;
import com.example.demo.service.CartService;
import com.example.demo.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final CartService cartService;

    /**
     * 찜 하기
     */

    @PostMapping("/add")
    public @ResponseBody
    ResponseEntity favorite(@RequestBody @Valid FavoriteItemDto favoriteItemDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }


        Long favoriteItemId;
        String email = favoriteItemDto.getEmail();
        try {
            favoriteItemId = favoriteService.addFavorite(favoriteItemDto, email);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(favoriteItemId, HttpStatus.OK);

    }
    /**
     * 찜 목록 조회
     */
    @PostMapping("/favoriteList")
    public @ResponseBody ResponseEntity<List<FavoriteDto>> favoriteList(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        List<FavoriteDto> favoriteList = favoriteService.getFavoriteList(email);
        return new ResponseEntity<List<FavoriteDto>>(favoriteList, HttpStatus.OK);
    }
    /**
     * 찜 목록 상품 삭제
     */
    @PostMapping(value = "/deleteItem/{favoriteItemId}")
    public @ResponseBody ResponseEntity deleteFavoriteItem(@PathVariable Long favoriteItemId, @RequestBody Map<String, String> body) {
        String email = body.get("email");
        if(!favoriteService.validateFavoriteItem(favoriteItemId, email)) {
            return new ResponseEntity<String> ("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        favoriteService.deleteFavoriteItem(favoriteItemId);
        return new ResponseEntity<Long>(favoriteItemId, HttpStatus.OK);
    }
    /**
     * 찜 목록 상품 장바구니로 옮기기
     */
    @PostMapping(value = "/moveToCart/{favoriteItemId}")
    public @ResponseBody ResponseEntity moveToCart(@PathVariable Long favoriteItemId, @RequestBody Map<String, String> body) {
        String email = body.get("email");
        Long cartId;

        try {
            cartId = cartService.findCartIdByEmail(email);
        } catch (Exception e) {
            return new ResponseEntity<String>("해당 유저의 장바구니를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }

        if(!favoriteService.validateFavoriteItem(favoriteItemId, email)) {
            return new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        try {
            favoriteService.moveToCart(favoriteItemId, cartId);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(favoriteItemId, HttpStatus.OK);
    }
}
