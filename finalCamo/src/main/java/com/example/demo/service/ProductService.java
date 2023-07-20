package com.example.demo.service;

import com.example.demo.dto.ProductDto;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    /**
     * 상품조회기능
     */
    public List<ProductDto> searchByBrandAndProductName(String brand, String productName) {
        List<Product> products = productRepository.searchByBrandAndProductName(brand, productName);
        List<ProductDto> dtos = new ArrayList<>();
        for (Product product : products) {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setProductName(product.getProductName());
            dto.setPrice(product.getPrice());
            dto.setBrand(product.getBrand());
            dto.setImageUrl(product.getImageUrl());
            dto.setCategory3Name(product.getCategory3Name());
            dto.setCategory4Name(product.getCategory4Name());
            dtos.add(dto);
        }
        return dtos;
    }


    public Product save(ProductDto productDto) {// ProductDto를 매개변수로 받는 save 메소드
        Product product = new Product(); // 객체 생성
        product.setProductName(productDto.getProductName());
        product.setPrice(productDto.getPrice());
        product.setBrand(productDto.getBrand());
        product.setImageUrl(productDto.getImageUrl());
        product.setCategory3Name(productDto.getCategory3Name());
        product.setCategory4Name(productDto.getCategory4Name());
        return productRepository.save(product);
    }

    public List<ProductDto> getItemList() {
        List<Product> productList = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for (Product product : productList) {
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setProductName(product.getProductName());
            productDto.setPrice(product.getPrice());
            productDto.setBrand(product.getBrand());
            productDto.setImageUrl(product.getImageUrl());
            productDto.setCategory3Name(product.getCategory3Name());
            productDto.setCategory4Name(product.getCategory4Name());
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public ProductDto getProductById(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            ProductDto productDto = new ProductDto();
            productDto.setId(product.getId());
            productDto.setProductName(product.getProductName());
            productDto.setPrice(product.getPrice());
            productDto.setBrand(product.getBrand());
            productDto.setImageUrl(product.getImageUrl());
            productDto.setCategory3Name(product.getCategory3Name());
            productDto.setCategory4Name(product.getCategory4Name());
            return productDto;

        } else {
            throw new RuntimeException("에러" + id);
        }

    }}