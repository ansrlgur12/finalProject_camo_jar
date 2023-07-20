package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;
/**
 * 상품
 */
@Entity
@Table(name = "product")
@Getter
@Setter
@ToString

public class Product {

    @Id
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productName;
    private double price;
    private String brand;
    private String imageUrl;
    private String category3Name;
    private String category4Name;



    @OneToMany(mappedBy = "product")
    private List<Likes> likes;

    @OneToMany(mappedBy = "product")
    private List<OneLineReview> oneLineReview; // 회원의 리뷰







}
