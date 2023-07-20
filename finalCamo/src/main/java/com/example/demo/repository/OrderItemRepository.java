package com.example.demo.repository;

import com.example.demo.dto.CartDto;
import com.example.demo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderItemRepository  extends JpaRepository<OrderItem, Long> {


}
