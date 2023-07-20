package com.example.demo.controller;

import com.example.demo.dto.ProductDto;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController

public class ProductController {
    private final ProductService productService; // ProductService를 주입하기 위한 생성자

    // ProductService 주입
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService; // 주입받은 ProductService를 사용할 수 있도록 필드에 저장
    }

    /**
     * 상품조회기능
     */
    @GetMapping("/product-search")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam("brand") String brand, @RequestParam("productName") String productName) {
        List<ProductDto> products = productService.searchByBrandAndProductName(brand, productName);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/product-data")

    public void createFromJson() {

        try {
            // 상품.json 파일을 읽어들여 InputStream으로 변환
            InputStream inputStream = new ClassPathResource("data/상품.json").getInputStream();
            ObjectMapper mapper = new ObjectMapper(); // JSON을 다루기 위한 Jackson 라이브러리 클래스
            List<ProductDto> products = mapper.readValue(inputStream, new TypeReference<List<ProductDto>>(){}); // InputStream으로부터 JSON 데이터를 읽어와 ProductDto 리스트로 변환
            // 변환된 ProductDto 리스트를 DB에 저장
            products.forEach(productService::save);
        } catch (Exception e) {
            throw new RuntimeException("실패", e);
        }
    }
    @GetMapping("/product")
    public ResponseEntity<List<ProductDto>> getItemList() {
        List<ProductDto> list = productService.getItemList();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    @GetMapping("/productDetail/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        ProductDto productDto = productService.getProductById(id);
        return new ResponseEntity<>(productDto,HttpStatus.OK);
    }

    }

