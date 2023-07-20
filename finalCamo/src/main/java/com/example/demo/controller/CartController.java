package com.example.demo.controller;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.CartItemDto;
import com.example.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;


    /**
     * 장바구니 추가
     */
    @PostMapping
    public @ResponseBody
    ResponseEntity addToCart(@RequestBody @Valid CartItemDto cartItemDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }


        Long cartItemId;
        String email = cartItemDto.getEmail();
        try {
            cartItemId = cartService.addCart(cartItemDto, email);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);

    }
    /**
     * 장바구니 조회
     */
    @PostMapping("/cartList")
    public @ResponseBody ResponseEntity<List<CartDto>> cartList(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        List<CartDto> cartList = cartService.getCartList(email);
        return new ResponseEntity<List<CartDto>>(cartList, HttpStatus.OK);
    }
    /**
     * 장바구니 삭제
     */
    @PostMapping(value = "/deleteItem")
    public @ResponseBody ResponseEntity deleteCartItem(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        List<Integer> cartItemIds = (List<Integer>) body.get("cartItemId");

        for (Integer cartItemId : cartItemIds) {
            if(!cartService.validateCartItem(cartItemId.longValue(), email)) {
                return new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
            }
            cartService.deleteCartItem(cartItemId.longValue());
        }
        return new ResponseEntity<List<Integer>>(cartItemIds, HttpStatus.OK);
    }
    /**
     * 장바구니 수량 수정
     */
    @PostMapping(value = "/updateItem/{cartItemId}")
    public @ResponseBody ResponseEntity updateCartItem(@PathVariable("cartItemId") Long cartItemId, @RequestBody CartItemDto cartItemDto){
        int quantity = cartItemDto.getQuantity();
        String email = cartItemDto.getEmail();

        if(quantity <= 0){
            return new ResponseEntity<String>("최소 1개 이상 담아주세요", HttpStatus.BAD_REQUEST);
        } else if(!cartService.validateCartItem(cartItemId, email)){
            return new ResponseEntity<String>("수정 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        cartService.updateCartItemCount(cartItemId, quantity);
        return new ResponseEntity<Long>(cartItemId, HttpStatus.OK);
    }
}