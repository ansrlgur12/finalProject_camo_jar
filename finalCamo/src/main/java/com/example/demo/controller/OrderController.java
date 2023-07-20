package com.example.demo.controller;

import com.example.demo.dto.CartDto;
import com.example.demo.dto.OrderDto;
import com.example.demo.dto.OrderHistDto;
import com.example.demo.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    /**
     * 주문 생성
     */
    @PostMapping
    public @ResponseBody ResponseEntity order(@RequestBody @Valid OrderDto orderDto
            , BindingResult bindingResult ){

        // 유효성 검사에서 오류가 발생하면 메시지를 반환
        if(bindingResult.hasErrors()){
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }

            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }

        Long orderId;
        String email = orderDto.getEmail();

        try {
            // 주문 생성
            orderId = orderService.order(orderDto, email);
        } catch(Exception e){
            // 오류 발생 시 메시지 반환
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        // 성공 시 주문 ID 반환
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }

    /**
     * 주문내역 확인
     */
    @PostMapping("/orders")
    public @ResponseBody ResponseEntity<List<OrderHistDto>> getOrderList(@RequestBody Map<String, String> body){
        String email = body.get("email");
        List<OrderHistDto> orderHistDtoList = orderService.getOrderList(email);



        return new ResponseEntity<List<OrderHistDto>>(orderHistDtoList, HttpStatus.OK);
    }

    /**
     * 주문 취소
     */
    @PostMapping("/{orderId}/cancel")
    public @ResponseBody ResponseEntity cancelOrder(@PathVariable("orderId") Long orderId,@RequestBody OrderDto orderDto){

        String email = orderDto.getEmail();


        // 주문 취소 권한 확인
        if(!orderService.validateOrder(orderId, email)){
            return new ResponseEntity<String>("주문 취소 권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        // 주문 취소
        orderService.cancelOrder(orderId);
        return new ResponseEntity<Long>(orderId, HttpStatus.OK);
    }
}