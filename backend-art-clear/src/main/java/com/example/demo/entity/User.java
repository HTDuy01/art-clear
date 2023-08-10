package com.example.demo.entity;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty(message = "name is required.")

	private String username;

	private String password;

	private String fullname;

	private String phone;

	private String email;

	private String avatarName;

	private String avatarType;

	@Lob
	@Column(columnDefinition = "LONGBLOB")
	private byte[] avatarData;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "Id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "Role_id"))
	private Set<Roles> roles;

	

	public User() {
		
	}

//	public User(Long id, @NotEmpty(message = "name is required.") String username, String password, String fullname,
//			String phone, String email, String avatarName, String avatarType, byte[] avatarData, Set<Roles> roles) {
//		super();
//		this.id = id;
//		this.username = username;
//		this.password = password;
//		this.fullname = fullname;
//		this.phone = phone;
//		this.email = email;
//		this.avatarName = avatarName;
//		this.avatarType = avatarType;
//		this.avatarData = avatarData;
//		this.roles = roles;
//	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAvatarName() {
		return avatarName;
	}

	public void setAvatarName(String avatarName) {
		this.avatarName = avatarName;
	}

	public String getAvatarType() {
		return avatarType;
	}

	public void setAvatarType(String avatarType) {
		this.avatarType = avatarType;
	}

	public byte[] getAvatarData() {
		return avatarData;
	}

	public void setAvatarData(byte[] avatarData) {
		this.avatarData = avatarData;
	}

	public Set<Roles> getRoles() {
		return roles;
	}

	public void setRoles(Set<Roles> roles) {
		this.roles = roles;
	}
}
