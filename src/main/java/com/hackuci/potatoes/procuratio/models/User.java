package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.UserType;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@NoArgsConstructor
@Table(name="user")
public class User {
	
	@Id
	private Long id;
	
	private String name;
	
	private String login;
	
	private String password;
	
	private UserType userType;
	
	@OneToMany
	private Set<Message> messages;
}
