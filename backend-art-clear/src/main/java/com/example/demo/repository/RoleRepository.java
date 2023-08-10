package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Roles;

import java.util.Optional;
public interface RoleRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByName(String name);
    Optional<Roles> existsByName(String name);
//    Optional<Roles> findByNameIgnoreCase(String name);
}
