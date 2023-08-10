package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "roles")
public class Roles {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long role_ID;


	private String name;

//	public Roles(Long role_ID, String name) {
//		super();
//		this.role_ID = role_ID;
//		this.name = name;
//	}

	public Roles() {
		
	}
	
	public Long getRole_ID() {
		return role_ID;
	}

	


	public void setRole_ID(Long role_ID) {
		this.role_ID = role_ID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}

