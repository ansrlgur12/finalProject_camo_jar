package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 찜목록
 */
@Entity
@Getter
@Setter
@Table(name="favorite")
public class Favorite {

    @Id
    @GeneratedValue
    @Column(name = "favorite_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    public static Favorite createFavorite(Member member) {
        Favorite favorite = new Favorite();
        favorite.setMember(member);
        return favorite;
    }
}

