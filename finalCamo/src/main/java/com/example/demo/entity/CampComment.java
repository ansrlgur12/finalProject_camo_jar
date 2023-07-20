package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "camp_comment")
public class CampComment {
    @Id
    @Column(name = "camp_comment_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "camp")
    private Camp camp;

    private String content;
    private LocalDateTime createdAt;
}
