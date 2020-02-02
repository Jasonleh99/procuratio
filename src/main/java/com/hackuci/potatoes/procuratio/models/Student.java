package com.hackuci.potatoes.procuratio.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

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
	
	@OneToOne(cascade = {CascadeType.ALL})
	private User user;

	private String pairid;
	
	@OneToOne(cascade = {CascadeType.ALL})
	private Parent parent;
	
	@ManyToOne(cascade = {CascadeType.ALL})
	private Teacher teacher;
}
