package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="teacher")
public class Teacher implements User{
	
	@Id
	private Long id;
	
	private String name;
	
	private String login;
	
	private String password;

	private String classroom_name;
	
	@OneToMany
	private Set<Student> class_roster;

	@Override
	public UserType getUserType() {
		// TODO Auto-generated method stub
		return UserType.TEACHER;
	}
}
