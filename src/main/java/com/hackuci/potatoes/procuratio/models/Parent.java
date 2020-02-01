package com.hackuci.potatoes.procuratio.models;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="parent")
public class Parent extends User {

	@OneToOne
	private Student student;
	
	@OneToMany
	private Set<Message> messages;
}
