package com.hackuci.potatoes.procuratio.models;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="parent")
public class Parent implements User{

	@Id
	private Long id;
	
	private String name;
	
	private String login;
	
	private String password;
	
	@OneToOne
	private Student student;
	
	@OneToMany
	private Set<Message> messages;

	@Override
	public UserType getUserType() {
		return UserType.PARENT;
	}
}
