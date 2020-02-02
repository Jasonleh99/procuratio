package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.hackuci.potatoes.procuratio.UserType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="Student")
public class Student{

	@Id
	private Long id;
	
	@OneToOne
	private User user;
	
	private String pairid;
	
	@OneToOne
	private Parent parent;
	
	@ManyToOne
	private Teacher teacher;
}
